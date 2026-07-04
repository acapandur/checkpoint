/* Launch readiness renderer. The JSON is the project governance source of truth. */
(function () {
  "use strict";

  var root = document.getElementById("launch-readiness-root");
  if (!root) return;

  var data = null;

  function lang() {
    return window.MWS && window.MWS.lang ? window.MWS.lang() : (document.documentElement.getAttribute("data-lang") || "hr");
  }

  function text(value) {
    return window.MWS_SAFETY ? window.MWS_SAFETY.safeText(value) : String(value == null ? "" : value);
  }

  function t(pair) {
    return pair[lang()] || pair.hr || pair.en || "";
  }

  function el(tag, className, value) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (value != null) node.textContent = text(value);
    return node;
  }

  var labels = {
    loading: { hr: "Učitavanje statusa...", en: "Loading status..." },
    failed: { hr: "Status se nije mogao učitati. Pogledaj statički sažetak na ovoj stranici.", en: "Status could not load. See the static summary on this page." },
    item: { hr: "Područje", en: "Area" },
    status: { hr: "Status", en: "Status" },
    owner: { hr: "Vlasnik", en: "Owner" },
    notes: { hr: "Napomena", en: "Notes" },
    lastReview: { hr: "Zadnji pregled projekta", en: "Last project review" },
    notAppointed: { hr: "Nije još imenovano", en: "Not appointed yet" }
  };

  var statusLabels = {
    "not started": { hr: "nije započeto", en: "not started" },
    "in progress": { hr: "u tijeku", en: "in progress" },
    blocked: { hr: "blokirano", en: "blocked" },
    complete: { hr: "dovršeno", en: "complete" }
  };

  function appendCell(row, tag, value, scope) {
    var cell = el(tag, null, value);
    if (scope) cell.setAttribute("scope", scope);
    row.append(cell);
    return cell;
  }

  function render() {
    if (!data) {
      root.replaceChildren(el("p", "status-note", t(labels.loading)));
      return;
    }

    var meta = el("p", "review-meta", t(labels.lastReview) + ": " + data.lastProjectReview);
    var tableWrap = el("div", "info-table native-table");
    var table = document.createElement("table");
    var caption = el("caption", null, lang() === "en" ? data.summaryEn : data.summaryHr);
    var thead = document.createElement("thead");
    var headRow = document.createElement("tr");
    appendCell(headRow, "th", t(labels.item), "col");
    appendCell(headRow, "th", t(labels.status), "col");
    appendCell(headRow, "th", t(labels.owner), "col");
    appendCell(headRow, "th", t(labels.notes), "col");
    thead.append(headRow);

    var tbody = document.createElement("tbody");
    data.items.forEach(function (item) {
      var row = document.createElement("tr");
      appendCell(row, "th", lang() === "en" ? item.labelEn : item.labelHr, "row");
      var statusCell = document.createElement("td");
      var status = el("span", "status-pill status-" + String(item.status).replace(/\s+/g, "-"), t(statusLabels[item.status]));
      statusCell.append(status);
      row.append(statusCell);
      appendCell(row, "td", item.owner === "not-appointed" ? t(labels.notAppointed) : item.owner);
      appendCell(row, "td", lang() === "en" ? item.notesEn : item.notesHr);
      tbody.append(row);
    });

    table.append(caption, thead, tbody);
    tableWrap.append(table);
    root.replaceChildren(meta, tableWrap);
  }

  render();
  fetch("content/launch-readiness.json", { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(function (json) {
      data = json;
      render();
    })
    .catch(function () {
      root.replaceChildren(el("p", "status-note", t(labels.failed)));
    });

  document.addEventListener("mws:lang", render);
}());

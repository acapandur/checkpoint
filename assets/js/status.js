/* Launch readiness renderer. The JSON is the project governance source of truth. */

(function () {
  "use strict";

  var root = document.getElementById("launch-readiness-root");
  if (!root) return;

  var data = null;

  function lang() {
    return window.MWS && window.MWS.lang ? window.MWS.lang() : (document.documentElement.getAttribute("data-lang") || "hr");
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  var labels = {
    loading: { hr: "Učitavanje statusa...", en: "Loading status..." },
    failed: { hr: "Status se nije mogao učitati. Pogledaj statički sažetak na ovoj stranici.", en: "Status could not load. See the static summary on this page." },
    item: { hr: "Područje", en: "Area" },
    status: { hr: "Status", en: "Status" },
    owner: { hr: "Vlasnik", en: "Owner" },
    notes: { hr: "Napomena", en: "Notes" },
    lastReview: { hr: "Zadnji pregled projekta", en: "Last project review" },
    unassigned: { hr: "Nije još imenovano", en: "Not assigned yet" }
  };

  var statusLabels = {
    "not started": { hr: "nije započeto", en: "not started" },
    "in progress": { hr: "u tijeku", en: "in progress" },
    blocked: { hr: "blokirano", en: "blocked" },
    complete: { hr: "dovršeno", en: "complete" }
  };

  function t(pair) {
    return pair[lang()] || pair.hr || pair.en || "";
  }

  function render() {
    if (!data) {
      root.innerHTML = '<p class="status-note">' + esc(t(labels.loading)) + "</p>";
      return;
    }
    var rows = data.items.map(function (item) {
      var label = lang() === "en" ? item.labelEn : item.labelHr;
      var notes = lang() === "en" ? item.notesEn : item.notesHr;
      var owner = item.owner === "unassigned" ? t(labels.unassigned) : item.owner;
      return "<tr>"
        + '<th scope="row">' + esc(label) + "</th>"
        + '<td><span class="status-pill status-' + esc(item.status.replace(/\s+/g, "-")) + '">' + esc(t(statusLabels[item.status])) + "</span></td>"
        + "<td>" + esc(owner) + "</td>"
        + "<td>" + esc(notes) + "</td>"
        + "</tr>";
    }).join("");

    root.innerHTML = '<p class="review-meta"><span>' + esc(t(labels.lastReview)) + ": " + esc(data.lastProjectReview) + "</span></p>"
      + '<div class="info-table native-table"><table>'
      + '<caption>' + esc(lang() === "en" ? data.summaryEn : data.summaryHr) + "</caption>"
      + "<thead><tr>"
      + '<th scope="col">' + esc(t(labels.item)) + "</th>"
      + '<th scope="col">' + esc(t(labels.status)) + "</th>"
      + '<th scope="col">' + esc(t(labels.owner)) + "</th>"
      + '<th scope="col">' + esc(t(labels.notes)) + "</th>"
      + "</tr></thead><tbody>" + rows + "</tbody></table></div>";
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
      root.innerHTML = '<p class="status-note">' + esc(t(labels.failed)) + "</p>";
    });

  document.addEventListener("mws:lang", render);
})();

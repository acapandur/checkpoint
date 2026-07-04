/* Croatian service directory renderer. Critical emergency copy remains static HTML. */
(function () {
  "use strict";

  var root = document.getElementById("service-directory-root");
  if (!root) return;

  var safety = window.MWS_SAFETY;
  var state = { data: null, city: "all", type: "all" };

  function lang() {
    return window.MWS && window.MWS.lang ? window.MWS.lang() : (document.documentElement.getAttribute("data-lang") || "hr");
  }

  function t(pair) {
    return pair[lang()] || pair.hr || pair.en || "";
  }

  function text(value) {
    return safety ? safety.safeText(value) : String(value == null ? "" : value);
  }

  function el(tag, className, value) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (value != null) node.textContent = text(value);
    return node;
  }

  var labels = {
    loading: { hr: "Učitavanje imenika...", en: "Loading directory..." },
    failed: { hr: "Imenik se nije mogao učitati. Koristi službene poveznice iznad.", en: "The directory could not load. Use the official links above." },
    city: { hr: "Grad", en: "City" },
    allCities: { hr: "Svi gradovi", en: "All cities" },
    type: { hr: "Vrsta usluge", en: "Service type" },
    allTypes: { hr: "Sve vrste", en: "All types" },
    results: { hr: "Prikazane stavke", en: "Shown entries" },
    source: { hr: "Službeni izvor", en: "Official source" },
    status: { hr: "Status", en: "Status" },
    phone: { hr: "Telefon", en: "Phone" },
    email: { hr: "E-mail", en: "Email" },
    hours: { hr: "Radno vrijeme", en: "Hours" },
    address: { hr: "Adresa", en: "Address" },
    appointment: { hr: "Naručivanje", en: "Appointment" },
    anonymous: { hr: "Anonimno", en: "Anonymous" },
    free: { hr: "Besplatno", en: "Free" },
    verified: { hr: "provjeren izvor", en: "source verified" },
    needsVerification: { hr: "potrebna provjera", en: "needs verification" },
    temporarilyUnavailable: { hr: "privremeno nedostupno", en: "temporarily unavailable" },
    unknown: { hr: "nepoznato", en: "unknown" },
    yes: { hr: "da", en: "yes" },
    no: { hr: "ne", en: "no" },
    verifiedOn: { hr: "Izvor provjeren", en: "Source checked" },
    note: { hr: "Napomena", en: "Note" },
    noResults: { hr: "Nema stavki za odabrane filtere.", en: "No entries match these filters." }
  };

  var typeLabels = {
    "HIV testing": { hr: "HIV testiranje", en: "HIV testing" },
    "STI testing": { hr: "STI testiranje", en: "STI testing" },
    "hepatitis testing": { hr: "testiranje hepatitisa", en: "hepatitis testing" },
    counseling: { hr: "savjetovanje", en: "counseling" },
    PEP: { hr: "PEP", en: "PEP" },
    PrEP: { hr: "PrEP", en: "PrEP" },
    emergency: { hr: "hitno", en: "emergency" },
    "psychosocial support": { hr: "psihosocijalna podrška", en: "psychosocial support" },
    other: { hr: "ostalo", en: "other" }
  };

  function valueLabel(value) {
    if (value === "yes") return t(labels.yes);
    if (value === "no") return t(labels.no);
    return t(labels.unknown);
  }

  function statusLabel(status) {
    if (status === "verified") return t(labels.verified);
    if (status === "needs-verification") return t(labels.needsVerification);
    if (status === "temporarily-unavailable") return t(labels.temporarilyUnavailable);
    return t(labels.unknown);
  }

  function safeClass(value) {
    return String(value || "unknown").toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  }

  function unique(values) {
    return Array.from(new Set(values)).filter(Boolean).sort(function (a, b) { return a.localeCompare(b); });
  }

  function fact(label, valueNodeOrText) {
    var wrap = document.createElement("div");
    var dt = el("dt", null, label);
    var dd = document.createElement("dd");
    if (valueNodeOrText && valueNodeOrText.nodeType) dd.append(valueNodeOrText);
    else dd.textContent = text(valueNodeOrText);
    wrap.append(dt, dd);
    return wrap;
  }

  function serviceTypes(service) {
    var row = el("div", "tag-row");
    (service.serviceTypes || []).forEach(function (type) {
      row.append(el("span", "tag", t(typeLabels[type] || { hr: type, en: type })));
    });
    return row;
  }

  function serviceCard(service) {
    var article = el("article", "service-card");
    var head = el("div", "service-card-head");
    var title = el("h3", null, service.serviceName);
    var status = el("span", "status-pill status-" + safeClass(service.status), statusLabel(service.status));
    head.append(title, status);

    var facts = el("dl", "service-facts");
    var website = safety && service.website && service.website !== "unknown"
      ? safety.createSafeExternalLink(service.website, t(labels.source))
      : null;
    var mail = null;
    if (safety && service.email && service.email !== "unknown") {
      var safeMail = safety.safeUrl("mailto:" + service.email, { allowMailto: true });
      if (safeMail) {
        mail = document.createElement("a");
        mail.href = safeMail;
        mail.textContent = text(service.email);
        mail.rel = "noopener noreferrer";
        mail.referrerPolicy = "no-referrer";
      }
    }

    facts.append(
      fact(t(labels.address), service.address),
      fact(t(labels.phone), service.phone),
      fact(t(labels.email), mail || t(labels.unknown)),
      fact(t(labels.hours), service.workingHours),
      fact(t(labels.appointment), valueLabel(service.appointmentRequired)),
      fact(t(labels.anonymous), valueLabel(service.anonymous)),
      fact(t(labels.free), valueLabel(service.free)),
      fact(t(labels.verifiedOn), service.dateLastVerified),
      fact(t(labels.source), website || t(labels.unknown))
    );

    var note = el("p", "service-note");
    var strong = el("strong", null, t(labels.note) + ":");
    note.append(strong, " " + text(service.notes));

    article.append(head, el("p", "service-city", service.city), serviceTypes(service), facts, note);
    return article;
  }

  function filterServices() {
    return state.data.services.filter(function (service) {
      var cityOk = state.city === "all" || service.city === state.city;
      var typeOk = state.type === "all" || (service.serviceTypes || []).indexOf(state.type) !== -1;
      return cityOk && typeOk;
    });
  }

  function selectControl(id, labelText, allText, values, selected, labelForValue) {
    var label = document.createElement("label");
    var span = el("span", null, labelText);
    var select = document.createElement("select");
    select.id = id;
    var all = document.createElement("option");
    all.value = "all";
    all.textContent = allText;
    select.append(all);
    values.forEach(function (value) {
      var option = document.createElement("option");
      option.value = value;
      option.textContent = labelForValue(value);
      option.selected = selected === value;
      select.append(option);
    });
    label.append(span, select);
    return label;
  }

  function controls() {
    var cities = unique(state.data.services.map(function (service) { return service.city; }));
    var types = unique([].concat.apply([], state.data.services.map(function (service) { return service.serviceTypes || []; })));
    var wrap = el("div", "directory-controls");
    wrap.append(
      selectControl("service-city-filter", t(labels.city), t(labels.allCities), cities, state.city, function (city) { return city; }),
      selectControl("service-type-filter", t(labels.type), t(labels.allTypes), types, state.type, function (type) {
        return t(typeLabels[type] || { hr: type, en: type });
      })
    );
    return wrap;
  }

  function bindControls() {
    var city = document.getElementById("service-city-filter");
    var type = document.getElementById("service-type-filter");
    if (city) city.addEventListener("change", function () { state.city = city.value; render(); });
    if (type) type.addEventListener("change", function () { state.type = type.value; render(); });
  }

  function statusNote(message) {
    return el("p", "status-note", message);
  }

  function render() {
    if (!state.data) {
      root.replaceChildren(statusNote(t(labels.loading)));
      return;
    }
    var services = filterServices();
    var count = el("p", "directory-count", t(labels.results) + ": " + services.length);
    count.setAttribute("aria-live", "polite");
    var grid = el("div", "service-grid");
    if (services.length) services.forEach(function (service) { grid.append(serviceCard(service)); });
    else grid.append(statusNote(t(labels.noResults)));
    root.replaceChildren(controls(), count, grid);
    bindControls();
  }

  render();
  fetch("content/croatia-services.json", { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(function (data) {
      state.data = data;
      render();
    })
    .catch(function () {
      root.replaceChildren(statusNote(t(labels.failed)));
    });

  document.addEventListener("mws:lang", render);
}());

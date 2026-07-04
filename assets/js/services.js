/* Croatian service directory renderer.
   Data lives in content/croatia-services.json so routes can be updated without
   editing page markup. Critical emergency copy remains in static HTML. */

(function () {
  "use strict";

  var root = document.getElementById("service-directory-root");
  if (!root) return;

  var state = {
    data: null,
    city: "all",
    type: "all"
  };

  function lang() {
    return window.MWS && window.MWS.lang ? window.MWS.lang() : (document.documentElement.getAttribute("data-lang") || "hr");
  }

  function t(pair) {
    return pair[lang()] || pair.hr || pair.en || "";
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
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

  function serviceTypes(service) {
    return service.serviceTypes.map(function (type) {
      return '<span class="tag">' + esc(t(typeLabels[type] || { hr: type, en: type })) + "</span>";
    }).join("");
  }

  function serviceCard(service) {
    var website = service.website && service.website !== "unknown"
      ? '<a href="' + esc(service.website) + '" rel="noopener noreferrer">' + esc(t(labels.source)) + "</a>"
      : esc(t(labels.unknown));
    var email = service.email && service.email !== "unknown"
      ? '<a href="mailto:' + esc(service.email) + '">' + esc(service.email) + "</a>"
      : esc(t(labels.unknown));
    return '<article class="service-card">'
      + '<div class="service-card-head">'
      + '<h3>' + esc(service.serviceName) + "</h3>"
      + '<span class="status-pill status-' + esc(service.status) + '">' + esc(statusLabel(service.status)) + "</span>"
      + "</div>"
      + '<p class="service-city">' + esc(service.city) + "</p>"
      + '<div class="tag-row">' + serviceTypes(service) + "</div>"
      + '<dl class="service-facts">'
      + "<div><dt>" + esc(t(labels.address)) + "</dt><dd>" + esc(service.address) + "</dd></div>"
      + "<div><dt>" + esc(t(labels.phone)) + "</dt><dd>" + esc(service.phone) + "</dd></div>"
      + "<div><dt>" + esc(t(labels.email)) + "</dt><dd>" + email + "</dd></div>"
      + "<div><dt>" + esc(t(labels.hours)) + "</dt><dd>" + esc(service.workingHours) + "</dd></div>"
      + "<div><dt>" + esc(t(labels.appointment)) + "</dt><dd>" + esc(valueLabel(service.appointmentRequired)) + "</dd></div>"
      + "<div><dt>" + esc(t(labels.anonymous)) + "</dt><dd>" + esc(valueLabel(service.anonymous)) + "</dd></div>"
      + "<div><dt>" + esc(t(labels.free)) + "</dt><dd>" + esc(valueLabel(service.free)) + "</dd></div>"
      + "<div><dt>" + esc(t(labels.verifiedOn)) + "</dt><dd>" + esc(service.dateLastVerified) + "</dd></div>"
      + "<div><dt>" + esc(t(labels.source)) + "</dt><dd>" + website + "</dd></div>"
      + "</dl>"
      + '<p class="service-note"><strong>' + esc(t(labels.note)) + ":</strong> " + esc(service.notes) + "</p>"
      + "</article>";
  }

  function unique(values) {
    return Array.from(new Set(values)).filter(Boolean).sort(function (a, b) { return a.localeCompare(b); });
  }

  function filterServices() {
    return state.data.services.filter(function (service) {
      var cityOk = state.city === "all" || service.city === state.city;
      var typeOk = state.type === "all" || service.serviceTypes.indexOf(state.type) !== -1;
      return cityOk && typeOk;
    });
  }

  function controls() {
    var cities = unique(state.data.services.map(function (service) { return service.city; }));
    var types = unique([].concat.apply([], state.data.services.map(function (service) { return service.serviceTypes; })));
    return '<div class="directory-controls">'
      + '<label><span>' + esc(t(labels.city)) + '</span><select id="service-city-filter">'
      + '<option value="all">' + esc(t(labels.allCities)) + "</option>"
      + cities.map(function (city) {
        return '<option value="' + esc(city) + '"' + (state.city === city ? " selected" : "") + ">" + esc(city) + "</option>";
      }).join("")
      + "</select></label>"
      + '<label><span>' + esc(t(labels.type)) + '</span><select id="service-type-filter">'
      + '<option value="all">' + esc(t(labels.allTypes)) + "</option>"
      + types.map(function (type) {
        return '<option value="' + esc(type) + '"' + (state.type === type ? " selected" : "") + ">" + esc(t(typeLabels[type] || { hr: type, en: type })) + "</option>";
      }).join("")
      + "</select></label>"
      + "</div>";
  }

  function bindControls() {
    var city = document.getElementById("service-city-filter");
    var type = document.getElementById("service-type-filter");
    if (city) city.addEventListener("change", function () { state.city = city.value; render(); });
    if (type) type.addEventListener("change", function () { state.type = type.value; render(); });
  }

  function render() {
    if (!state.data) {
      root.innerHTML = '<p class="status-note">' + esc(t(labels.loading)) + "</p>";
      return;
    }
    var services = filterServices();
    root.innerHTML = controls()
      + '<p class="directory-count" aria-live="polite">' + esc(t(labels.results)) + ": " + services.length + "</p>"
      + '<div class="service-grid">'
      + (services.length ? services.map(serviceCard).join("") : '<p class="status-note">' + esc(t(labels.noResults)) + "</p>")
      + "</div>";
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
      root.innerHTML = '<p class="status-note">' + esc(t(labels.failed)) + "</p>";
    });

  document.addEventListener("mws:lang", render);
})();

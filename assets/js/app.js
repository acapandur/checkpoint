/* Map Without Stigma — shared site behavior. */
(function () {
  "use strict";

  var root = document.documentElement;
  var storage = window.MWS_STORAGE;
  var LANGS = ["hr", "en"];

  root.classList.add("js");

  function currentPage() {
    return location.pathname.split("/").pop() || "index.html";
  }

  function detectLang() {
    var saved = storage ? storage.getString("lang", null) : null;
    return LANGS.indexOf(saved) !== -1 ? saved : "hr";
  }

  function applyLang(lang, persist) {
    if (LANGS.indexOf(lang) === -1) lang = "hr";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);

    var pageMeta = window.MWS_PAGE_META || {};
    var meta = pageMeta[currentPage()] && pageMeta[currentPage()][lang];
    if (meta) {
      if (meta.title) document.title = meta.title;
      var desc = document.querySelector('meta[name="description"]');
      if (desc && meta.desc) desc.setAttribute("content", meta.desc);
      var ogTitle = document.querySelector('meta[property="og:title"]');
      var ogDesc = document.querySelector('meta[property="og:description"]');
      var ogLocale = document.querySelector('meta[property="og:locale"]');
      if (ogTitle && meta.title) ogTitle.setAttribute("content", meta.title);
      if (ogDesc && meta.desc) ogDesc.setAttribute("content", meta.desc);
      if (ogLocale) ogLocale.setAttribute("content", lang === "hr" ? "hr_HR" : "en_US");
    }

    document.querySelectorAll("[data-aria-hr][data-aria-en]").forEach(function (el) {
      el.setAttribute("aria-label", el.getAttribute("data-aria-" + lang));
    });

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.dataset.setlang === lang ? "true" : "false");
    });

    if (persist && storage) storage.setString("lang", lang);
    document.dispatchEvent(new CustomEvent("mws:lang", { detail: { lang: lang } }));
  }

  window.MWS = window.MWS || {};
  window.MWS.lang = function () { return root.getAttribute("data-lang") || "hr"; };
  window.MWS.t = function (obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[window.MWS.lang()] || obj.hr || obj.en || "";
  };
  window.MWS.applyLang = applyLang;

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(detectLang(), false);

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.dataset.setlang, true);
      });
    });

    document.querySelectorAll("[data-action='clear-local-data']").forEach(function (button) {
      button.addEventListener("click", function () {
        if (storage) storage.clearProjectStorage();
        applyLang("hr", false);
        var statusId = button.getAttribute("aria-describedby");
        var status = statusId ? document.getElementById(statusId) : null;
        if (status) {
          status.textContent = window.MWS.lang() === "en"
            ? "Local project data has been cleared in this browser."
            : "Lokalni podaci projekta obrisani su u ovom pregledniku.";
        }
      });
    });

    document.querySelectorAll(".skip-link").forEach(function (link) {
      link.addEventListener("click", function () {
        var id = link.getAttribute("href");
        if (!id || id.charAt(0) !== "#") return;
        var target = document.getElementById(id.slice(1));
        if (!target) return;
        window.setTimeout(function () {
          try { target.focus({ preventScroll: true }); }
          catch (error) { target.focus(); }
        }, 0);
      });
    });

    var here = currentPage();
    document.querySelectorAll(".site-nav a").forEach(function (a) {
      var target = (a.getAttribute("href") || "").split("/").pop();
      if (target === here) a.setAttribute("aria-current", "page");
    });

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  });
}());

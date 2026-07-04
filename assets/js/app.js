/* Map Without Stigma — shared site behavior
   1) Bilingual switching (HR/EN). Both languages live in the HTML;
      CSS shows one based on <html data-lang>. No text is fetched or stored
      beyond a single language preference key.
   2) Scroll reveals (respect prefers-reduced-motion).
   3) Marks the current page in the nav. */

(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var STORE_KEY = "mws-lang";
  var LANGS = ["hr", "en"];

  function detectLang() {
    try {
      var saved = localStorage.getItem(STORE_KEY);
      if (LANGS.indexOf(saved) !== -1) return saved;
    } catch (e) { /* storage unavailable — fall through */ }
    return "hr";
  }

  function applyLang(lang, persist) {
    if (LANGS.indexOf(lang) === -1) lang = "hr";
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);

    var meta = window.PAGE_META && window.PAGE_META[lang];
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

    if (persist) {
      try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* ignore */ }
    }
    document.dispatchEvent(new CustomEvent("mws:lang", { detail: { lang: lang } }));
  }

  window.MWS = window.MWS || {};
  window.MWS.lang = function () { return root.getAttribute("data-lang") || "hr"; };
  window.MWS.t = function (obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[window.MWS.lang()] || obj.hr || obj.en || "";
  };

  document.addEventListener("DOMContentLoaded", function () {
    applyLang(detectLang(), false);

    document.querySelectorAll(".lang-switch button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyLang(btn.dataset.setlang, true);
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
          catch (e) { target.focus(); }
        }, 0);
      });
    });

    /* Current page in nav */
    var here = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".site-nav a").forEach(function (a) {
      var target = a.getAttribute("href").split("/").pop();
      if (target === here) a.setAttribute("aria-current", "page");
    });

    /* Reveals */
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
})();

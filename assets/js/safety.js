/* Shared safety helpers for text, URLs and generated links.
   Exposed on window.MWS_SAFETY for non-module static pages. */
(function () {
  "use strict";

  var ALLOWED_PROTOCOLS = ["https:", "mailto:", "tel:"];
  var BLOCKED_PROTOCOLS = [
    "java" + "script:",
    "da" + "ta:",
    "vb" + "script:"
  ];

  function safeText(value) {
    if (value == null) return "";
    return String(value).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "");
  }

  function escapeHtml(value) {
    return safeText(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function safeUrl(value, options) {
    options = options || {};
    if (value == null) return null;
    var raw = String(value).trim();
    if (!raw || /[\u0000-\u001f\u007f]/.test(raw)) return null;

    var lower = raw.toLowerCase();
    for (var i = 0; i < BLOCKED_PROTOCOLS.length; i += 1) {
      if (lower.indexOf(BLOCKED_PROTOCOLS[i]) === 0) return null;
    }

    if (raw.charAt(0) === "#") return options.allowHash ? raw : null;
    if (/^(\/|\.\/|\.\.\/)/.test(raw)) return options.allowRelative ? raw : null;

    if (lower.indexOf("mailto:") === 0) {
      if (!options.allowMailto) return null;
      return /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/i.test(raw) ? raw : null;
    }

    if (lower.indexOf("tel:") === 0) {
      if (!options.allowTel) return null;
      return /^tel:\+?[0-9][0-9()\-\s.]{1,24}$/i.test(raw) ? raw : null;
    }

    try {
      var parsed = new URL(raw);
      if (ALLOWED_PROTOCOLS.indexOf(parsed.protocol) === -1) return null;
      if (parsed.protocol !== "https:") return null;
      return parsed.href;
    } catch (error) {
      return null;
    }
  }

  function createSafeExternalLink(url, label, options) {
    var safe = safeUrl(url, { allowMailto: !!(options && options.allowMailto), allowTel: !!(options && options.allowTel) });
    if (!safe) return null;
    var link = document.createElement("a");
    link.href = safe;
    link.textContent = safeText(label || safe);
    link.rel = "noopener noreferrer";
    link.referrerPolicy = "no-referrer";
    if (options && options.newTab) link.target = "_blank";
    return link;
  }

  window.MWS_SAFETY = {
    safeText: safeText,
    escapeHtml: escapeHtml,
    safeUrl: safeUrl,
    createSafeExternalLink: createSafeExternalLink
  };
}());

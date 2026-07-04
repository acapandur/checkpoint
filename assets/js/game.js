/* ==========================================================================
   THREE NIGHTS / TRI NOĆI — engine
   A small visual-novel runtime for the Map Without Stigma campaign.
   Screens: gate → episode select → story → night ledger → finale.
   Progress is stored only in this browser (localStorage "mws-save").
   The instant-text preference is also stored locally (localStorage "mws-instant").
   ========================================================================== */

(function () {
  "use strict";

  var S = window.MWS_STORY;
  var root = document.getElementById("game-root");
  if (!S || !root) return;
  root.setAttribute("tabindex", "-1");

  var SAVE_KEY = "mws-save";
  var INSTANT_KEY = "mws-instant";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function loadInstant() {
    try { return localStorage.getItem(INSTANT_KEY) === "1"; }
    catch (e) { return false; }
  }
  function saveInstant(on) {
    try { localStorage.setItem(INSTANT_KEY, on ? "1" : "0"); }
    catch (e) { /* ignore */ }
  }

  function t(obj) {
    if (window.MWS && window.MWS.t) return window.MWS.t(obj);
    return (obj && obj.en) || "";
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------------- Save ---------------- */
  function loadSave() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        var data = JSON.parse(raw);
        if (data && data.done) return data;
      }
    } catch (e) { /* private mode etc. */ }
    return { v: 1, done: {} };
  }
  function persist() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* ignore */ }
  }
  var save = loadSave();

  /* ---------------- State ---------------- */
  var state = {
    screen: "gate",          // gate | select | story | ledger | finale
    epIndex: 0,
    nodeId: null,
    meters: { calm: 50, clarity: 50, trust: 50 },
    typing: null,            // { full, i, timer, done }
    instant: loadInstant(),
    reflectOpen: true,
    lastChoiceStatus: ""
  };

  var METER_ORDER = ["calm", "clarity", "trust"];
  var METER_CLASS = { calm: "jade", clarity: "gold", trust: "silver" };
  var NEUTRAL_LINE = {
    en: "A night survived is a night learned from.",
    hr: "Preživljena noć – naučena noć."
  };

  function ep() { return S.EPISODES[state.epIndex]; }
  function node() { return ep().nodes[state.nodeId]; }
  function unlocked(i) { return i >= 0 && i < S.EPISODES.length; }
  function allDone() {
    return S.EPISODES.every(function (e) { return !!save.done[e.id]; });
  }
  function clamp(v) { return Math.max(0, Math.min(100, v)); }
  function applyFx(fx) {
    if (!fx) return;
    METER_ORDER.forEach(function (k) {
      if (typeof fx[k] === "number") state.meters[k] = clamp(state.meters[k] + fx[k]);
    });
  }

  function choiceStatus(fx) {
    if (!fx) return "";
    var parts = [];
    METER_ORDER.forEach(function (k) {
      if (typeof fx[k] === "number" && fx[k] !== 0) {
        parts.push(t(S.UI.meters[k]) + " " + t(fx[k] > 0 ? S.UI.meterUp : S.UI.meterDown));
      }
    });
    if (!parts.length) return "";
    return t(S.UI.choiceFeedbackPrefix) + " " + parts.join("; ") + ". " + t(S.UI.choiceFeedbackSuffix);
  }

  /* ---------------- Typewriter ---------------- */
  function stopTyping() {
    if (state.typing && state.typing.timer) clearInterval(state.typing.timer);
  }
  function typeInto(el, full) {
    stopTyping();
    if (reduced || state.instant) {
      el.textContent = full;
      state.typing = { full: full, done: true };
      onTypeDone();
      return;
    }
    var caret = '<span class="caret" aria-hidden="true"></span>';
    state.typing = { full: full, i: 0, done: false, timer: null };
    state.typing.timer = setInterval(function () {
      state.typing.i += 2;
      if (state.typing.i >= full.length) {
        finishTyping(el);
      } else {
        el.innerHTML = esc(full.slice(0, state.typing.i)) + caret;
      }
    }, 18);
  }
  function finishTyping(el) {
    stopTyping();
    if (!state.typing) return;
    el.textContent = state.typing.full;
    state.typing.done = true;
    onTypeDone();
  }
  function onTypeDone() {
    var live = root.querySelector(".sr-line");
    if (live && state.typing) live.textContent = state.typing.full;
    var choices = root.querySelector(".choices");
    if (choices) choices.classList.remove("pending");
    var hint = root.querySelector(".dialogue-hint");
    if (hint) hint.hidden = !!root.querySelector(".choices");
    focusStoryReady();
  }

  function focusEl(el) {
    if (!el || typeof el.focus !== "function") return;
    try { el.focus({ preventScroll: true }); }
    catch (e) { el.focus(); }
  }

  function focusStoryReady() {
    if (!root.contains(document.activeElement)) return;

    var firstChoice = root.querySelector(".choices:not(.pending) .choice");
    var hint = root.querySelector(".dialogue-hint:not([hidden])");
    focusEl(firstChoice || hint || root);
  }

  function focusAfterRender(shouldFocus) {
    if (!shouldFocus) return;

    window.requestAnimationFrame(function () {
      var target = root;
      if (state.screen === "gate" || state.screen === "ledger" || state.screen === "finale") {
        target = root.querySelector("button, a[href]") || root;
      } else if (state.screen === "select") {
        target = root.querySelector(".playbill:not(:disabled), button, a[href]") || root;
      } else if (state.screen === "story" && state.typing && state.typing.done) {
        target = root.querySelector(".title-card, .choices:not(.pending) .choice, .dialogue-hint:not([hidden])") || root;
      }
      focusEl(target);
    });
  }

  /* ---------------- Templates ---------------- */
  function meterLevelKey(v) {
    if (v >= 58) return "high";
    if (v <= 42) return "low";
    return "mid";
  }
  function metersHtml() {
    var rows = METER_ORDER.map(function (k) {
      var lvlKey = meterLevelKey(state.meters[k]);
      var label = t(S.UI.meters[k]);
      var level = t(S.UI.meterLevels[lvlKey]);
      var valueText = label + ": " + state.meters[k] + " " + t(S.UI.outOf100) + ". " + level + ". " + t(S.UI.meterAriaSuffix);
      return '<div class="meter ' + METER_CLASS[k] + " lvl-" + lvlKey + '" role="progressbar" aria-label="' + esc(label) + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + state.meters[k] + '" aria-valuetext="' + esc(valueText) + '">'
        + '<small><span>' + esc(label) + '</span><span class="lvl">' + esc(level) + "</span></small>"
        + '<div class="track" aria-hidden="true"><div class="fill" style="width:' + state.meters[k] + '%"></div></div>'
        + "</div>";
    }).join("");
    return '<details class="reflect"' + (state.reflectOpen ? " open" : "") + ">"
      + "<summary>" + esc(t(S.UI.reflectTitle)) + "</summary>"
      + '<div class="meter-pack"><div class="meters">' + rows + "</div>"
      + '<p class="meter-note">' + esc(t(S.UI.meterDisclaimer)) + "</p></div>"
      + "</details>";
  }

  function instantToggleHtml() {
    return '<button type="button" class="instant-toggle" data-act="instant" aria-pressed="'
      + (state.instant ? "true" : "false") + '">'
      + '<span class="dot" aria-hidden="true"></span>' + esc(t(S.UI.instantText)) + "</button>";
  }

  function stageTopHtml(labelInner) {
    return '<div class="stage-top">'
      + '<div class="stage-top-row"><span class="ep-label">' + labelInner + "</span>"
      + instantToggleHtml() + "</div>"
      + metersHtml()
      + urgentPanelHtml("game-urgent game-urgent-compact")
      + "</div>";
  }

  function applyMood() {
    root.classList.remove("mood-ep1", "mood-ep2", "mood-ep3");
    if (state.screen === "story" || state.screen === "ledger") {
      var m = S.EPISODES[state.epIndex] && S.EPISODES[state.epIndex].mood;
      if (m) root.classList.add("mood-" + m);
    }
  }

  function castHtml(list, speaker) {
    if (!list || !list.length) return "";
    return '<div class="cast">' + list.map(function (m) {
      var c = S.CAST[m.c];
      var cls = "cameo" + (m.side === "R" ? " right" : "") + (m.c === speaker ? " speaking" : "");
      return '<div class="' + cls + '">' + c.art + "</div>";
    }).join("") + "</div>";
  }

  function urgentPanelHtml(extraClass) {
    var cls = "urgent-help" + (extraClass ? " " + extraClass : "");
    return '<aside class="' + cls + '" role="note" aria-label="' + esc(t(S.UI.urgentHelpTitle)) + '">'
      + '<p class="urgent-help-title">' + esc(t(S.UI.urgentHelpTitle)) + "</p>"
      + "<p>" + esc(t(S.UI.urgentHelp)) + "</p></aside>";
  }

  function renderGate() {
    root.innerHTML =
      '<div class="stage-inner ledger safety-gate">'
      + '<p class="kicker">' + esc(t(S.UI.gateTitle)) + "</p>"
      + "<h2>" + esc(t({ en: "Three Nights", hr: "Tri noći" })) + "</h2>"
      + '<p class="gate-format">' + esc(t(S.UI.gateFormat)) + "</p>"
      + "<p>" + esc(t(S.UI.gateBody)) + "</p>"
      + urgentPanelHtml("game-urgent")
      + '<div class="trust-notes">'
      + '<p class="gate-note independence-note">' + esc(t(S.UI.gateIndependence)) + "</p>"
      + '<p class="gate-note">' + esc(t(S.UI.fiction)) + "</p>"
      + "</div>"
      + '<div class="action-row">'
      + '<button class="button button-primary button-cta" data-act="open-select">'
      + '<span class="cta-main">' + esc(t(S.UI.gateStart)) + "</span>"
      + '<span class="cta-sub">' + esc(t(S.UI.gateStartPoetic)) + "</span></button>"
      + (Object.keys(save.done).length
          ? '<button class="button button-ghost" data-act="reset">' + esc(t(S.UI.resetSave)) + "</button>"
          : "")
      + "</div></div>";
  }

  function renderSelect() {
    var bills = S.EPISODES.map(function (e, i) {
      var isDone = !!save.done[e.id];
      var isOpen = unlocked(i);
      var stateLabel = isDone ? t(S.UI.done) + " · " + t(S.UI.replay) : t(S.UI.ready);
      var situation = e.situation ? t(e.situation) : t(e.title);
      return '<button class="playbill mood-' + (e.mood || "ep1") + (isDone ? " done" : "") + '" data-act="start-ep" data-ep="' + i + '"'
        + (isOpen ? "" : " disabled")
        + ' aria-label="' + esc(t(S.UI.episode) + " " + e.no + " — " + situation) + '">'
        + '<span class="bill-art" aria-hidden="true">' + S.BG[e.poster] + "</span>"
        + '<span class="bill-body">'
        + '<span class="bill-ep">' + esc(t(S.UI.episode)) + " " + e.no + "</span>"
        + '<span class="bill-situation">' + esc(situation) + "</span>"
        + "<h3>" + esc(t(e.title)) + "</h3>"
        + "<p>" + esc(t(e.tagline)) + "</p>"
        + '<span class="bill-state">' + esc(stateLabel) + "</span>"
        + "</span></button>";
    }).join("");
    root.innerHTML =
      '<div class="stage-inner ledger">'
      + '<p class="kicker">' + esc(t(S.UI.selectKicker)) + "</p>"
      + "<h2>" + esc(t(S.UI.selectTitle)) + "</h2>"
      + '<p class="sub">' + esc(t(S.UI.selectHint)) + "</p>"
      + '<div class="playbills">' + bills + "</div>"
      + (allDone()
          ? '<div class="action-row" style="margin-top:22px"><button class="button button-primary" data-act="finale">'
            + esc(t(S.UI.finaleTitle)) + "</button></div>"
          : "")
      + "</div>";
  }

  function renderStory() {
    var n = node();
    var e = ep();

    if (n.type === "title") {
      root.innerHTML =
        stageTopHtml(esc(t(S.UI.episode) + " " + e.no))
        + '<div class="scene scene-fade">' + S.BG[n.bg || "title"]
        + '<button type="button" class="title-card" data-act="advance">'
        + "<h2>" + esc(t(n.text)).replace(/\n/g, "<br>") + "</h2>"
        + '<span class="tap">' + esc(t(S.UI.tapToContinue)) + "</span></button></div>"
      + '<p class="choice-status sr-only" aria-live="polite">' + esc(state.lastChoiceStatus) + "</p>"
      + '<p class="sr-line sr-only" aria-live="polite">' + esc(t(n.text)) + "</p>";
      state.typing = { full: t(n.text), done: true };
      return;
    }

    var speakerKey = n.speaker;
    var isVoice = speakerKey === "narr" || speakerKey === "think";
    var plate = isVoice ? t(S.VOICES[speakerKey]) : t(S.CAST[speakerKey].name);
    var thoughtCls = speakerKey === "think" ? " thought" : "";
    var narrPlate = isVoice ? " thought" : "";

    var choicesHtml = "";
    if (n.choice) {
      choicesHtml = '<div class="choices pending" role="group" aria-label="' + esc(t(S.UI.chooseHint)) + '">'
        + n.choice.map(function (c, idx) {
          return '<button class="choice' + (c.urgent ? " urgent" : "") + '" data-act="choice" data-idx="' + idx + '">'
            + '<span class="gem" aria-hidden="true"></span><span>' + esc(t(c.t)) + "</span></button>";
        }).join("") + "</div>";
    }

    root.innerHTML =
      stageTopHtml(esc(t(S.UI.episode) + " " + e.no) + ' <span class="ep-title">' + esc(t(e.title)) + "</span>")
      + '<div class="scene scene-fade">' + S.BG[n.bg] + castHtml(n.cast, speakerKey) + "</div>"
      + '<div class="dialogue">'
      + '<span class="nameplate' + narrPlate + '">' + esc(plate) + "</span>"
      + '<p class="line' + thoughtCls + '" aria-hidden="true"></p>'
      + '<button class="dialogue-hint" data-act="advance" hidden>' + esc(t(S.UI.tapToContinue)) + "</button>"
      + "</div>"
      + choicesHtml
      + '<p class="choice-status sr-only" aria-live="polite">' + esc(state.lastChoiceStatus) + "</p>"
      + '<p class="sr-line sr-only" aria-live="polite"></p>';

    typeInto(root.querySelector(".line"), t(n.text));
  }

  function meterFlavor() {
    var lines = [];
    METER_ORDER.forEach(function (k) {
      if (state.meters[k] >= 58) lines.push(t(S.UI.meterHigh[k]));
      else if (state.meters[k] <= 42) lines.push(t(S.UI.meterLow[k]));
    });
    if (!lines.length) lines.push(t(NEUTRAL_LINE));
    return lines;
  }

  function renderLedger() {
    var e = ep();
    var nextIndex = state.epIndex + 1;
    var hasNext = nextIndex < S.EPISODES.length;
    var factHref = e.factHref || "sources.html";
    var insights = e.insights.map(function (ins, i) {
      return "<div><strong>" + (i + 1) + ".</strong><p>" + esc(t(ins)) + "</p></div>";
    }).join("");
    var takeaway = e.takeaway
      ? '<div class="civic-takeaway"><strong>' + esc(t(S.UI.civicTakeaway)) + "</strong><p>" + esc(t(e.takeaway)) + "</p></div>"
      : "";
    var flavor = meterFlavor().map(function (l) { return "<p>" + esc(l) + "</p>"; }).join("");
    var primary = hasNext
      ? '<button class="button button-primary" data-act="start-ep" data-ep="' + nextIndex + '">' + esc(t(S.UI.continueStory)) + "</button>"
      : '<button class="button button-primary" data-act="finale">' + esc(t(S.UI.finaleTitle)) + "</button>";

    root.innerHTML =
      '<div class="stage-inner ledger">'
      + '<p class="kicker">' + esc(t(S.UI.nightLedger)) + "</p>"
      + "<h2>" + esc(t(S.UI.episode)) + " " + e.no + " — " + esc(t(e.title)) + "</h2>"
      + '<p class="sub">' + flavor + "</p>"
      + '<p class="kicker" style="margin-top:6px">' + esc(t(S.UI.whatTheNightShowed)) + "</p>"
      + '<div class="ledger-list">' + insights + "</div>"
      + takeaway
      + '<div class="demand-unlock"><span class="gem" aria-hidden="true"></span>'
      + "<p><strong>" + esc(t(S.UI.demandUnlocked)) + "</strong>" + esc(t(e.demand)) + "</p></div>"
      + urgentPanelHtml("game-urgent ledger-urgent")
      + '<p class="kicker next-step-kicker">' + esc(t(S.UI.nextStepsTitle)) + "</p>"
      + '<div class="action-row next-step-menu">'
      + '<a class="button button-jade" href="' + esc(factHref) + '">' + esc(t(S.UI.readFacts)) + "</a>"
      + '<button class="button button-secondary" data-act="start-ep" data-ep="' + state.epIndex + '">' + esc(t(S.UI.replayEpisode)) + "</button>"
      + primary
      + '<a class="button button-secondary" href="petition.html">' + esc(t(S.UI.toPetition)) + "</a>"
      + '<button class="button button-ghost" data-act="reset">' + esc(t(S.UI.resetSave)) + "</button>"
      + '<button class="button button-ghost" data-act="open-select">' + esc(t(S.UI.backToEpisodes)) + "</button>"
      + "</div></div>";
  }

  function renderFinale() {
    var demands = S.EPISODES.map(function (e) {
      return '<div><strong>' + esc(t(S.UI.episode)) + " " + e.no + " — " + esc(t(e.title)) + "</strong><p>" + esc(t(e.demand)) + "</p></div>";
    }).join("");
    root.innerHTML =
      '<div class="stage-inner ledger">'
      + '<div class="scene finale-scene" aria-hidden="true">' + S.BG.title + "</div>"
      + "<h2>" + esc(t(S.UI.finaleTitle)) + "</h2>"
      + '<p class="sub">' + esc(t(S.UI.finaleBody)) + "</p>"
      + '<div class="ledger-list">' + demands + "</div>"
      + '<p class="gate-note independence-note">' + esc(t(S.UI.gateIndependence)) + "</p>"
      + '<div class="action-row">'
      + '<a class="button button-primary" href="petition.html">' + esc(t(S.UI.toPetition)) + "</a>"
      + '<button class="button button-ghost" data-act="open-select">' + esc(t(S.UI.replay)) + "</button>"
      + '<button class="button button-ghost" data-act="reset">' + esc(t(S.UI.resetSave)) + "</button>"
      + "</div></div>";
  }

  function render(opts) {
    opts = opts || {};
    stopTyping();
    /* remember whether the reflection panel is open before we rebuild */
    var det = root.querySelector(".reflect");
    if (det) state.reflectOpen = det.open;
    if (state.screen === "gate") renderGate();
    else if (state.screen === "select") renderSelect();
    else if (state.screen === "story") renderStory();
    else if (state.screen === "ledger") renderLedger();
    else if (state.screen === "finale") renderFinale();
    applyMood();
    focusAfterRender(!!opts.focus);
  }

  /* ---------------- Flow ---------------- */
  function startEpisode(i) {
    if (isNaN(i) || !unlocked(i)) return;
    state.epIndex = i;
    state.meters = { calm: 50, clarity: 50, trust: 50 };
    state.lastChoiceStatus = "";
    state.nodeId = S.EPISODES[i].start;
    state.screen = "story";
    render({ focus: true });
  }

  function goNode(id) {
    var n = ep().nodes[id];
    if (!n) return;
    if (n.type === "end") { finishEpisode(); return; }
    state.nodeId = id;
    if (n.fx) applyFx(n.fx);
    render({ focus: true });
  }

  function finishEpisode() {
    save.done[ep().id] = true;
    persist();
    state.screen = "ledger";
    render({ focus: true });
  }

  function advance() {
    if (state.screen !== "story") return;
    var n = node();
    if (state.typing && !state.typing.done) {
      finishTyping(root.querySelector(".line"));
      return;
    }
    if (n.choice) return; /* must pick */
    if (n.type === "title") { goNode(n.next); return; }
    if (n.next) goNode(n.next);
  }

  function choose(idx) {
    var n = node();
    if (!n.choice || !state.typing || !state.typing.done) {
      if (state.typing && !state.typing.done) finishTyping(root.querySelector(".line"));
      return;
    }
    var c = n.choice[idx];
    if (!c) return;
    state.lastChoiceStatus = choiceStatus(c.fx);
    applyFx(c.fx);
    goNode(c.go);
  }

  /* ---------------- Events ---------------- */
  root.addEventListener("click", function (evt) {
    var el = evt.target.closest("[data-act]");
    if (!el) return;
    var act = el.getAttribute("data-act");
    if (act === "advance") advance();
    else if (act === "choice") choose(parseInt(el.getAttribute("data-idx"), 10));
    else if (act === "instant") {
      state.instant = !state.instant;
      saveInstant(state.instant);
      el.setAttribute("aria-pressed", state.instant ? "true" : "false");
      if (state.instant && state.typing && !state.typing.done) {
        finishTyping(root.querySelector(".line"));
      }
    }
    else if (act === "start-ep") startEpisode(parseInt(el.getAttribute("data-ep"), 10));
    else if (act === "open-select") { state.screen = "select"; render({ focus: true }); }
    else if (act === "finale") { state.screen = "finale"; render({ focus: true }); }
    else if (act === "reset") {
      save = { v: 1, done: {} };
      persist();
      state.screen = "select";
      render({ focus: true });
    }
  });

  /* keep the reflection-panel open state in sync (toggle does not bubble) */
  root.addEventListener("toggle", function (evt) {
    var d = evt.target;
    if (d && d.classList && d.classList.contains("reflect")) state.reflectOpen = d.open;
  }, true);

  document.addEventListener("keydown", function (evt) {
    if (state.screen !== "story") return;
    if (evt.key !== " " && evt.key !== "Enter") return;
    var active = document.activeElement;
    if (!root.contains(active)) return;
    var tag = active && active.tagName;
    if (tag === "BUTTON" || tag === "A" || tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "SUMMARY") return;
    if (active && active.isContentEditable) return;
    evt.preventDefault();
    advance();
  });

  document.addEventListener("mws:lang", function () {
    /* Re-render the current screen in the new language.
       Mid-line, the text simply completes in the new language. */
    var hadGameFocus = root.contains(document.activeElement);
    if (state.screen === "story") {
      var n = node();
      render({ focus: hadGameFocus });
      if (n && n.type !== "title") {
        var lineEl = root.querySelector(".line");
        stopTyping();
        state.typing = { full: t(n.text), done: true };
        if (lineEl) lineEl.textContent = state.typing.full;
        onTypeDone();
      }
    } else {
      render({ focus: hadGameFocus });
    }
  });

  render({ focus: false });
})();

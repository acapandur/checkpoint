const interventions = [
  { id: "warm-message", label: "Warm Message", dimensions: ["trust"] },
  { id: "anonymous-entry", label: "Anonymous Entry", dimensions: ["privacy"] },
  { id: "counseling", label: "Counseling", dimensions: ["clarity", "trust"] },
  { id: "sti-panel", label: "STI Panel", dimensions: ["clarity", "access"] },
  { id: "prep-pathway", label: "PrEP Pathway", dimensions: ["clarity", "access"] },
  { id: "pep-route", label: "PEP Route", dimensions: ["timeliness", "clarity"] },
  { id: "mobile-van", label: "Mobile Van", dimensions: ["access"] },
  { id: "digital-map", label: "Digital Map", dimensions: ["clarity", "access"] },
  { id: "rumor-break", label: "Rumor Break", dimensions: ["trust", "clarity"] },
  { id: "evening-hours", label: "Evening Hours", dimensions: ["access", "privacy"] },
  { id: "support-route", label: "Support Route", dimensions: ["trust"], safety: true }
]

const signalDeck = [
  {
    region: "Zagreb",
    type: "Tutorial",
    text: "I am afraid someone will see me walk in.",
    tags: ["Stigma", "Privacy"],
    best: ["anonymous-entry", "warm-message", "digital-map"],
    fact: "Privacy is part of access. A visible service also needs low-threshold entry, calm wording and clear route information.",
    score: { privacy: 13, trust: 10, clarity: 8, access: 4, timeliness: 2 }
  },
  {
    region: "Split",
    type: "PEP / 72h",
    urgent: true,
    text: "Last night the condom broke. I do not know if it is too late.",
    tags: ["PEP", "72h", "Urgent"],
    best: ["pep-route", "warm-message", "digital-map"],
    fact: "Some situations need fast, clear professional routing. PEP is time-sensitive and should not be handled as generic information.",
    score: { timeliness: 16, clarity: 8, trust: 5, access: 5, privacy: 2 }
  },
  {
    region: "Rijeka",
    type: "PrEP",
    text: "I heard about PrEP, but I do not know if it is for me.",
    tags: ["PrEP", "Counseling"],
    best: ["prep-pathway", "counseling", "digital-map"],
    fact: "Prevention should be easy to ask about. Clear navigation helps people reach qualified counseling instead of guessing.",
    score: { clarity: 12, access: 8, trust: 6, privacy: 3, timeliness: 2 }
  },
  {
    region: "Osijek",
    type: "Testing",
    text: "I want to test before a new relationship gets serious.",
    tags: ["Testing", "Confidentiality"],
    best: ["sti-panel", "anonymous-entry", "evening-hours"],
    fact: "Testing is normal sexual-health planning. Access improves when confidentiality, opening hours and STI panel routes are clear.",
    score: { clarity: 10, privacy: 8, access: 8, trust: 5, timeliness: 2 }
  },
  {
    region: "Zadar",
    type: "Mobility",
    text: "I live on an island and cannot reach the center this week.",
    tags: ["Island", "Mobile team"],
    best: ["mobile-van", "digital-map", "warm-message"],
    fact: "A network has to reach beyond fixed addresses. Mobile teams and digital routes turn distance into a planned service problem.",
    score: { access: 15, clarity: 8, trust: 5, privacy: 3, timeliness: 3 }
  },
  {
    region: "Pula",
    type: "Misinformation",
    text: "My friend says PEP can wait a few days.",
    tags: ["Rumor", "PEP"],
    best: ["rumor-break", "pep-route", "digital-map"],
    fact: "Wrong advice spreads fast. Clear public routes reduce panic and reduce delay.",
    score: { timeliness: 12, clarity: 10, trust: 8, access: 4, privacy: 2 }
  },
  {
    region: "Varazdin",
    type: "STI / stigma",
    text: "I have symptoms and I am embarrassed to ask.",
    tags: ["STI", "Stigma"],
    best: ["warm-message", "sti-panel", "counseling"],
    fact: "Symptoms need care, not judgment. A good route lowers shame and connects testing, counseling and treatment referral.",
    score: { trust: 12, clarity: 9, access: 6, privacy: 5, timeliness: 3 }
  },
  {
    region: "Dubrovnik",
    type: "Safety protocol",
    safety: true,
    text: "I was at a party and I am not sure what happened.",
    tags: ["Safety", "Professional help"],
    best: ["support-route", "warm-message", "counseling"],
    fact: "Safety comes before gameplay. This route is not scored. It points toward emergency, professional or trusted local support.",
    score: { timeliness: 0, access: 0, trust: 0, clarity: 0, privacy: 0 }
  }
]

const routePairs = [
  ["Zagreb", "Varazdin"],
  ["Zagreb", "Rijeka"],
  ["Rijeka", "Pula"],
  ["Rijeka", "Zadar"],
  ["Zadar", "Split"],
  ["Split", "Dubrovnik"],
  ["Zagreb", "Osijek"],
  ["Osijek", "Dubrovnik"]
]

const initialScores = {
  timeliness: 50,
  access: 50,
  trust: 50,
  clarity: 50,
  privacy: 50
}

const state = {
  signals: [],
  index: 0,
  selected: new Set(),
  scores: { ...initialScores },
  completedRegions: new Set(),
  ledger: []
}

const elements = {
  start: document.querySelector("#start-game"),
  skipSensitive: document.querySelector("#skip-sensitive"),
  safetyPanel: document.querySelector("#safety-panel"),
  gameShell: document.querySelector("#game-shell"),
  ledgerPanel: document.querySelector("#ledger-panel"),
  signalRegion: document.querySelector("#signal-region"),
  signalText: document.querySelector("#signal-text"),
  signalTags: document.querySelector("#signal-tags"),
  interventionGrid: document.querySelector("#intervention-grid"),
  selectionCount: document.querySelector("#selection-count"),
  routeSignal: document.querySelector("#route-signal"),
  resetGame: document.querySelector("#reset-game"),
  factBox: document.querySelector("#fact-box"),
  fogLayer: document.querySelector("#fog-layer"),
  safeIndex: document.querySelector("#safe-index"),
  cityWindows: document.querySelector("#city-windows"),
  ledgerSummary: document.querySelector("#ledger-summary"),
  ledgerList: document.querySelector("#ledger-list"),
  playAgain: document.querySelector("#play-again"),
  copyResult: document.querySelector("#copy-result"),
  scoreTimeliness: document.querySelector("#score-timeliness"),
  scoreAccess: document.querySelector("#score-access"),
  scoreTrust: document.querySelector("#score-trust"),
  scoreClarity: document.querySelector("#score-clarity"),
  scorePrivacy: document.querySelector("#score-privacy")
}

if (elements.start) {
  createWindows()
  elements.start.addEventListener("click", startGame)
  elements.routeSignal.addEventListener("click", routeSignal)
  elements.resetGame.addEventListener("click", resetShift)
  elements.playAgain.addEventListener("click", resetShift)
  elements.copyResult.addEventListener("click", copyResult)
}

function startGame() {
  state.signals = elements.skipSensitive.checked
    ? signalDeck.filter((signal) => !signal.safety)
    : [...signalDeck]
  state.index = 0
  state.selected = new Set()
  state.scores = { ...initialScores }
  state.completedRegions = new Set()
  state.ledger = []

  elements.safetyPanel.classList.remove("is-visible")
  elements.ledgerPanel.classList.remove("is-visible")
  elements.gameShell.classList.remove("is-locked")
  render()
}

function resetShift() {
  elements.gameShell.classList.add("is-locked")
  elements.ledgerPanel.classList.remove("is-visible")
  elements.safetyPanel.classList.add("is-visible")
  state.selected.clear()
  resetMap()
}

function render() {
  const signal = state.signals[state.index]
  if (!signal) {
    finishShift()
    return
  }

  state.selected.clear()
  elements.signalRegion.textContent = `Signal ${state.index + 1} of ${state.signals.length} - ${signal.region} - ${signal.type}`
  elements.signalText.textContent = signal.text
  elements.signalTags.innerHTML = signal.tags
    .map((tag) => `<span class="tag${tag === "Urgent" ? " urgent" : ""}">${escapeHtml(tag)}</span>`)
    .join("")

  renderInterventions(signal)
  renderScores()
  renderMap(signal.region)
  updateFact("Fact pulse", "Choose the route that clears barriers without asking for personal details.")
}

function renderInterventions(signal) {
  const visible = interventions.filter((item) => signal.safety || !item.safety)
  elements.interventionGrid.innerHTML = visible
    .map((item) => {
      const safetyClass = item.safety ? " is-safety" : ""
      return `<button class="intervention-button${safetyClass}" type="button" data-id="${item.id}" aria-pressed="false">${item.label}</button>`
    })
    .join("")
  elements.selectionCount.textContent = "Choose up to 3 interventions"

  elements.interventionGrid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => toggleIntervention(button))
  })
}

function toggleIntervention(button) {
  const id = button.dataset.id
  if (state.selected.has(id)) {
    state.selected.delete(id)
    button.classList.remove("is-selected")
    button.setAttribute("aria-pressed", "false")
  } else {
    if (state.selected.size >= 3) {
      updateFact("Dispatch limit", "This shift can route three interventions at once. Pick the strongest chain.")
      return
    }
    state.selected.add(id)
    button.classList.add("is-selected")
    button.setAttribute("aria-pressed", "true")
  }
  elements.selectionCount.textContent = `${state.selected.size} selected`
}

function routeSignal() {
  const signal = state.signals[state.index]
  if (!signal || !state.selected.size) {
    updateFact("No route selected", "The signal needs a route before the board can move forward.")
    return
  }

  const selected = [...state.selected]
  const matched = selected.filter((id) => signal.best.includes(id))
  const missed = signal.best.filter((id) => !selected.includes(id))
  const extras = selected.filter((id) => !signal.best.includes(id))
  const ratio = matched.length / signal.best.length
  const complete = ratio === 1

  if (!signal.safety) {
    applyScore(signal, ratio, extras.length)
  }

  state.completedRegions.add(signal.region)
  state.ledger.push({
    region: signal.region,
    type: signal.type,
    complete,
    matched: matched.length,
    needed: signal.best.length,
    missed: missed.map(labelForIntervention),
    safety: Boolean(signal.safety),
    fact: signal.fact
  })

  const pulseTitle = signal.safety ? "Safety protocol" : complete ? "Route connected" : "Partial route"
  const pulseText = signal.safety
    ? signal.fact
    : complete
      ? signal.fact
      : `${signal.fact} Missing link: ${missed.map(labelForIntervention).join(", ")}.`

  updateFact(pulseTitle, pulseText)
  state.index += 1

  setTimeout(() => {
    render()
  }, 850)
}

function applyScore(signal, ratio, extraCount) {
  Object.entries(signal.score).forEach(([key, value]) => {
    const penalty = extraCount * 2
    const delta = Math.round(value * ratio) - penalty
    state.scores[key] = clamp(state.scores[key] + delta, 0, 100)
  })

  if (signal.urgent && !state.selected.has("pep-route")) {
    state.scores.timeliness = clamp(state.scores.timeliness - 10, 0, 100)
    state.scores.clarity = clamp(state.scores.clarity - 5, 0, 100)
  }
}

function renderScores() {
  elements.scoreTimeliness.textContent = state.scores.timeliness
  elements.scoreAccess.textContent = state.scores.access
  elements.scoreTrust.textContent = state.scores.trust
  elements.scoreClarity.textContent = state.scores.clarity
  elements.scorePrivacy.textContent = state.scores.privacy
  const index = calculateSafePathIndex()
  elements.safeIndex.textContent = index
  elements.fogLayer.style.opacity = String(clamp((100 - index) / 100, 0.08, 0.72))
  updateWindows(index)
}

function renderMap(currentRegion) {
  document.querySelectorAll(".region-node").forEach((node) => {
    const region = node.dataset.region
    node.classList.toggle("is-current", region === currentRegion)
    node.classList.toggle("is-lit", state.completedRegions.has(region))
  })

  document.querySelectorAll(".route-line").forEach((line) => {
    const [from, to] = line.dataset.route.split("-")
    line.classList.toggle("is-lit", state.completedRegions.has(from) && state.completedRegions.has(to))
  })
}

function resetMap() {
  document.querySelectorAll(".region-node, .route-line").forEach((item) => {
    item.classList.remove("is-current", "is-lit")
  })
  updateWindows(50)
}

function finishShift() {
  elements.gameShell.classList.add("is-locked")
  elements.ledgerPanel.classList.add("is-visible")
  renderScores()

  const index = calculateSafePathIndex()
  const completed = state.completedRegions.size
  const connectedRoutes = routePairs.filter(([from, to]) => state.completedRegions.has(from) && state.completedRegions.has(to)).length
  const perfectRoutes = state.ledger.filter((item) => item.complete && !item.safety).length
  const safetyHandled = state.ledger.some((item) => item.safety)

  elements.ledgerSummary.textContent = `Safe Path Index: ${index}. You lit ${completed} regions and connected ${connectedRoutes} route lines. ${perfectRoutes} signal routes were complete.`

  const needs = lowestDimensions()
  const safetyLine = safetyHandled
    ? "The safety protocol was handled outside score, because some situations require care before gameplay."
    : "The safety protocol signal was skipped for this run."

  elements.ledgerList.innerHTML = [
    `<div><strong>What improved:</strong> ${strongestDimensions().join(", ")} gained the clearest route support.</div>`,
    `<div><strong>What remains blocked:</strong> ${needs.join(", ")} still need stronger public infrastructure.</div>`,
    `<div><strong>System lesson:</strong> A CheckPoint network needs centers, mobile teams, digital maps, warm language and confidential entry points.</div>`,
    `<div><strong>Safety note:</strong> ${safetyLine}</div>`
  ].join("")
}

function calculateSafePathIndex() {
  return Math.round(
    state.scores.timeliness * 0.3 +
    state.scores.access * 0.25 +
    state.scores.trust * 0.2 +
    state.scores.clarity * 0.15 +
    state.scores.privacy * 0.1
  )
}

function strongestDimensions() {
  return Object.entries(state.scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([key]) => titleCase(key))
}

function lowestDimensions() {
  return Object.entries(state.scores)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 2)
    .map(([key]) => titleCase(key))
}

function createWindows() {
  elements.cityWindows.innerHTML = Array.from({ length: 24 }, () => "<span></span>").join("")
}

function updateWindows(index) {
  const lit = Math.max(2, Math.round((index / 100) * 24))
  elements.cityWindows.querySelectorAll("span").forEach((windowNode, position) => {
    windowNode.classList.toggle("is-lit", position < lit)
  })
}

function updateFact(title, text) {
  elements.factBox.innerHTML = `<p class="fact-pulse">${escapeHtml(title)}</p><p>${escapeHtml(text)}</p>`
}

function copyResult() {
  const text = `Map Without Stigma Night Ledger - Safe Path Index ${calculateSafePathIndex()}. Clear paths, not shame.`
  if (!navigator.clipboard) {
    updateFact("Copy unavailable", text)
    return
  }

  navigator.clipboard.writeText(text)
    .then(() => updateFact("Result copied", "The Night Ledger result is ready to share without personal details."))
    .catch(() => updateFact("Copy unavailable", text))
}

function labelForIntervention(id) {
  return interventions.find((item) => item.id === id)?.label || id
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function titleCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    }
    return entities[character]
  })
}

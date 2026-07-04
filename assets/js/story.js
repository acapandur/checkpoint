/* ==========================================================================
   THREE NIGHTS / TRI NOĆI — story data & stage art
   An episodic interactive story for the Map Without Stigma campaign.
   All characters and events are fictional. Educational, not medical advice.
   Every string ships in both languages: { en: "...", hr: "..." }.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------- Palette shared with site.css ---------------- */
  var P = {
    pit: "#060a12", mid: "#0a0f1c", mid2: "#0d1524",
    noc: "#111b2e", noc2: "#15213a",
    brass: "#c9a24b", gold: "#e9c368", goldSoft: "#f6e7bd",
    jade: "#3fc9b2", jadeDeep: "#14705f",
    garnet: "#e0564e", champ: "#ece4cf", parlor: "#c6cddc"
  };

  /* ================================================================
     SCENE BACKGROUNDS — 1200 × 630 stage paintings
     ================================================================ */
  var BG = {};

  BG.bedroom = '<svg viewBox="0 0 1200 630" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<defs><linearGradient id="bd1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1328"/><stop offset="1" stop-color="' + P.pit + '"/></linearGradient>'
    + '<radialGradient id="bd2" cx="0.5" cy="0.4" r="0.6"><stop offset="0.4" stop-color="#f2ddaa"/><stop offset="1" stop-color="#f2ddaa" stop-opacity="0"/></radialGradient></defs>'
    + '<rect width="1200" height="630" fill="url(#bd1)"/>'
    + '<rect x="700" y="70" width="360" height="330" fill="#0b1226" stroke="' + P.brass + '" stroke-opacity="0.5" stroke-width="4"/>'
    + '<path d="M880 70 V400 M700 235 H1060" stroke="' + P.brass + '" stroke-opacity="0.5" stroke-width="4"/>'
    + '<circle cx="960" cy="160" r="46" fill="url(#bd2)"/><circle cx="960" cy="160" r="26" fill="#f2ddaa"/>'
    + '<path d="M760 400 V330 h30 v-40 h20 v-26 h12 v26 h20 v40 h30 v70 Z" fill="#101a30"/>'
    + '<path d="M660 70 h30 v330 h-30 z M1070 70 h30 v330 h-30 z" fill="#1a2438"/>'
    + '<path d="M660 70 h30 l40 330 h-30 Z M1100 70 h-30 l-40 330 h30 Z" fill="#141d30"/>'
    + '<rect x="80" y="470" width="480" height="26" fill="#141d30"/>'
    + '<rect x="120" y="496" width="400" height="90" fill="#101a2c"/>'
    + '<rect x="90" y="430" width="180" height="40" fill="#1a2438"/>'
    + '<rect x="96" y="380" width="14" height="50" fill="' + P.brass + '" opacity="0.8"/>'
    + '<path d="M70 380 h66 l-10 -34 h-46 Z" fill="' + P.gold + '" opacity="0.9"/>'
    + '<ellipse cx="103" cy="392" rx="80" ry="34" fill="' + P.gold + '" opacity="0.12"/>'
    + '<rect x="440" y="440" width="56" height="34" rx="4" fill="#0b1226" stroke="' + P.jade + '" stroke-width="2"/>'
    + '<rect x="448" y="446" width="40" height="22" fill="' + P.jade + '" opacity="0.35"/>'
    + '<ellipse cx="468" cy="452" rx="70" ry="30" fill="' + P.jade + '" opacity="0.10"/>'
    + '<path d="M0 586 h1200" stroke="' + P.brass + '" stroke-opacity="0.35" stroke-width="2"/>'
    + '</svg>';

  BG.street = '<svg viewBox="0 0 1200 630" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<defs><linearGradient id="st1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1226"/><stop offset="1" stop-color="' + P.pit + '"/></linearGradient></defs>'
    + '<rect width="1200" height="630" fill="url(#st1)"/>'
    + '<path d="M0 470 V210 h90 v-40 h70 v40 h80 v260 Z" fill="#101a30"/>'
    + '<path d="M280 470 V160 h60 v-50 h46 v50 h60 v310 Z" fill="#0d1628"/>'
    + '<path d="M900 470 V190 h74 v-44 h56 v44 h74 v280 Z" fill="#101a30"/>'
    + '<g fill="#f2ddaa" opacity="0.9"><rect x="30" y="250" width="12" height="18"/><rect x="70" y="250" width="12" height="18"/><rect x="30" y="310" width="12" height="18"/><rect x="120" y="340" width="12" height="18"/><rect x="310" y="210" width="11" height="17"/><rect x="352" y="260" width="11" height="17"/><rect x="310" y="330" width="11" height="17"/><rect x="930" y="240" width="12" height="18"/><rect x="1010" y="300" width="12" height="18"/><rect x="960" y="360" width="12" height="18"/></g>'
    + '<rect x="560" y="180" width="240" height="290" fill="#0f1930"/>'
    + '<rect x="586" y="330" width="80" height="140" fill="#0b1322" stroke="' + P.brass + '" stroke-opacity="0.6" stroke-width="3"/>'
    + '<rect x="700" y="330" width="74" height="90" fill="#0b1322" stroke="' + P.brass + '" stroke-opacity="0.4" stroke-width="2"/>'
    + '<g transform="translate(680 236)"><rect x="-64" y="-34" width="128" height="68" fill="#07130f" stroke="' + P.jade + '" stroke-width="3"/><path d="M-10 -22 h20 v12 h12 v20 h-12 v12 h-20 v-12 h-12 v-20 h12 Z" fill="' + P.jade + '"/><ellipse cx="0" cy="0" rx="110" ry="52" fill="' + P.jade + '" opacity="0.12"/></g>'
    + '<text x="680" y="296" text-anchor="middle" fill="' + P.jade + '" font-family="Jost, sans-serif" font-size="22" letter-spacing="8" opacity="0.9">LJEKARNA</text>'
    + '<g stroke="' + P.brass + '" stroke-width="4"><path d="M210 470 V300"/><path d="M1080 470 V300"/></g>'
    + '<path d="M186 300 h48 l-8 -22 h-32 Z" fill="' + P.gold + '"/><path d="M1056 300 h48 l-8 -22 h-32 Z" fill="' + P.gold + '"/>'
    + '<ellipse cx="210" cy="316" rx="70" ry="26" fill="' + P.gold + '" opacity="0.14"/><ellipse cx="1080" cy="316" rx="70" ry="26" fill="' + P.gold + '" opacity="0.14"/>'
    + '<rect y="470" width="1200" height="160" fill="#060b14"/>'
    + '<path d="M0 500 h1200 M0 560 h1200" stroke="#101a30" stroke-width="3"/>'
    + '<path d="M640 470 v160 M540 470 l-60 160 M740 470 l60 160" stroke="' + P.brass + '" stroke-opacity="0.25" stroke-width="3"/>'
    + '<ellipse cx="680" cy="520" rx="130" ry="14" fill="' + P.jade + '" opacity="0.10"/>'
    + '</svg>';

  BG.pharmacy = '<svg viewBox="0 0 1200 630" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<defs><linearGradient id="ph1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101a2e"/><stop offset="1" stop-color="#0a1220"/></linearGradient></defs>'
    + '<rect width="1200" height="630" fill="url(#ph1)"/>'
    + '<rect x="90" y="80" width="300" height="300" fill="#0d1526" stroke="' + P.brass + '" stroke-opacity="0.4" stroke-width="3"/>'
    + '<rect x="810" y="80" width="300" height="300" fill="#0d1526" stroke="' + P.brass + '" stroke-opacity="0.4" stroke-width="3"/>'
    + '<g stroke="' + P.brass + '" stroke-opacity="0.4" stroke-width="3"><path d="M90 155 h300 M90 230 h300 M90 305 h300 M810 155 h300 M810 230 h300 M810 305 h300"/></g>'
    + '<g fill="#1a2740"><rect x="112" y="112" width="26" height="40"/><rect x="152" y="118" width="22" height="34"/><rect x="196" y="108" width="30" height="44"/><rect x="244" y="118" width="22" height="34"/><rect x="288" y="112" width="26" height="40"/><rect x="336" y="120" width="22" height="32"/><rect x="832" y="112" width="26" height="40"/><rect x="874" y="118" width="22" height="34"/><rect x="918" y="108" width="30" height="44"/><rect x="966" y="118" width="22" height="34"/><rect x="1010" y="112" width="26" height="40"/><rect x="1058" y="120" width="22" height="32"/></g>'
    + '<g fill="' + P.jade + '" opacity="0.55"><rect x="112" y="186" width="26" height="38"/><rect x="196" y="182" width="30" height="42"/><rect x="288" y="186" width="26" height="38"/><rect x="874" y="186" width="22" height="38"/><rect x="966" y="182" width="22" height="42"/><rect x="1058" y="186" width="22" height="38"/></g>'
    + '<g fill="' + P.gold + '" opacity="0.5"><rect x="152" y="262" width="22" height="36"/><rect x="244" y="258" width="22" height="40"/><rect x="336" y="262" width="22" height="36"/><rect x="832" y="262" width="26" height="36"/><rect x="918" y="258" width="30" height="40"/><rect x="1010" y="262" width="26" height="36"/></g>'
    + '<g transform="translate(600 150)"><rect x="-52" y="-52" width="104" height="104" fill="#07130f" stroke="' + P.jade + '" stroke-width="3"/><path d="M-14 -34 h28 v20 h20 v28 h-20 v20 h-28 v-20 h-20 v-28 h20 Z" fill="' + P.jade + '"/></g>'
    + '<rect x="330" y="420" width="540" height="34" fill="#1a2740"/>'
    + '<rect x="350" y="454" width="500" height="150" fill="#12203a"/>'
    + '<path d="M350 454 h500 v14 h-500 Z" fill="' + P.brass + '" opacity="0.55"/>'
    + '<g stroke="' + P.brass + '" stroke-opacity="0.5" stroke-width="2"><path d="M410 500 v70 M520 500 v70 M600 468 v-8 M680 500 v70 M790 500 v70"/></g>'
    + '<ellipse cx="600" cy="430" rx="330" ry="40" fill="' + P.gold + '" opacity="0.08"/>'
    + '</svg>';

  BG.checkpoint = '<svg viewBox="0 0 1200 630" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<defs><linearGradient id="cp1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#111b30"/><stop offset="1" stop-color="#0a1120"/></linearGradient></defs>'
    + '<rect width="1200" height="630" fill="url(#cp1)"/>'
    + '<g transform="translate(600 190)" stroke="' + P.gold + '" stroke-width="3" opacity="0.9">'
    + '<path d="M0 0 V-120" /><path d="M0 0 L-92 -78"/><path d="M0 0 L92 -78"/><path d="M0 0 L-132 -20"/><path d="M0 0 L132 -20"/><path d="M0 0 L-52 -112"/><path d="M0 0 L52 -112"/>'
    + '<circle cx="0" cy="0" r="16" fill="' + P.gold + '" stroke="none"/></g>'
    + '<path d="M430 214 h340" stroke="' + P.brass + '" stroke-width="3"/>'
    + '<text x="600" y="252" text-anchor="middle" fill="' + P.goldSoft + '" font-family="Jost, sans-serif" font-size="24" letter-spacing="10">CHECKPOINT</text>'
    + '<rect x="70" y="120" width="220" height="330" fill="#0d1628" stroke="' + P.brass + '" stroke-opacity="0.35" stroke-width="3"/>'
    + '<path d="M180 120 V450 M70 285 H290" stroke="' + P.brass + '" stroke-opacity="0.35" stroke-width="3"/>'
    + '<rect x="920" y="150" width="150" height="300" fill="#0d1628" stroke="' + P.brass + '" stroke-opacity="0.35" stroke-width="3"/>'
    + '<path d="M960 450 c-20 -70 20 -90 10 -140 c30 30 30 70 24 96 c26 -18 34 -50 30 -72 c22 40 10 90 -10 116 Z" fill="' + P.jadeDeep + '"/>'
    + '<rect x="944" y="450" width="92" height="26" fill="#1a2740"/>'
    + '<rect x="380" y="430" width="440" height="30" fill="#1a2740"/>'
    + '<rect x="398" y="460" width="404" height="130" fill="#12203a"/>'
    + '<path d="M398 460 h404 v12 h-404 Z" fill="' + P.brass + '" opacity="0.55"/>'
    + '<g stroke="' + P.brass + '" stroke-opacity="0.45" stroke-width="2"><path d="M450 502 v66 M540 502 v66 M660 502 v66 M750 502 v66"/></g>'
    + '<ellipse cx="600" cy="330" rx="360" ry="60" fill="' + P.gold + '" opacity="0.06"/>'
    + '</svg>';

  BG.clinic = '<svg viewBox="0 0 1200 630" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<defs><linearGradient id="cl1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e1730"/><stop offset="1" stop-color="#091120"/></linearGradient></defs>'
    + '<rect width="1200" height="630" fill="url(#cl1)"/>'
    + '<path d="M0 470 L400 380 L800 380 L1200 470" fill="#0b1322"/>'
    + '<path d="M400 90 h400 v290 h-400 Z" fill="#0d1730"/>'
    + '<path d="M0 90 L400 90 L400 380 L0 470 Z" fill="#0c1526"/>'
    + '<path d="M1200 90 L800 90 L800 380 L1200 470 Z" fill="#0c1526"/>'
    + '<g fill="#101c36" stroke="' + P.brass + '" stroke-opacity="0.3" stroke-width="3">'
    + '<path d="M120 150 h120 v240 l-120 24 Z"/><path d="M950 150 h120 v264 l-120 -24 Z"/>'
    + '<rect x="480" y="150" width="100" height="230"/><rect x="620" y="150" width="100" height="230"/></g>'
    + '<g fill="' + P.gold + '" opacity="0.75"><circle cx="230" cy="270" r="5"/><circle cx="960" cy="270" r="5"/><circle cx="570" cy="265" r="5"/><circle cx="630" cy="265" r="5"/></g>'
    + '<rect x="460" y="96" width="280" height="34" fill="#0b1322" stroke="' + P.jade + '" stroke-opacity="0.7" stroke-width="2"/>'
    + '<path d="M492 113 h60 M700 113 h-60 M560 113 l-10 -7 v14 Z M640 113 l10 -7 v14 Z" stroke="' + P.jade + '" stroke-width="3"/>'
    + '<g stroke="#f2ddaa" stroke-opacity="0.5" stroke-width="4"><path d="M180 60 h840"/></g>'
    + '<ellipse cx="600" cy="300" rx="380" ry="70" fill="#f2ddaa" opacity="0.05"/>'
    + '<g fill="#12203a"><rect x="60" y="480" width="200" height="24"/><rect x="60" y="504" width="16" height="60"/><rect x="244" y="504" width="16" height="60"/><rect x="940" y="480" width="200" height="24"/><rect x="940" y="504" width="16" height="60"/><rect x="1124" y="504" width="16" height="60"/></g>'
    + '</svg>';

  BG.tram = '<svg viewBox="0 0 1200 630" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<defs><linearGradient id="tr1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1226"/><stop offset="1" stop-color="' + P.pit + '"/></linearGradient></defs>'
    + '<rect width="1200" height="630" fill="url(#tr1)"/>'
    + '<path d="M0 460 V220 h110 v-36 h80 v36 h110 v240 Z" fill="#0d1628"/>'
    + '<path d="M880 460 V240 h90 v-30 h60 v30 h90 v220 Z" fill="#0d1628"/>'
    + '<g fill="#f2ddaa" opacity="0.85"><rect x="40" y="260" width="12" height="18"/><rect x="130" y="300" width="12" height="18"/><rect x="220" y="260" width="12" height="18"/><rect x="920" y="280" width="12" height="18"/><rect x="1030" y="330" width="12" height="18"/></g>'
    + '<rect x="380" y="200" width="440" height="230" fill="#10203a" stroke="' + P.jade + '" stroke-opacity="0.8" stroke-width="4"/>'
    + '<g fill="#0b1322" stroke="' + P.gold + '" stroke-opacity="0.7" stroke-width="3"><rect x="404" y="230" width="86" height="90"/><rect x="512" y="230" width="86" height="90"/><rect x="620" y="230" width="86" height="90"/><rect x="712" y="230" width="84" height="150"/></g>'
    + '<g fill="' + P.gold + '" opacity="0.8"><rect x="410" y="238" width="74" height="74"/><rect x="518" y="238" width="74" height="74"/><rect x="626" y="238" width="74" height="74"/></g>'
    + '<circle cx="410" cy="404" r="9" fill="#f2ddaa"/><circle cx="790" cy="404" r="9" fill="' + P.garnet + '"/>'
    + '<path d="M470 200 l30 -50 M730 200 l-30 -50" stroke="' + P.jade + '" stroke-width="3"/>'
    + '<path d="M0 176 h1200" stroke="' + P.jade + '" stroke-opacity="0.3" stroke-width="2"/>'
    + '<rect y="460" width="1200" height="170" fill="#060b14"/>'
    + '<path d="M0 500 h1200 M0 522 h1200" stroke="' + P.brass + '" stroke-opacity="0.4" stroke-width="4"/>'
    + '<g stroke="' + P.brass + '" stroke-width="4"><path d="M150 460 V310"/></g>'
    + '<rect x="118" y="270" width="64" height="44" fill="#0b1322" stroke="' + P.gold + '" stroke-width="2"/>'
    + '<circle cx="150" cy="292" r="12" fill="none" stroke="' + P.jade + '" stroke-width="3"/>'
    + '</svg>';

  BG.cafe = '<svg viewBox="0 0 1200 630" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<defs><linearGradient id="cf1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#121a2e"/><stop offset="1" stop-color="#0a101e"/></linearGradient></defs>'
    + '<rect width="1200" height="630" fill="url(#cf1)"/>'
    + '<rect x="620" y="80" width="480" height="320" fill="#0b1428" stroke="' + P.brass + '" stroke-opacity="0.45" stroke-width="4"/>'
    + '<path d="M860 80 V400 M620 240 H1100" stroke="' + P.brass + '" stroke-opacity="0.45" stroke-width="4"/>'
    + '<path d="M660 400 V330 h50 v-60 h34 v60 h50 v70 Z" fill="#0f1a30"/>'
    + '<path d="M920 400 V300 h44 v-44 h28 v44 h44 v100 Z" fill="#0f1a30"/>'
    + '<g fill="#f2ddaa" opacity="0.8"><rect x="672" y="344" width="10" height="15"/><rect x="932" y="316" width="10" height="15"/><rect x="996" y="350" width="10" height="15"/></g>'
    + '<path d="M80 120 q260 90 520 0" fill="none" stroke="' + P.brass + '" stroke-opacity="0.6" stroke-width="2"/>'
    + '<g fill="' + P.gold + '"><circle cx="130" cy="140" r="5"/><circle cx="210" cy="158" r="5"/><circle cx="290" cy="165" r="5"/><circle cx="370" cy="160" r="5"/><circle cx="450" cy="146" r="5"/><circle cx="530" cy="126" r="5"/></g>'
    + '<ellipse cx="330" cy="180" rx="280" ry="60" fill="' + P.gold + '" opacity="0.07"/>'
    + '<rect x="240" y="430" width="480" height="26" fill="#1c2338"/>'
    + '<rect x="270" y="456" width="26" height="130" fill="#141d30"/><rect x="664" y="456" width="26" height="130" fill="#141d30"/>'
    + '<g><ellipse cx="392" cy="424" rx="34" ry="10" fill="#0b1322"/><path d="M366 414 q26 -16 52 0 l-6 12 h-40 Z" fill="' + P.goldSoft + '"/><path d="M418 410 q16 2 12 14" fill="none" stroke="' + P.goldSoft + '" stroke-width="3"/></g>'
    + '<g><ellipse cx="560" cy="424" rx="34" ry="10" fill="#0b1322"/><path d="M534 414 q26 -16 52 0 l-6 12 h-40 Z" fill="' + P.jade + '"/><path d="M586 410 q16 2 12 14" fill="none" stroke="' + P.jade + '" stroke-width="3"/></g>'
    + '<path d="M380 396 q6 -12 0 -22 M404 396 q6 -12 0 -22 M548 396 q6 -12 0 -22 M572 396 q6 -12 0 -22" stroke="#f2ddaa" stroke-opacity="0.5" stroke-width="3" fill="none"/>'
    + '</svg>';

  BG.coast = '<svg viewBox="0 0 1200 630" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<defs><linearGradient id="co1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1226"/><stop offset="0.62" stop-color="#12203a"/><stop offset="0.78" stop-color="#7a5a30"/><stop offset="0.82" stop-color="#0a1424"/><stop offset="1" stop-color="' + P.pit + '"/></linearGradient></defs>'
    + '<rect width="1200" height="630" fill="url(#co1)"/>'
    + '<circle cx="600" cy="470" r="70" fill="' + P.gold + '" opacity="0.9"/>'
    + '<rect y="490" width="1200" height="140" fill="#081020"/>'
    + '<g stroke="' + P.gold + '" stroke-opacity="0.6" stroke-width="3" stroke-linecap="round"><path d="M480 520 h240"/><path d="M520 548 h160"/><path d="M560 574 h80"/></g>'
    + '<g stroke="#f2ddaa" stroke-opacity="0.25" stroke-width="2" stroke-linecap="round"><path d="M160 530 h90"/><path d="M920 540 h110"/><path d="M300 574 h70"/><path d="M840 586 h60"/></g>'
    + '<path d="M1030 490 V330 h14 v-16 h8 v-14 h20 v14 h8 v16 h14 v160 Z" fill="#0d1526"/>'
    + '<rect x="1046" y="298" width="28" height="14" fill="#f2ddaa"/>'
    + '<g fill="#e9c368" opacity="0.5"><circle cx="180" cy="120" r="2.4"/><circle cx="420" cy="80" r="2"/><circle cx="820" cy="100" r="2.4"/><circle cx="1080" cy="70" r="2"/><path d="M640 130 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z"/></g>'
    + '<g stroke="' + P.brass + '" stroke-opacity="0.5" stroke-width="2" fill="none"><path d="M40 60 h150 M40 60 v40 M1160 60 h-150 M1160 60 v40"/></g>'
    + '</svg>';

  BG.phone = '<svg viewBox="0 0 1200 630" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<rect width="1200" height="630" fill="' + P.pit + '"/>'
    + '<rect x="410" y="40" width="380" height="560" rx="30" fill="#0b1322" stroke="' + P.brass + '" stroke-width="3"/>'
    + '<rect x="436" y="86" width="328" height="470" fill="#0e1830"/>'
    + '<rect x="540" y="58" width="120" height="10" rx="5" fill="#1a2740"/>'
    + '<g font-family="Jost, sans-serif" font-size="19">'
    + '<rect x="456" y="120" width="200" height="56" fill="#16233c"/><text x="472" y="154" fill="' + P.parlor + '">02:47 · ?!?</text>'
    + '<rect x="544" y="196" width="200" height="56" fill="' + P.jadeDeep + '"/><text x="560" y="230" fill="#eafff9">Hej. Jesi budan?</text>'
    + '<rect x="456" y="272" width="220" height="56" fill="#16233c"/><text x="472" y="306" fill="' + P.parlor + '">Da. Šta je bilo?</text>'
    + '<rect x="544" y="348" width="200" height="56" fill="' + P.jadeDeep + '"/><text x="560" y="382" fill="#eafff9">Trebam te. Sada.</text>'
    + '<circle cx="700" cy="470" r="8" fill="' + P.gold + '"/><circle cx="676" cy="470" r="8" fill="' + P.gold + '" opacity="0.6"/><circle cx="652" cy="470" r="8" fill="' + P.gold + '" opacity="0.3"/>'
    + '</g>'
    + '<ellipse cx="600" cy="320" rx="330" ry="240" fill="' + P.jade + '" opacity="0.05"/>'
    + '</svg>';

  BG.title = '<svg viewBox="0 0 1200 630" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'
    + '<rect width="1200" height="630" fill="' + P.pit + '"/>'
    + '<g stroke="' + P.gold + '" stroke-opacity="0.14" stroke-width="2">'
    + '<path d="M600 700 L600 -40"/><path d="M600 700 L200 -20"/><path d="M600 700 L1000 -20"/><path d="M600 700 L-60 200"/><path d="M600 700 L1260 200"/><path d="M600 700 L-60 460"/><path d="M600 700 L1260 460"/></g>'
    + '<g fill="none" stroke="' + P.brass + '" stroke-width="3"><path d="M60 60 v60 M60 60 h60 M1140 60 v60 M1140 60 h-60 M60 570 v-60 M60 570 h60 M1140 570 v-60 M1140 570 h-60"/></g>'
    + '<g fill="' + P.gold + '" opacity="0.55"><path d="M220 160 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z"/><path d="M960 140 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4z"/><circle cx="380" cy="110" r="2.4"/><circle cx="820" cy="120" r="2"/></g>'
    + '</svg>';

  /* ================================================================
     CHARACTER CAMEOS — deco profile busts (facing left by default)
     ================================================================ */

  function cameo(cfg) {
    var accent = cfg.accent || P.jade;
    var head =
      '<path d="M118 34 C96 36 83 54 83 76 C83 88 87 95 83 101 L74 112 L84 116 C84 127 88 134 96 137 C97 145 103 151 112 152 L124 152 C139 149 148 134 148 115 L148 68 C148 49 137 36 118 34 Z" fill="#101a30" stroke="' + P.gold + '" stroke-width="2.5"/>';
    var features =
      '<path d="M92 96 Q101 90 110 95" fill="none" stroke="' + P.goldSoft + '" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M90 88 Q100 84 109 87" fill="none" stroke="' + P.brass + '" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M84 124 q7 4 14 1" fill="none" stroke="' + P.goldSoft + '" stroke-width="2.5" stroke-linecap="round"/>';
    var bust =
      '<path d="M112 152 C113 162 111 171 106 178 C132 185 156 198 162 220 L162 240 L38 240 L38 220 C46 200 66 188 88 182 C93 176 95 165 94 154" fill="#0d1628" stroke="' + P.gold + '" stroke-width="2.5"/>' +
      '<path d="M100 182 L88 204 L100 232 L114 204 Z" fill="' + accent + '" opacity="0.85"/>';
    return '<svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMax meet" aria-hidden="true">'
      + '<ellipse cx="100" cy="232" rx="86" ry="8" fill="#000" opacity="0.35"/>'
      + bust + head + (cfg.hair || "") + features + (cfg.extra || "")
      + '</svg>';
  }

  var CAST = {
    ema: {
      name: { en: "Ema", hr: "Ema" }, accent: P.jade,
      art: cameo({
        accent: P.jade,
        hair: '<path d="M118 28 C92 28 76 48 76 78 C76 90 79 97 76 104 L92 98 C88 72 98 54 120 50 L142 50 L142 108 L154 116 C156 70 150 28 118 28 Z" fill="#1d2b48" stroke="' + P.gold + '" stroke-width="2"/>' +
              '<path d="M76 104 L70 118 L86 112 Z" fill="#1d2b48" stroke="' + P.gold + '" stroke-width="2"/>'
      })
    },
    luka: {
      name: { en: "Luka", hr: "Luka" }, accent: P.gold,
      art: cameo({
        accent: P.gold,
        hair: '<g fill="#1d2b48" stroke="' + P.gold + '" stroke-width="2">' +
              '<circle cx="96" cy="44" r="15"/><circle cx="120" cy="36" r="16"/><circle cx="142" cy="46" r="14"/><circle cx="150" cy="68" r="12"/><circle cx="80" cy="60" r="12"/></g>'
      })
    },
    maja: {
      name: { en: "Maja · pharmacist", hr: "Maja · ljekarnica" }, accent: P.jade,
      art: cameo({
        accent: P.jade,
        hair: '<path d="M118 30 C94 30 79 50 79 76 L88 72 C88 56 100 46 118 46 L140 46 L146 82 L152 80 C154 50 144 30 118 30 Z" fill="#1d2b48" stroke="' + P.gold + '" stroke-width="2"/>' +
              '<circle cx="152" cy="100" r="18" fill="#1d2b48" stroke="' + P.gold + '" stroke-width="2"/>',
        extra: '<circle cx="100" cy="93" r="10" fill="none" stroke="' + P.goldSoft + '" stroke-width="2.5"/>' +
               '<path d="M110 93 h18" stroke="' + P.goldSoft + '" stroke-width="2.5"/>' +
               '<path d="M92 176 h32 M108 168 v16" stroke="' + P.jade + '" stroke-width="4"/>'
      })
    },
    novak: {
      name: { en: "Dr. Novak", hr: "Dr. Novak" }, accent: P.brass,
      art: cameo({
        accent: P.brass,
        hair: '<path d="M118 30 C96 30 82 46 80 66 C92 50 104 44 120 44 C110 52 104 62 102 74 C114 58 132 50 148 52 L150 92 L156 90 C158 54 148 30 118 30 Z" fill="#2a3652" stroke="' + P.gold + '" stroke-width="2"/>',
        extra: '<path d="M86 130 q10 8 22 4" fill="none" stroke="#8a94ab" stroke-width="2"/>' +
               '<path d="M96 154 L108 176 L100 196 L92 174 Z" fill="' + P.goldSoft + '"/>'
      })
    },
    ivan: {
      name: { en: "Ivan", hr: "Ivan" }, accent: P.garnet,
      art: cameo({
        accent: P.garnet,
        hair: '<path d="M118 30 C96 30 82 46 81 68 L148 60 L150 76 L156 74 C158 46 146 30 118 30 Z" fill="#1d2b48" stroke="' + P.gold + '" stroke-width="2"/>',
        extra: '<path d="M84 118 C84 132 92 142 104 146 L114 148 L114 138 C100 136 92 128 90 116 Z" fill="#1d2b48" opacity="0.9" stroke="' + P.gold + '" stroke-width="1.5"/>'
      })
    },
    petra: {
      name: { en: "Petra", hr: "Petra" }, accent: P.gold,
      art: cameo({
        accent: P.gold,
        hair: '<path d="M118 28 C92 28 76 48 76 80 C76 120 70 160 58 186 C74 182 84 170 90 154 L94 108 C90 76 100 54 122 50 L144 52 C152 90 154 140 146 182 C160 170 168 130 164 88 C160 48 146 28 118 28 Z" fill="#1d2b48" stroke="' + P.gold + '" stroke-width="2"/>',
        extra: '<path d="M148 122 l6 8 -6 8 -6 -8 Z" fill="' + P.gold + '"/>'
      })
    },
    sara: {
      name: { en: "Sara", hr: "Sara" }, accent: P.jade,
      art: cameo({
        accent: P.jade,
        hair: '<path d="M118 28 C92 28 76 48 78 74 L90 64 L96 74 L104 60 L112 72 L122 56 L134 68 L146 58 L150 80 L156 76 C156 46 144 28 118 28 Z" fill="#1d2b48" stroke="' + P.gold + '" stroke-width="2"/>'
      })
    }
  };

  /* Narrator / inner voice plates */
  var VOICES = {
    narr: { en: "The night", hr: "Noć" },
    think: { en: "Inner voice", hr: "Unutarnji glas" }
  };

  /* ================================================================
     UI STRINGS
     ================================================================ */
  var UI = {
    tapToContinue: { en: "Tap / space to continue", hr: "Dodirni / razmaknica za dalje" },
    chooseHint: { en: "Choose", hr: "Odaberi" },
    episodes: { en: "Choose an episode", hr: "Odaberi epizodu" },
    episode: { en: "Episode", hr: "Epizoda" },
    locked: { en: "Play the previous night first", hr: "Prvo odigraj prethodnu noć" },
    ready: { en: "Play", hr: "Igraj" },
    replay: { en: "Play again", hr: "Igraj ponovno" },
    done: { en: "Completed", hr: "Završeno" },
    continueStory: { en: "Continue", hr: "Nastavi" },
    backToEpisodes: { en: "All episodes", hr: "Sve epizode" },
    nightLedger: { en: "Night Ledger", hr: "Noćna bilanca" },
    whatTheNightShowed: { en: "What this night showed", hr: "Što je ova noć pokazala" },
    demandUnlocked: { en: "Campaign demand unlocked", hr: "Otključan zahtjev kampanje" },
    meters: {
      calm: { en: "Calm support", hr: "Mirna podrška" },
      clarity: { en: "Route clarity", hr: "Jasnoća rute" },
      trust: { en: "System trust", hr: "Povjerenje u sustav" }
    },
    meterHigh: {
      calm: { en: "Steady hands by sunrise.", hr: "Mirne ruke do zore." },
      clarity: { en: "The route was clear when it mattered.", hr: "Ruta je bila jasna kad je trebalo." },
      trust: { en: "Nobody had to face it alone.", hr: "Nitko nije morao biti sam." }
    },
    meterLow: {
      calm: { en: "Panic cost minutes the clock never gave back.", hr: "Panika je pojela minute koje sat ne vraća." },
      clarity: { en: "Too much of the night went to guessing.", hr: "Previše noći otišlo je na nagađanje." },
      trust: { en: "Silence made every corridor longer.", hr: "Šutnja je produljila svaki hodnik." }
    },
    finaleTitle: { en: "Three nights. One map.", hr: "Tri noći. Jedna karta." },
    finaleBody: {
      en: "Ema needed a clock that someone had already thought about. Ivan needed a question that wasn't treated as a confession. Petra and Sara needed a door closer than three hours away. None of them needed a miracle — they needed clearer Croatian routes and CheckPoint-style community access within real reach. That is what the campaign demands describe.",
      hr: "Emi je trebao sat o kojem je netko već razmišljao. Ivanu je trebalo pitanje koje se ne tretira kao priznanje. Petri i Sari trebala su vrata bliža od tri sata vožnje. Nikome od njih nije trebalo čudo – trebale su im jasnije hrvatske rute i CheckPoint-style pristup u zajednici stvarno nadohvat. Upravo to opisuju zahtjevi kampanje."
    },
    toPetition: { en: "Read the campaign demands", hr: "Pročitaj zahtjeve kampanje" },
    resetSave: { en: "Reset progress", hr: "Poništi napredak" },
    fiction: {
      en: "A fictional story for education. Not medical advice — see the PrEP & PEP page and talk to professionals.",
      hr: "Izmišljena priča u edukativne svrhe. Nije medicinski savjet – pogledaj stranicu PrEP i PEP i razgovaraj sa stručnjacima."
    },
    gateTitle: { en: "Before the curtain", hr: "Prije zastora" },
    gateBody: {
      en: "Three Nights is a fictional, choice-driven story about finding sexual-health care without shame. It mentions a broken condom, HIV prevention (PEP and PrEP) and testing — calmly, without graphic content. Nothing you choose is recorded beyond this browser, and the game never asks for personal details. If you need real help right now, contact a health professional or emergency services.",
      hr: "Tri noći izmišljena je priča s odlukama o traženju skrbi za spolno zdravlje bez srama. Spominje puknuti kondom, prevenciju HIV-a (PEP i PrEP) i testiranje – smireno, bez eksplicitnog sadržaja. Tvoji se odabiri ne bilježe izvan ovog preglednika i igra nikad ne traži osobne podatke. Ako ti sada treba stvarna pomoć, obrati se zdravstvenom stručnjaku ili hitnoj službi."
    },
    gateStart: { en: "Raise the curtain", hr: "Podigni zastor" }
  };

  /* ================================================================
     EPISODES
     ================================================================ */

  var EPISODES = [

    /* ---------------------------------------------------------
       EPISODE 1 — 72 HOURS / 72 SATA  (Ema · PEP)
       --------------------------------------------------------- */
    {
      id: "ep1",
      no: "I",
      title: { en: "72 Hours", hr: "72 sata" },
      tagline: {
        en: "2:47 a.m. The condom broke. The clock is honest — the city should be too.",
        hr: "2:47 ujutro. Kondom je pukao. Sat je iskren – grad bi trebao biti isto."
      },
      poster: "bedroom",
      start: "t1",
      insights: [
        { en: "PEP (post-exposure prophylaxis) exists: medicine that can prevent HIV after a possible exposure.", hr: "PEP (postekspozicijska profilaksa) postoji: lijek koji može spriječiti HIV nakon moguće izloženosti." },
        { en: "It must start as soon as possible — no later than 72 hours. Every hour matters.", hr: "Mora početi što prije – najkasnije unutar 72 sata. Svaki sat je važan." },
        { en: "The route runs through professionals: emergency care and infectious-disease clinics, then follow-up testing.", hr: "Ruta ide preko stručnjaka: hitne službe i klinike za infektivne bolesti, a zatim kontrolna testiranja." }
      ],
      demand: {
        en: "A clear urgent PEP assessment route in every Croatian region.",
        hr: "Jasna urgentna ruta za procjenu PEP-a u svakoj hrvatskoj regiji."
      },
      nodes: {
        t1: { type: "title", bg: "title",
          text: { en: "EPISODE I — 72 HOURS\nZagreb · 02:47", hr: "EPIZODA I. – 72 SATA\nZagreb · 2:47" },
          next: "n1" },
        n1: { bg: "bedroom", speaker: "narr",
          text: { en: "A ceiling. A streetlight drawing gold bars through the blinds. Ema, 24, sits up in the dark and stares at her phone like it owes her an answer.",
                  hr: "Strop. Ulična svjetiljka crta zlatne pruge kroz rolete. Ema, 24, sjedi u mraku i gleda u mobitel kao da joj duguje odgovor." },
          next: "n2" },
        n2: { bg: "bedroom", cast: [{ c: "ema", side: "L" }], speaker: "think",
          text: { en: "The condom broke. It broke, he left an hour ago, and my heart is doing tram-at-full-speed.",
                  hr: "Kondom je pukao. Pukao je, on je otišao prije sat vremena, a srce mi radi kao tramvaj u punoj brzini." },
          next: "n3" },
        n3: { bg: "bedroom", cast: [{ c: "ema", side: "L" }], speaker: "ema",
          text: { en: "Okay. Okay. Think, Ema. What do people actually *do* at three in the morning?",
                  hr: "Dobro. Dobro. Razmisli, Ema. Što ljudi zapravo *rade* u tri ujutro?" },
          choice: [
            { t: { en: "Open the internet and scroll. Fast.", hr: "Otvori internet i skrolaj. Brzo." }, fx: { calm: -6, clarity: -8 }, go: "n4a" },
            { t: { en: "Call Luka. He always picks up.", hr: "Nazovi Luku. On se uvijek javi." }, fx: { trust: +8 }, go: "n5" },
            { t: { en: "Breathe. Four counts in, four counts out.", hr: "Diši. Četiri udaha, četiri izdaha." }, fx: { calm: +8 }, go: "n4b" }
          ] },
        n4a: { bg: "phone", speaker: "narr",
          text: { en: "Eleven tabs. One forum says \"you have 72 hours\", another says \"it's already too late\", a third sells vitamins. Nothing official, nothing local, nothing signed by a human who knows.",
                  hr: "Jedanaest kartica. Jedan forum kaže \"imaš 72 sata\", drugi kaže \"već je prekasno\", treći prodaje vitamine. Ništa službeno, ništa lokalno, ništa što je potpisao čovjek koji zna." },
          next: "n4a2" },
        n4a2: { bg: "phone", speaker: "think",
          text: { en: "This is the problem. It's 3 a.m., I'm scared, and the first ten answers disagree with each other.",
                  hr: "To je taj problem. Tri su ujutro, bojim se, a prvih deset odgovora međusobno se ne slaže." },
          next: "n5" },
        n4b: { bg: "bedroom", cast: [{ c: "ema", side: "L" }], speaker: "think",
          text: { en: "In... two, three, four. Out... two, three, four. The fear is still there, but now it fits in a box I can carry. Next: Luka.",
                  hr: "Udah… dva, tri, četiri. Izdah… dva, tri, četiri. Strah je još tu, ali sad stane u kutiju koju mogu nositi. Sljedeće: Luka." },
          next: "n5" },
        n5: { bg: "bedroom", cast: [{ c: "ema", side: "L" }, { c: "luka", side: "R" }], speaker: "luka",
          text: { en: "Hey. Slow down, I'm here. Say it once, plainly.",
                  hr: "Hej. Polako, tu sam. Reci mi jednom, jednostavno." },
          next: "n6" },
        n6: { bg: "bedroom", cast: [{ c: "ema", side: "L" }, { c: "luka", side: "R" }], speaker: "ema",
          text: { en: "The condom broke. Tonight. I don't know his status. I don't know mine, honestly. And I don't know what happens now.",
                  hr: "Kondom je pukao. Večeras. Ne znam njegov status. Iskreno, ne znam ni svoj. I ne znam što sad." },
          next: "n7" },
        n7: { bg: "bedroom", cast: [{ c: "ema", side: "L" }, { c: "luka", side: "R" }], speaker: "luka",
          text: { en: "First: you're not the first person this has happened to, and you won't be the last. It's a health question, not a character question. Second: there's a thing called PEP — medicine that can prevent HIV after a possible exposure. But it's time-sensitive.",
                  hr: "Prvo: nisi prva osoba kojoj se ovo dogodilo i nećeš biti zadnja. To je zdravstveno pitanje, ne pitanje karaktera. Drugo: postoji nešto što se zove PEP – lijek koji može spriječiti HIV nakon moguće izloženosti. Ali vezan je uz vrijeme." },
          choice: [
            { t: { en: "\"How much time do I have?\"", hr: "\"Koliko vremena imam?\"" }, fx: { clarity: +8 }, go: "n8a" },
            { t: { en: "\"I'm so embarrassed I could sink.\"", hr: "\"Toliko me sram da bih propala u pod.\"" }, fx: { trust: +6 }, go: "n8b" },
            { t: { en: "\"Is it dangerous? The medicine?\"", hr: "\"Je li to opasno? Taj lijek?\"" }, fx: { clarity: +5 }, go: "n8c" }
          ] },
        n8a: { bg: "bedroom", cast: [{ c: "ema", side: "L" }, { c: "luka", side: "R" }], speaker: "luka",
          text: { en: "The official guidance is: start as soon as possible, and no later than 72 hours after the exposure. You're at hour one. That's not a countdown to panic about — it's a head start.",
                  hr: "Službena uputa glasi: početi što prije, a najkasnije 72 sata nakon izloženosti. Ti si na prvom satu. To nije odbrojavanje za paniku – to je prednost." },
          next: "n9" },
        n8b: { bg: "bedroom", cast: [{ c: "ema", side: "L" }, { c: "luka", side: "R" }], speaker: "luka",
          text: { en: "Ema. Condoms break. Zippers stick, trams run late, condoms break. Shame is the only part of tonight that has zero medical use — leave it on the floor and take the next step.",
                  hr: "Ema. Kondomi pucaju. Patentni se zaglave, tramvaji kasne, kondomi pucaju. Sram je jedini dio ove noći koji nema nikakvu medicinsku svrhu – ostavi ga na podu i napravi sljedeći korak." },
          next: "n9" },
        n8c: { bg: "bedroom", cast: [{ c: "ema", side: "L" }, { c: "luka", side: "R" }], speaker: "luka",
          text: { en: "It's real medicine, so it comes with a real doctor: they check whether it's right for you, explain it, and follow up. That's exactly why the route matters — this isn't a do-it-yourself night.",
                  hr: "To je pravi lijek, pa ide uz pravog liječnika: provjere odgovara li ti, objasne ti sve i prate te. Baš zato je ruta važna – ovo nije noć za \"uradi sam\"." },
          next: "n9" },
        n9: { bg: "bedroom", cast: [{ c: "ema", side: "L" }], speaker: "think",
          text: { en: "02:55. The pharmacy by the station works nights. A person. A counter. A face that has heard everything before.",
                  hr: "2:55. Ljekarna kod kolodvora radi noću. Osoba. Pult. Lice koje je već sve čulo." },
          next: "n10" },
        n10: { bg: "street", speaker: "narr",
          text: { en: "The city at three has a soundtrack of one tram and her own footsteps. The green cross glows over the wet asphalt like a small lighthouse.",
                  hr: "Grad u tri ima soundtrack od jednog tramvaja i njezinih koraka. Zeleni križ svijetli nad mokrim asfaltom kao mali svjetionik." },
          next: "n11" },
        n11: { bg: "pharmacy", cast: [{ c: "ema", side: "L" }, { c: "maja", side: "R" }], speaker: "maja",
          text: { en: "Good evening — or good night. Take a breath. How can I help?",
                  hr: "Dobra večer – ili dobra noć. Udahni. Kako mogu pomoći?" },
          next: "n12" },
        n12: { bg: "pharmacy", cast: [{ c: "ema", side: "L" }, { c: "maja", side: "R" }], speaker: "narr",
          text: { en: "Ema explains. Quietly, in three sentences. Maja nods the whole time, like this is a Tuesday. It probably is.",
                  hr: "Ema objašnjava. Tiho, u tri rečenice. Maja cijelo vrijeme kima, kao da je ovo običan utorak. Vjerojatno i jest." },
          next: "n13" },
        n13: { bg: "pharmacy", cast: [{ c: "ema", side: "L" }, { c: "maja", side: "R" }], speaker: "maja",
          text: { en: "You did well coming in. PEP is prescription medicine, so I can't hand it over this counter — the right door tonight is the emergency service and the infectious-disease clinic. You're well inside the window, and sooner is genuinely better.",
                  hr: "Dobro si napravila što si došla. PEP je lijek na recept, pa ti ga ne mogu izdati preko ovog pulta – prava vrata večeras su hitna služba i klinika za infektivne bolesti. Unutar si vremenskog okvira, a ranije je zaista bolje." },
          next: "n14" },
        n14: { bg: "pharmacy", cast: [{ c: "ema", side: "L" }, { c: "maja", side: "R" }], speaker: "maja",
          text: { en: "One more thing, and only if it applies: if pregnancy is a concern, emergency contraception is a separate question — raise both at the clinic. One clear thing at a time.",
                  hr: "Još nešto, i samo ako se odnosi na tebe: ako postoji mogućnost trudnoće, hitna kontracepcija zasebno je pitanje – spomeni oboje u klinici. Jedna jasna stvar po jedna." },
          choice: [
            { t: { en: "Go to the clinic. Now.", hr: "Idi u kliniku. Odmah." }, fx: { calm: +4, clarity: +6 }, urgent: true, go: "n16" },
            { t: { en: "\"Maybe I'll go in the morning...\"", hr: "\"Možda odem ujutro…\"" }, fx: { calm: -4 }, go: "n15" },
            { t: { en: "Ask Maja to write the route down.", hr: "Zamoli Maju da ti zapiše rutu." }, fx: { clarity: +10 }, go: "n15b" }
          ] },
        n15: { bg: "pharmacy", cast: [{ c: "ema", side: "L" }, { c: "maja", side: "R" }], speaker: "maja",
          text: { en: "Morning would still be inside the window — but with PEP, hours are the whole currency. If you can go now, go now. The night staff have seen everything; you will not surprise them.",
                  hr: "Jutro bi još bilo unutar okvira – ali kod PEP-a sati su jedina valuta. Ako možeš ići sada, idi sada. Noćna smjena vidjela je sve; nećeš ih iznenaditi." },
          next: "n16" },
        n15b: { bg: "pharmacy", cast: [{ c: "ema", side: "L" }, { c: "maja", side: "R" }], speaker: "narr",
          text: { en: "Maja writes it on the back of a receipt: WHERE. WHAT TO SAY. WHAT TO ASK. Three lines. It weighs nothing and it weighs everything.",
                  hr: "Maja piše na poleđini računa: KAMO. ŠTO REĆI. ŠTO PITATI. Tri retka. Ne teže ništa, a teže sve." },
          next: "n16" },
        n16: { bg: "clinic", speaker: "narr",
          text: { en: "Fluorescent light, a form, a pen on a chain. Nobody looks at her twice. In this corridor, her emergency is simply an emergency.",
                  hr: "Neonsko svjetlo, obrazac, kemijska na lančiću. Nitko je ne gleda dvaput. U ovom hodniku njezin hitan slučaj jednostavno je hitan slučaj." },
          next: "n17" },
        n17: { bg: "clinic", cast: [{ c: "ema", side: "L" }, { c: "novak", side: "R" }], speaker: "novak",
          text: { en: "I'm the doctor on duty — Novak. You came at the right time, and you came to the right place. We'll go through a few calm questions, check that PEP is appropriate for you, and if it is, you'll start tonight. It's usually a 28-day course, with follow-up tests after.",
                  hr: "Ja sam dežurni liječnik – Novak. Došla si u pravo vrijeme i na pravo mjesto. Proći ćemo nekoliko mirnih pitanja, provjeriti odgovara li ti PEP i, ako odgovara, počinješ večeras. Obično je to terapija od 28 dana, s kontrolnim testiranjima poslije." },
          choice: [
            { t: { en: "\"Will this stay private?\"", hr: "\"Hoće li ovo ostati privatno?\"" }, fx: { trust: +8 }, go: "n18a" },
            { t: { en: "\"What do I tell people?\"", hr: "\"Što da kažem ljudima?\"" }, fx: { calm: +5 }, go: "n18b" },
            { t: { en: "Just nod. Words are done for tonight.", hr: "Samo kimni. Riječi su za večeras gotove." }, fx: { calm: +3 }, go: "n19" }
          ] },
        n18a: { bg: "clinic", cast: [{ c: "ema", side: "L" }, { c: "novak", side: "R" }], speaker: "novak",
          text: { en: "Your health information is confidential — that is not a courtesy, it's the rule we work under. What you share here is for your care, nothing else.",
                  hr: "Tvoji zdravstveni podaci povjerljivi su – to nije ljubaznost, to je pravilo po kojem radimo. Ono što ovdje podijeliš služi tvojoj skrbi i ničemu drugom." },
          next: "n19" },
        n18b: { bg: "clinic", cast: [{ c: "ema", side: "L" }, { c: "novak", side: "R" }], speaker: "novak",
          text: { en: "Whatever you choose. \"I had a health thing, it's handled\" is a complete sentence. You don't owe anyone the whole film of tonight.",
                  hr: "Što god ti odlučiš. \"Imala sam zdravstvenu stvar, riješeno je\" potpuna je rečenica. Nikome ne duguješ cijeli film ove noći." },
          next: "n19" },
        n19: { bg: "clinic", cast: [{ c: "ema", side: "L" }, { c: "novak", side: "R" }], speaker: "novak",
          text: { en: "One more thing for later, when tonight is behind you: there are community-based services, including CheckPoint Zagreb, for testing and honest conversations — including prevention like PrEP, if it ever fits your life. The point is to make nights like this shorter.",
                  hr: "Još nešto za poslije, kad ova noć bude iza tebe: postoje usluge u zajednici, uključujući CheckPoint Zagreb, za testiranje i iskrene razgovore – uključujući prevenciju poput PrEP-a, ako ti ikad bude odgovarala. Poanta je da noći poput ove postanu kraće." },
          next: "n20" },
        n20: { bg: "coast", cast: [{ c: "ema", side: "L" }], speaker: "think",
          text: { en: "First light over the rooftops. The clock mattered tonight — but the map mattered more. If I hadn't found the route... how many people don't?",
                  hr: "Prvo svjetlo nad krovovima. Sat je večeras bio važan – ali karta je bila važnija. Da nisam pronašla rutu… koliko je ljudi ne pronađe?" },
          next: "end" },
        end: { type: "end" }
      }
    },

    /* ---------------------------------------------------------
       EPISODE 2 — THE QUESTION / PITANJE  (Ivan · PrEP)
       --------------------------------------------------------- */
    {
      id: "ep2",
      no: "II",
      title: { en: "The Question", hr: "Pitanje" },
      tagline: {
        en: "Ivan has rehearsed one sentence for months. Asking it should not feel like a confession.",
        hr: "Ivan mjesecima uvježbava jednu rečenicu. Postaviti je ne bi smjelo biti kao priznanje."
      },
      poster: "cafe",
      start: "t1",
      insights: [
        { en: "PrEP (pre-exposure prophylaxis) is prevention: medicine HIV-negative people can take so an exposure is far less likely to become an infection.", hr: "PrEP (predekspozicijska profilaksa) jest prevencija: lijek koji HIV-negativne osobe mogu uzimati kako izloženost mnogo teže postane infekcija." },
        { en: "It runs through a prescription, an HIV test first and regular check-ups — a plan made with a professional, around your real life.", hr: "Ide uz recept, prethodni HIV test i redovite kontrole – plan koji sa stručnjakom slažeš prema svom stvarnom životu." },
        { en: "PrEP targets HIV specifically; condoms still matter for other infections. Asking about prevention is responsibility, not confession.", hr: "PrEP cilja specifično HIV; kondomi su i dalje važni za druge infekcije. Pitati o prevenciji odgovornost je, a ne priznanje." }
      ],
      demand: {
        en: "Clearer, more equitable and less stigmatized PrEP access and counseling.",
        hr: "Jasniji, ravnopravniji i manje stigmatiziran PrEP pristup i savjetovanje."
      },
      nodes: {
        t1: { type: "title", bg: "title",
          text: { en: "EPISODE II — THE QUESTION\nZagreb · 21:10", hr: "EPIZODA II. – PITANJE\nZagreb · 21:10" },
          next: "n1" },
        n1: { bg: "cafe", speaker: "narr",
          text: { en: "A café with string lights and one loud espresso machine. Ivan, 29, has been stirring the same coffee for ten minutes. Across the table: Luka, who notices everything and rushes nothing.",
                  hr: "Kafić sa žaruljicama i jednim preglasnim aparatom za espresso. Ivan, 29, deset minuta miješa istu kavu. Preko puta: Luka, koji sve primijeti i ništa ne požuruje." },
          next: "n2" },
        n2: { bg: "cafe", cast: [{ c: "ivan", side: "L" }, { c: "luka", side: "R" }], speaker: "think",
          text: { en: "I've rehearsed this question for months. In the shower. On the tram. It's eleven words. Why does it weigh a kilogram?",
                  hr: "Mjesecima uvježbavam ovo pitanje. Pod tušem. U tramvaju. Jedanaest riječi. Zašto teži kilogram?" },
          next: "n3" },
        n3: { bg: "cafe", cast: [{ c: "ivan", side: "L" }, { c: "luka", side: "R" }], speaker: "ivan",
          text: { en: "Luka. That thing you mentioned once — PrEP. What... is that, actually?",
                  hr: "Luka. Ono što si jednom spomenuo – PrEP. Što je to… zapravo?" },
          next: "n4" },
        n4: { bg: "cafe", cast: [{ c: "ivan", side: "L" }, { c: "luka", side: "R" }], speaker: "luka",
          text: { en: "Prevention. Medicine that HIV-negative people can take so that, if an exposure happens, it's far less likely to become an infection. Prescription, a test first, regular check-ups. Boring, in the best way — like a seatbelt.",
                  hr: "Prevencija. Lijek koji HIV-negativne osobe mogu uzimati kako, ako dođe do izloženosti, mnogo teže dođe do infekcije. Recept, prvo test, redovite kontrole. Dosadno, na najbolji način – kao pojas u autu." },
          choice: [
            { t: { en: "\"Isn't that for... other people?\"", hr: "\"Nije li to za… neke druge ljude?\"" }, fx: { clarity: +6 }, go: "n5a" },
            { t: { en: "\"Would a doctor judge me for asking?\"", hr: "\"Bi li me liječnik osuđivao što pitam?\"" }, fx: { trust: +6 }, go: "n5b" },
            { t: { en: "\"Where do you even ask about it?\"", hr: "\"Gdje se to uopće pita?\"" }, fx: { clarity: +8 }, go: "n5c" }
          ] },
        n5a: { bg: "cafe", cast: [{ c: "ivan", side: "L" }, { c: "luka", side: "R" }], speaker: "luka",
          text: { en: "Prevention doesn't have a guest list. It's for anyone whose life it fits — that's a conversation with a doctor, not a label. Seatbelts don't ask who's driving.",
                  hr: "Prevencija nema popis uzvanika. Za svakoga je kome odgovara u životu – to je razgovor s liječnikom, a ne etiketa. Pojas ne pita tko vozi." },
          next: "n6" },
        n5b: { bg: "cafe", cast: [{ c: "ivan", side: "L" }, { c: "luka", side: "R" }], speaker: "luka",
          text: { en: "A good clinician hears that question the way a dentist hears \"how do I floss properly\" — with relief. People who ask are the easy patients. And if someone does judge you, that's data about them, not about you.",
                  hr: "Dobar kliničar to pitanje čuje kao što zubar čuje \"kako se pravilno koristi konac\" – s olakšanjem. Ljudi koji pitaju laki su pacijenti. A ako te netko ipak osudi, to govori o njemu, ne o tebi." },
          next: "n6" },
        n5c: { bg: "cafe", cast: [{ c: "ivan", side: "L" }, { c: "luka", side: "R" }], speaker: "luka",
          text: { en: "A family doctor can be a route. So can a community service like CheckPoint Zagreb: testing, counseling, fewer raised eyebrows. Ema went for follow-up after her own long night. She said the hardest part was the door handle.",
                  hr: "Obiteljski liječnik može biti ruta. Može i usluga u zajednici poput CheckPointa Zagreb: testiranje, savjetovanje, manje podignutih obrva. Ema je otišla na kontrolu nakon svoje duge noći. Kaže da je najteži dio bila kvaka." },
          next: "n6" },
        n6: { bg: "cafe", cast: [{ c: "ivan", side: "L" }, { c: "luka", side: "R" }], speaker: "think",
          text: { en: "The strange thing about self-stigma: nobody in this café said a word, and I still heard a whole jury.",
                  hr: "Čudna stvar sa samostigmom: nitko u ovom kafiću nije rekao ni riječ, a ja sam ipak čuo cijelu porotu." },
          choice: [
            { t: { en: "\"Fine. Tomorrow evening I go.\"", hr: "\"Dobro. Sutra navečer idem.\"" }, fx: { calm: +6, trust: +4 }, go: "n8" },
            { t: { en: "\"Someday. When work calms down.\"", hr: "\"Jednog dana. Kad se posao smiri.\"" }, fx: { calm: -4 }, go: "n7" }
          ] },
        n7: { bg: "cafe", cast: [{ c: "ivan", side: "L" }, { c: "luka", side: "R" }], speaker: "luka",
          text: { en: "Ivan. \"Someday\" is where questions go to gather dust. It's one appointment. I'll walk you there myself and wait outside like a very patient statue.",
                  hr: "Ivane. \"Jednog dana\" mjesto je gdje pitanja skupljaju prašinu. Riječ je o jednom terminu. Osobno ću te otpratiti i čekati vani kao vrlo strpljiv kip." },
          next: "n8" },
        n8: { bg: "checkpoint", speaker: "narr",
          text: { en: "The next evening. A reception desk under a brass sunburst, a plant that is thriving suspiciously well, and no waiting-room stares — because nobody here thinks a question is a scandal.",
                  hr: "Sljedeće večeri. Recepcija pod mjedenim suncem, biljka koja sumnjivo dobro uspijeva i nijedan pogled iz čekaonice – jer ovdje nitko ne misli da je pitanje skandal." },
          next: "n9" },
        n9: { bg: "checkpoint", cast: [{ c: "ivan", side: "L" }, { c: "novak", side: "R" }], speaker: "novak",
          text: { en: "Welcome. You're asking about PrEP — good. Short version: it's for people who are HIV-negative, it works when taken as prescribed, and it starts with an HIV test plus regular check-ups after. It protects specifically against HIV; condoms still matter for other infections.",
                  hr: "Dobro došao. Pitaš o PrEP-u – odlično. Kratka verzija: namijenjen je HIV-negativnim osobama, djeluje kad se uzima prema uputi, a počinje HIV testom i redovitim kontrolama poslije. Štiti specifično od HIV-a; kondomi su i dalje važni za druge infekcije." },
          next: "n10" },
        n10: { bg: "checkpoint", cast: [{ c: "ivan", side: "L" }, { c: "novak", side: "R" }], speaker: "novak",
          text: { en: "Now — for the plan to fit, I need the real picture of your life, not the brochure version. How honest do you want to be today?",
                  hr: "A sada – da bi plan pristajao, treba mi stvarna slika tvog života, ne verzija iz brošure. Koliko iskren želiš biti danas?" },
          choice: [
            { t: { en: "The whole picture. All of it.", hr: "Cijela slika. Sve." }, fx: { trust: +10, clarity: +6 }, go: "n11a" },
            { t: { en: "Downplay it. Old habit.", hr: "Ublaži. Stara navika." }, fx: { trust: -6 }, go: "n11b" }
          ] },
        n11a: { bg: "checkpoint", cast: [{ c: "ivan", side: "L" }, { c: "novak", side: "R" }], speaker: "novak",
          text: { en: "Thank you. That just saved us both a month of guessing. There are no wrong answers in this room — only useful ones.",
                  hr: "Hvala ti. Upravo si nam obojici uštedio mjesec dana nagađanja. U ovoj sobi nema pogrešnih odgovora – samo korisnih." },
          next: "n12" },
        n11b: { bg: "checkpoint", cast: [{ c: "ivan", side: "L" }, { c: "novak", side: "R" }], speaker: "novak",
          text: { en: "Mm. Let me say this gently: a plan built on the polite version of your life will fit the polite version of your life. Nothing you say here surprises me, and none of it is a confession. Want to try again?",
                  hr: "Hm. Reći ću to nježno: plan složen prema pristojnoj verziji tvog života pristajat će pristojnoj verziji tvog života. Ništa što ovdje kažeš ne iznenađuje me i ništa nije priznanje. Želiš li pokušati ponovno?" },
          next: "n11c" },
        n11c: { bg: "checkpoint", cast: [{ c: "ivan", side: "L" }, { c: "novak", side: "R" }], speaker: "ivan",
          text: { en: "...Yeah. Okay. The real version, then.",
                  hr: "…Da. Dobro. Onda prava verzija." },
          fx: { trust: +8 },
          next: "n12" },
        n12: { bg: "checkpoint", cast: [{ c: "ivan", side: "L" }, { c: "novak", side: "R" }], speaker: "novak",
          text: { en: "Then we test, we plan, we schedule the check-ups. And Ivan — asking was the responsible move. Prevention is not a confession. Tell that to the jury in your head, with my regards.",
                  hr: "Onda testiramo, planiramo i dogovaramo kontrole. I, Ivane – pitati je bio odgovoran potez. Prevencija nije priznanje. Prenesi to poroti u svojoj glavi, uz moje pozdrave." },
          next: "n13" },
        n13: { bg: "street", cast: [{ c: "ivan", side: "L" }], speaker: "think",
          text: { en: "The question weighed a kilogram walking in. Walking out it weighs nothing. Same eleven words. Different room.",
                  hr: "Pitanje je na ulasku težilo kilogram. Na izlasku ne teži ništa. Istih jedanaest riječi. Druga prostorija." },
          next: "end" },
        end: { type: "end" }
      }
    },

    /* ---------------------------------------------------------
       EPISODE 3 — THE TEST / TEST  (Petra & Sara · testing, the gap)
       --------------------------------------------------------- */
    {
      id: "ep3",
      no: "III",
      title: { en: "The Test", hr: "Test" },
      tagline: {
        en: "A new couple, one small town, and a door that turns out to be three hours away.",
        hr: "Novi par, jedan mali grad i vrata koja su, ispostavi se, tri sata vožnje daleko."
      },
      poster: "coast",
      start: "t1",
      insights: [
        { en: "Getting tested together is routine care for a new couple — a fresh start, not an accusation.", hr: "Zajedničko testiranje rutinska je skrb za novi par – novi početak, a ne optužba." },
        { en: "Some infections take time to show on tests, so a counselor helps time and, if needed, repeat them. That's normal, not a verdict.", hr: "Neke se infekcije na testovima pokažu tek nakon nekog vremena, pa savjetnik pomaže odrediti trenutak i po potrebi ponoviti test. To je normalno, a ne presuda." },
        { en: "Confidential care exists, and anonymous options may exist depending on the service — but distance is still where stigma hides.", hr: "Povjerljiva skrb postoji, a anonimne opcije mogu postojati ovisno o službi – ali udaljenost je i dalje mjesto gdje se stigma skriva." }
      ],
      demand: {
        en: "CheckPoint-style community access within real reach of every region — not only one city.",
        hr: "CheckPoint-style pristup u zajednici stvarno nadohvat svakoj regiji – ne samo jednom gradu."
      },
      nodes: {
        t1: { type: "title", bg: "title",
          text: { en: "EPISODE III — THE TEST\nA small coastal town · 19:40", hr: "EPIZODA III. – TEST\nMali grad na obali · 19:40" },
          next: "n1" },
        n1: { bg: "coast", speaker: "narr",
          text: { en: "A stone pier, a low gold sun, two women sharing one scarf. Petra, 31, grew up three streets from here. Sara moved for her — and brought a habit of saying things out loud.",
                  hr: "Kameni mol, nisko zlatno sunce, dvije žene pod jednim šalom. Petra, 31, odrasla je tri ulice odavde. Sara se doselila zbog nje – i donijela naviku da stvari izgovara naglas." },
          next: "n2" },
        n2: { bg: "coast", cast: [{ c: "petra", side: "L" }, { c: "sara", side: "R" }], speaker: "sara",
          text: { en: "Before we go further — you and me — I want us both to get tested. Everything. Fresh page, both names on it.",
                  hr: "Prije nego što odemo dalje – ti i ja – želim da se obje testiramo. Sve. Čista stranica, oba imena na njoj." },
          choice: [
            { t: { en: "\"Wait. Do you think I have something?\"", hr: "\"Čekaj. Misliš da ja nešto imam?\"" }, fx: { calm: -4 }, go: "n3a" },
            { t: { en: "\"Deal. Both of us.\"", hr: "\"Dogovoreno. Obje.\"" }, fx: { trust: +10 }, go: "n4" },
            { t: { en: "Say nothing. Watch the sea do the talking.", hr: "Ne reci ništa. Neka more priča." }, fx: { calm: +2 }, go: "n3b" }
          ] },
        n3a: { bg: "coast", cast: [{ c: "petra", side: "L" }, { c: "sara", side: "R" }], speaker: "sara",
          text: { en: "No. That's the whole point — it's not an accusation, it's brakes before a road trip. You check them *because* the trip matters. This trip matters.",
                  hr: "Ne. U tome i jest stvar – to nije optužba, to su kočnice prije puta. Provjeravaš ih *zato što* ti je put važan. Ovaj put mi je važan." },
          next: "n4" },
        n3b: { bg: "coast", cast: [{ c: "petra", side: "L" }, { c: "sara", side: "R" }], speaker: "sara",
          text: { en: "I'll translate the silence: you're not scared of the test. You're scared of this town having opinions about it. Am I close?",
                  hr: "Prevest ću tišinu: ne bojiš se testa. Bojiš se da će ovaj grad imati mišljenje o njemu. Jesam li blizu?" },
          next: "n4" },
        n4: { bg: "coast", cast: [{ c: "petra", side: "L" }, { c: "sara", side: "R" }], speaker: "think",
          text: { en: "In this town the nurse is my neighbour's cousin and the waiting room has better memory than the church bell. That's the real test.",
                  hr: "U ovom gradu sestra u ambulanti rođakinja je moje susjede, a čekaonica pamti bolje od crkvenog zvona. To je pravi test." },
          next: "n5" },
        n5: { bg: "clinic", speaker: "narr",
          text: { en: "Monday. The town's one clinic: two corridors, one poster about ticks, a receptionist who knows everyone's grandmother by voice.",
                  hr: "Ponedjeljak. Jedina ambulanta u gradu: dva hodnika, jedan plakat o krpeljima i recepcija koja svačiju baku prepoznaje po glasu." },
          choice: [
            { t: { en: "Ask directly about confidentiality.", hr: "Izravno pitaj za povjerljivost." }, fx: { clarity: +8, trust: +4 }, go: "n6a" },
            { t: { en: "Turn around. Not here. Not like this.", hr: "Okreni se. Ne ovdje. Ne ovako." }, fx: { calm: -6 }, go: "n6b" },
            { t: { en: "\"It's, um... for a friend.\"", hr: "\"To je, ovaj… za prijateljicu.\"" }, fx: { clarity: -4 }, go: "n6c" }
          ] },
        n6a: { bg: "clinic", cast: [{ c: "petra", side: "L" }], speaker: "narr",
          text: { en: "The answer is kind and firm: health data is confidential here like anywhere — staff are bound by it. But the tests they want aren't done locally at all. The paper she gets is a referral, and the referral is a road.",
                  hr: "Odgovor je ljubazan i čvrst: zdravstveni podaci ovdje su povjerljivi kao i svugdje – osoblje ih je dužno čuvati. Ali testovi koje traže ovdje se uopće ne rade. Papir koji dobiva jest uputnica, a uputnica je cesta." },
          next: "n7" },
        n6b: { bg: "street", cast: [{ c: "petra", side: "L" }], speaker: "think",
          text: { en: "Halfway home I stop under a lamppost. This is what stigma actually does — it doesn't shout. It just quietly adds kilometers.",
                  hr: "Na pola puta kući zastanem pod svjetiljkom. Eto što stigma zapravo radi – ne viče. Samo tiho dodaje kilometre." },
          next: "n6b2" },
        n6b2: { bg: "street", cast: [{ c: "petra", side: "L" }, { c: "sara", side: "R" }], speaker: "sara",
          text: { en: "Hey. New plan, no corridors with familiar faces: HUHIV has CheckPoint Zagreb. It is built for confidential community testing; we check the current terms before we go. One catch — it's in Zagreb.",
                  hr: "Hej. Novi plan, bez hodnika s poznatim licima: HUHIV ima CheckPoint Zagreb. Osmišljen je za povjerljivo testiranje u zajednici; provjerimo aktualne uvjete prije odlaska. Jedna kvaka – u Zagrebu je." },
          next: "n8" },
        n6c: { bg: "clinic", cast: [{ c: "petra", side: "L" }], speaker: "narr",
          text: { en: "The receptionist has heard \"for a friend\" approximately four thousand times and treats it with perfect grace. The real answer is the same either way: the tests aren't done here. A referral. A road.",
                  hr: "Recepcionarka je \"za prijateljicu\" čula otprilike četiri tisuće puta i prima to savršeno dostojanstveno. Pravi odgovor u oba je slučaja isti: testovi se ovdje ne rade. Uputnica. Cesta." },
          next: "n7" },
        n7: { bg: "coast", cast: [{ c: "petra", side: "L" }, { c: "sara", side: "R" }], speaker: "sara",
          text: { en: "So the nearest door that fits us is in Zagreb. CheckPoint Zagreb — community-based, confidential, with current terms to verify before we go. Three hours there, three hours back. For a twenty-minute appointment.",
                  hr: "Dakle, najbliža vrata koja nam odgovaraju su u Zagrebu. CheckPoint Zagreb – u zajednici, povjerljivo, s aktualnim uvjetima koje treba provjeriti prije odlaska. Tri sata tamo, tri sata natrag. Za termin od dvadeset minuta." },
          next: "n8" },
        n8: { bg: "tram", speaker: "narr",
          text: { en: "Zagreb. The tram sighs them into the city. Six hours of road buys them a room where nobody knows their grandmother.",
                  hr: "Zagreb. Tramvaj ih uzdahom uvozi u grad. Šest sati ceste kupilo im je prostoriju u kojoj nitko ne poznaje njihovu baku." },
          next: "n9" },
        n9: { bg: "checkpoint", cast: [{ c: "petra", side: "L" }, { c: "novak", side: "R" }], speaker: "novak",
          text: { en: "Welcome, both of you. Here's how this works: a short conversation, the tests you choose, results explained privately. Confidential, with anonymous options where the service allows them. And couples testing together is one of my favourite appointments. It means the relationship is being built by adults.",
                  hr: "Dobro došle obje. Ovako to ide: kratak razgovor, testovi koje odaberete, rezultati objašnjeni nasamo. Povjerljivo, uz anonimne opcije ondje gdje ih usluga omogućuje. A parovi koji se testiraju zajedno među mojim su najdražim terminima. To znači da vezu grade odrasli ljudi." },
          next: "n10" },
        n10: { bg: "checkpoint", cast: [{ c: "petra", side: "L" }, { c: "novak", side: "R" }], speaker: "novak",
          text: { en: "One honest detail so nothing surprises you: some infections take time to show on a test — days to weeks, depending on the test. If the timing is off, we simply repeat it later. That's calendar work, not a verdict. And whatever a result says, there is always a next step. Knowing is the strong move.",
                  hr: "Jedan iskren detalj da vas ništa ne iznenadi: neke se infekcije na testu pokažu tek nakon nekog vremena – od nekoliko dana do nekoliko tjedana, ovisno o testu. Ako trenutak nije pravi, jednostavno ga kasnije ponovimo. To je posao za kalendar, ne presuda. I što god rezultat pokazao, uvijek postoji sljedeći korak. Znati je jači potez." },
          next: "n11" },
        n11: { bg: "checkpoint", cast: [{ c: "petra", side: "L" }, { c: "sara", side: "R" }], speaker: "narr",
          text: { en: "The waiting chairs. Ten minutes that pretend to be an hour.",
                  hr: "Stolice za čekanje. Deset minuta koje glume sat vremena." },
          choice: [
            { t: { en: "Hold Sara's hand and stare at the plant.", hr: "Primi Saru za ruku i gledaj u biljku." }, fx: { trust: +8 }, go: "n12" },
            { t: { en: "Joke: \"That plant is suspiciously healthy.\"", hr: "Našali se: \"Ta je biljka sumnjivo zdrava.\"" }, fx: { calm: +8 }, go: "n12" },
            { t: { en: "Breathe. Four in, four out. Old trick.", hr: "Diši. Četiri udaha, četiri izdaha. Stari trik." }, fx: { calm: +6 }, go: "n12" }
          ] },
        n12: { bg: "checkpoint", cast: [{ c: "petra", side: "L" }, { c: "sara", side: "R" }], speaker: "narr",
          text: { en: "The counselor goes through the results with each of them — privately, calmly, in full sentences. What was said in that room stays in that room, which is precisely the point.",
                  hr: "Savjetnik s njima prolazi rezultate – nasamo, mirno, u punim rečenicama. Ono što je rečeno u toj sobi ostaje u toj sobi, i upravo u tome jest poanta." },
          next: "n13" },
        n13: { bg: "checkpoint", cast: [{ c: "petra", side: "L" }, { c: "sara", side: "R" }], speaker: "sara",
          text: { en: "See? Adults. Fresh page, both names on it.",
                  hr: "Vidiš? Odrasli ljudi. Čista stranica, oba imena na njoj." },
          next: "n14" },
        n14: { bg: "checkpoint", cast: [{ c: "petra", side: "L" }, { c: "novak", side: "R" }], speaker: "novak",
          text: { en: "Before you go — you crossed half the country for this room. You shouldn't have had to. That distance is the part we're trying to fix.",
                  hr: "Prije nego što odete – prešle ste pola zemlje zbog ove sobe. Niste trebale morati. Upravo tu udaljenost pokušavamo ispraviti." },
          next: "n15" },
        n15: { bg: "coast", cast: [{ c: "petra", side: "L" }, { c: "sara", side: "R" }], speaker: "petra",
          text: { en: "Home pier, same scarf. The scary part was never the needle. It was the map — or the hole in it. One city shouldn't have all the doors.",
                  hr: "Domaći mol, isti šal. Strašni dio nikad nije bila igla. Bila je to karta – ili rupa u njoj. Jedan grad ne bi smio imati sva vrata." },
          next: "end" },
        end: { type: "end" }
      }
    }
  ];

  /* Expose */
  window.MWS_STORY = { BG: BG, CAST: CAST, VOICES: VOICES, UI: UI, EPISODES: EPISODES };
})();

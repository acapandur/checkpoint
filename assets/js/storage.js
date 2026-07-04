/* Project-scoped browser storage helper.
   Only language, story progress and instant-text preference are stored. */
(function () {
  "use strict";

  var PREFIX = "mws.";
  var KEYS = {
    lang: PREFIX + "lang",
    storyProgress: PREFIX + "storyProgress",
    instant: PREFIX + "instant"
  };
  var LEGACY_KEYS = {
    lang: "mws-lang",
    storyProgress: "mws-save",
    instant: "mws-instant"
  };

  function storageAvailable() {
    try {
      var key = PREFIX + "probe";
      window.localStorage.setItem(key, "1");
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  var available = storageAvailable();
  var memory = {};

  function keyFor(name) {
    if (!Object.prototype.hasOwnProperty.call(KEYS, name)) throw new Error("Unknown project storage key: " + name);
    return KEYS[name];
  }

  function readRaw(name) {
    var key = keyFor(name);
    if (!available) return Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null;
    var value = window.localStorage.getItem(key);
    if (value == null && LEGACY_KEYS[name]) {
      value = window.localStorage.getItem(LEGACY_KEYS[name]);
      if (value != null) window.localStorage.setItem(key, value);
    }
    return value;
  }

  function writeRaw(name, value) {
    var key = keyFor(name);
    if (!available) {
      memory[key] = String(value);
      return;
    }
    window.localStorage.setItem(key, String(value));
  }

  function getString(name, fallback) {
    var value = readRaw(name);
    return value == null ? fallback : value;
  }

  function setString(name, value) {
    writeRaw(name, value == null ? "" : String(value));
  }

  function getBoolean(name, fallback) {
    var value = readRaw(name);
    if (value == null) return !!fallback;
    return value === "1" || value === "true";
  }

  function setBoolean(name, value) {
    writeRaw(name, value ? "1" : "0");
  }

  function getJson(name, fallback) {
    var value = readRaw(name);
    if (value == null) return fallback;
    try {
      return JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  }

  function setJson(name, value) {
    writeRaw(name, JSON.stringify(value));
  }

  function listProjectStorageKeys() {
    return Object.keys(KEYS).map(function (name) { return KEYS[name]; });
  }

  function clearProjectStorage() {
    Object.keys(KEYS).forEach(function (name) {
      var key = KEYS[name];
      if (available) window.localStorage.removeItem(key);
      delete memory[key];
    });
    Object.keys(LEGACY_KEYS).forEach(function (name) {
      if (available) window.localStorage.removeItem(LEGACY_KEYS[name]);
    });
  }

  window.MWS_STORAGE = {
    getString: getString,
    setString: setString,
    getBoolean: getBoolean,
    setBoolean: setBoolean,
    getJson: getJson,
    setJson: setJson,
    clearProjectStorage: clearProjectStorage,
    listProjectStorageKeys: listProjectStorageKeys
  };
}());

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

class FakeClassList {
  constructor(initialClasses = []) {
    this.classes = new Set(initialClasses.filter(Boolean));
  }

  add(...classes) {
    classes.forEach((className) => this.classes.add(className));
  }

  remove(...classes) {
    classes.forEach((className) => this.classes.delete(className));
  }

  toggle(className, force) {
    if (force === true) {
      this.classes.add(className);
      return true;
    }

    if (force === false) {
      this.classes.delete(className);
      return false;
    }

    if (this.classes.has(className)) {
      this.classes.delete(className);
      return false;
    }

    this.classes.add(className);
    return true;
  }

  contains(className) {
    return this.classes.has(className);
  }

  toString() {
    return Array.from(this.classes).join(" ");
  }
}

class FakeElement {
  constructor({ id = "", classNames = [], dataset = {}, value = "" } = {}) {
    this.id = id;
    this.dataset = dataset;
    this.value = value;
    this.textContent = "";
    this.innerHTML = "";
    this.style = {};
    this.children = [];
    this.listeners = {};
    this.attributes = {};
    this.classList = new FakeClassList(classNames);
  }

  get className() {
    return this.classList.toString();
  }

  set className(value) {
    this.classList = new FakeClassList(value.split(/\s+/).filter(Boolean));
  }

  addEventListener(eventName, handler) {
    this.listeners[eventName] = handler;
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  getAttribute(name) {
    return this.attributes[name];
  }

  querySelector() {
    return null;
  }

  querySelectorAll() {
    return [];
  }

  cloneNode() {
    const clone = new FakeElement({
      id: this.id,
      classNames: Array.from(this.classList.classes),
      dataset: { ...this.dataset },
      value: this.value,
    });
    clone.textContent = this.textContent;
    clone.innerHTML = this.innerHTML;
    clone.attributes = { ...this.attributes };
    return clone;
  }

  replaceWith() {}

  reset() {
    this.value = "";
  }

  click() {
    const handler = this.listeners.click;
    if (handler) {
      handler({ target: this, preventDefault() {} });
    }
  }
}

class FakeDocument {
  constructor({ theme = null } = {}) {
    this.body = new FakeElement();
    this.domContentLoadedHandler = null;
    this.elementsById = {};
    this.queryMap = {};
    this.queryAllMap = {};

    this.registerElement(new FakeElement({ id: "activities-list" }));
    this.registerElement(new FakeElement({ id: "message", classNames: ["hidden"] }));
    this.registerElement(new FakeElement({ id: "registration-modal", classNames: ["hidden"] }));
    this.registerElement(new FakeElement({ id: "modal-activity-name" }));
    this.registerElement(new FakeElement({ id: "signup-form" }));
    this.registerElement(new FakeElement({ id: "activity" }));
    this.registerElement(new FakeElement({ id: "activity-search" }));
    this.registerElement(new FakeElement({ id: "search-button" }));
    this.registerElement(new FakeElement({ id: "login-button" }));
    this.registerElement(new FakeElement({ id: "user-info", classNames: ["hidden"] }));
    this.registerElement(new FakeElement({ id: "display-name" }));
    this.registerElement(new FakeElement({ id: "logout-button" }));
    this.registerElement(new FakeElement({ id: "login-modal", classNames: ["hidden"] }));
    this.registerElement(new FakeElement({ id: "login-form" }));
    this.registerElement(new FakeElement({ id: "login-message", classNames: ["hidden"] }));
    this.registerElement(new FakeElement({ id: "theme-toggle-button" }));
    this.registerElement(new FakeElement({ id: "theme-toggle-icon" }));
    this.registerElement(new FakeElement({ id: "theme-toggle-text" }));
    this.registerElement(new FakeElement({ id: "username" }));
    this.registerElement(new FakeElement({ id: "password" }));
    this.registerElement(new FakeElement({ id: "email" }));

    this.queryMap[".close-modal"] = new FakeElement({ classNames: ["close-modal"] });
    this.queryMap[".close-login-modal"] = new FakeElement({
      classNames: ["close-login-modal"],
    });

    const categoryButton = new FakeElement({
      classNames: ["category-filter", "active"],
      dataset: { category: "all" },
    });
    const dayButton = new FakeElement({
      classNames: ["day-filter", "active"],
      dataset: { day: "" },
    });
    const timeButton = new FakeElement({
      classNames: ["time-filter", "active"],
      dataset: { time: "" },
    });

    this.queryAllMap[".category-filter"] = [categoryButton];
    this.queryAllMap[".day-filter"] = [dayButton];
    this.queryAllMap[".time-filter"] = [timeButton];
    this.queryMap[".day-filter.active"] = dayButton;
    this.queryMap[".time-filter.active"] = timeButton;
    this.queryMap[".category-filter.active"] = categoryButton;

    this.theme = theme;
  }

  registerElement(element) {
    this.elementsById[element.id] = element;
    return element;
  }

  addEventListener(eventName, handler) {
    if (eventName === "DOMContentLoaded") {
      this.domContentLoadedHandler = handler;
    }
  }

  getElementById(id) {
    return this.elementsById[id] || null;
  }

  querySelector(selector) {
    return this.queryMap[selector] || null;
  }

  querySelectorAll(selector) {
    return this.queryAllMap[selector] || [];
  }

  createElement() {
    return new FakeElement();
  }
}

function createLocalStorage(initialTheme) {
  const storage = new Map();
  if (initialTheme !== null) {
    storage.set("theme", initialTheme);
  }

  return {
    getItem(key) {
      return storage.has(key) ? storage.get(key) : null;
    },
    setItem(key, value) {
      storage.set(key, String(value));
    },
    removeItem(key) {
      storage.delete(key);
    },
  };
}

async function loadApp(initialTheme = null) {
  const document = new FakeDocument();
  const localStorage = createLocalStorage(initialTheme);
  const window = {
    addEventListener() {},
  };

  const context = vm.createContext({
    document,
    window,
    localStorage,
    fetch: async () => ({
      ok: true,
      async json() {
        return {};
      },
    }),
    setTimeout: (callback) => {
      callback();
      return 0;
    },
    clearTimeout() {},
    console,
  });

  const appScript = fs.readFileSync(
    path.join(
      "/home/runner/work/skills-expand-your-team-with-copilot2/skills-expand-your-team-with-copilot2",
      "src/static/app.js"
    ),
    "utf8"
  );

  vm.runInContext(appScript, context);
  await document.domContentLoadedHandler();
  await Promise.resolve();
  await Promise.resolve();

  return {
    body: document.body,
    themeButton: document.getElementById("theme-toggle-button"),
    themeIcon: document.getElementById("theme-toggle-icon"),
    themeText: document.getElementById("theme-toggle-text"),
    localStorage,
  };
}

test("applies a saved dark theme preference on load", async () => {
  const { body, themeButton, themeIcon, themeText } = await loadApp("dark");

  assert.equal(body.classList.contains("dark-mode"), true);
  assert.equal(themeButton.getAttribute("aria-pressed"), "true");
  assert.equal(themeIcon.textContent, "☀️");
  assert.equal(themeText.textContent, "Light mode");
});

test("toggles the theme and saves the new preference", async () => {
  const { body, themeButton, themeText, localStorage } = await loadApp();

  themeButton.click();

  assert.equal(body.classList.contains("dark-mode"), true);
  assert.equal(themeButton.getAttribute("aria-pressed"), "true");
  assert.equal(themeText.textContent, "Light mode");
  assert.equal(localStorage.getItem("theme"), "dark");
});

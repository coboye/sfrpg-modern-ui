import assert from "node:assert/strict";
import test from "node:test";
import { Constants } from "../module/constants.js";
import {
    asElement,
    bindResetControls,
    readControlValue,
    Setting,
    Settings
} from "../module/settings.js";

class Control extends EventTarget {
    constructor(props = {}) {
        super();
        this.nodeType = 1;
        this.dataset = {};
        this.type = props.type || "text";
        this.name = props.name || "";
        this.value = props.value ?? "";
        this.checked = Boolean(props.checked);
        this.tag = props.tag || "input";
        this.action = props.action || null;
        this.parentNode = null;
    }
}

class Root extends EventTarget {
    constructor(children) {
        super();
        this.nodeType = 1;
        this.dataset = {};
        this.parentNode = null;
        this.children = children;
    }

    querySelector(selector) {
        return this.querySelectorAll(selector)[0] ?? null;
    }

    querySelectorAll(selector) {
        const parts = selector.split(",").map((part) => part.trim());
        return this.children.filter((child) => parts.some((part) => matches(child, part)));
    }
}

function matches(child, selector) {
    const named = selector.match(/^\[name="(.+)"\]$/);
    if (named) return child.name === named[1];
    if (selector === '[data-action="resetDefaults"]') return child.action === "resetDefaults";
    if (selector === 'button[name="reset"]') return child.tag === "button" && child.name === "reset";
    return false;
}

function form() {
    const theme = new Control({ name: `${Constants.MODULENAME}.theme`, value: "neon" });
    const alpha = new Control({ name: `${Constants.MODULENAME}.background_alpha`, type: "range", value: "40" });
    const compact = new Control({ name: `${Constants.MODULENAME}.compact_mode`, type: "checkbox" });
    const resetDefaults = new Control({ tag: "button", action: "resetDefaults" });
    const resetNamed = new Control({ tag: "button", name: "reset" });
    return {
        theme,
        alpha,
        compact,
        resetDefaults,
        resetNamed,
        root: new Root([theme, alpha, compact, resetDefaults, resetNamed])
    };
}

function watchedSettings() {
    const seen = [];
    const settings = new Settings();
    const record = (key) => (value) => seen.push([key, value]);
    settings.properties.push(new Setting(Constants.Settings.theme, { callback: record("theme") }));
    settings.properties.push(new Setting(Constants.Settings.background_alpha, { callback: record("alpha") }));
    settings.properties.push(new Setting(Constants.Settings.compact_mode, { callback: record("compact") }));
    return { settings, seen };
}

test("reads checkbox and range values", () => {
    assert.equal(readControlValue({ type: "checkbox", checked: true }), true);
    assert.equal(readControlValue({ type: "range", value: "70" }), "70");
    assert.equal(readControlValue(null), null);
});

test("binds an HTMLElement settings form once", () => {
    const { root, theme, alpha, compact } = form();
    const { settings, seen } = watchedSettings();
    assert.equal(asElement(root), root);

    settings.watch(root);
    settings.watch(root);

    theme.value = "terminal";
    theme.dispatchEvent(new Event("input"));
    alpha.value = "70";
    alpha.dispatchEvent(new Event("change"));
    compact.checked = true;
    compact.dispatchEvent(new Event("change"));

    assert.deepEqual(seen, [
        ["theme", "terminal"],
        ["alpha", "70"],
        ["compact", true]
    ]);
});

test("binds a jQuery-like settings form", () => {
    const { root, theme } = form();
    const { settings, seen } = watchedSettings();
    const wrapped = {
        0: root,
        length: 1,
        get(index) { return this[index]; }
    };
    assert.equal(asElement(wrapped), root);

    settings.watch(wrapped);
    theme.value = "velstrac";
    theme.dispatchEvent(new Event("change"));
    assert.deepEqual(seen, [["theme", "velstrac"]]);
});

test("reset listens to both settings buttons once", () => {
    const { root, resetDefaults, resetNamed } = form();
    let resets = 0;
    bindResetControls(root, () => { resets += 1; });
    bindResetControls(root, () => { resets += 1; });
    resetDefaults.dispatchEvent(new Event("click"));
    resetNamed.dispatchEvent(new Event("click"));
    assert.equal(resets, 2);
});

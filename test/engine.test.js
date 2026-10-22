import assert from "node:assert/strict";
import test from "node:test";
import { Constants } from "../module/constants.js";

test("compact mode toggles sfmod-compact", async () => {
    const classes = new Set();
    const links = [];
    globalThis.document = {
        body: {
            classList: {
                add: (name) => classes.add(name),
                remove: (name) => classes.delete(name)
            }
        },
        documentElement: { style: { setProperty() {} } },
        head: {
            querySelector() {
                return links[0] ?? null;
            },
            querySelectorAll() {
                return links.filter((link) => link.dataset?.sfmod);
            },
            appendChild(node) {
                links.push(node);
                return node;
            }
        },
        createElement() {
            return {
                disabled: false,
                dataset: {},
                setAttribute(key, value) {
                    if (key === "title") this.title = value;
                    if (key === "data-sfmod") this.dataset.sfmod = value;
                }
            };
        }
    };
    globalThis.game = { modules: { values: () => [] } };

    const { UIEngine } = await import("../module/engine.js");
    const { SettingsProvider } = await import("../module/settings.js");
    const values = {
        [Constants.Settings.theme]: "core",
        [Constants.Settings.compact_mode]: true,
        [Constants.Settings.transparent_chat]: false,
        [Constants.Settings.sidebar_tab_glow]: false
    };
    SettingsProvider.settings = { value: (key) => values[key] };

    UIEngine.apply();
    assert.equal(classes.has("sfmod-compact"), true);
    assert.equal(classes.has("sfmod-transparent-chat"), false);
    assert.equal(classes.has("sfmod-sidebar-glow"), false);

    values[Constants.Settings.compact_mode] = false;
    values[Constants.Settings.transparent_chat] = true;
    values[Constants.Settings.sidebar_tab_glow] = true;
    UIEngine.apply();
    assert.equal(classes.has("sfmod-compact"), false);
    assert.equal(classes.has("sfmod-transparent-chat"), true);
    assert.equal(classes.has("sfmod-sidebar-glow"), true);
});

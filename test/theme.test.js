import assert from "node:assert/strict";
import test from "node:test";
import { Themes } from "../themes/index.js";

function settingsFor(overrides = {}) {
    const values = {
        theme: "core",
        compact_mode: true,
        background_alpha: 40,
        blur_radius: 10,
        colors_saturation: 0,
        colors_value: 0,
        colors_hue: 0,
        colors_lightness: 0,
        chat_font_size: 12,
        ...overrides
    };
    return { value: (key) => values[key] };
}

test("each theme exposes a name and a CSS variable map", () => {
    for (const [key, ThemeClass] of Object.entries(Themes)) {
        const theme = new ThemeClass();
        if (key === "core") {
            assert.equal(theme.core, true);
            continue;
        }
        assert.equal(typeof theme.toString(), "string");
        assert.ok(theme.toString().length > 0, key);
        theme.apply(settingsFor({ compact_mode: true }));
        const primary = theme.properties["color-primary"];
        assert.equal(typeof primary, "string");
        assert.match(primary, /#|rgb|hsl/i);
    }
});

test("hue reports the hue shift and chat font size does not recolor the theme", () => {
    const hueTheme = new Themes.starfinder();
    const beforeHue = hueTheme.colorPrimary.toString();
    hueTheme.hue = 40;
    assert.equal(hueTheme.hue, 40);
    assert.notEqual(hueTheme.colorPrimary.toString(), beforeHue);

    const fontTheme = new Themes.starfinder();
    const beforeFont = fontTheme.colorPrimary.toString();
    fontTheme.chatFontSize = 16;
    assert.equal(fontTheme.chatFontSize, "16px");
    assert.equal(fontTheme.properties["chat-font-size"], "16px");
    assert.equal(fontTheme.colorPrimary.toString(), beforeFont);
});

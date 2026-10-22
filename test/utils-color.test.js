import assert from "node:assert/strict";
import test from "node:test";
import { Color } from "../module/colors.js";
import { Utils } from "../module/utils.js";

test("camel and dash conversion", () => {
    assert.equal(Utils.camelToDash("colorPrimary"), "color-primary");
    assert.equal(Utils.dashToCamel("color_primary"), "colorPrimary");
});

test("parses hex and rgb colors", () => {
    const hex = new Color("#ff0000");
    const rgb = new Color("rgb(255, 0, 0)");
    assert.equal(hex.getHue(), rgb.getHue());
    assert.match(hex.toString(), /ff0000|255,\s*0,\s*0/i);
});

test("shifts hue and changes saturation", () => {
    const original = new Color("#ff0000");
    const shifted = original.shiftHue(120);
    assert.notEqual(shifted.getHue(), original.getHue());

    const muted = new Color("#aa6666");
    const richer = muted.saturateByRatio(0.5);
    assert.notEqual(richer.getSaturation(), muted.getSaturation());
});

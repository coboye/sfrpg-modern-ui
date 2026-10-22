import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const main = fs.readFileSync(path.join(root, "css", "main.css"), "utf8");

test("core theme keeps v13 selectors and adds v14 selectors", () => {
    assert.match(main, /\.window-app/);
    assert.match(main, /\.application/);
    assert.match(main, /#navigation/);
    assert.match(main, /#scene-navigation/);
    assert.match(main, /#controls \.control-tool/);
    assert.match(main, /#scene-controls/);
    assert.match(main, /\.main-controls/);
    assert.match(main, /\.sub-controls/);
    assert.match(main, /#sidebar-tabs/);
    assert.match(main, /#sidebar nav\.tabs/);
    assert.match(main, /#chat-log/);
    assert.match(main, /#chat \.chat-message/);
    assert.match(main, /\.chat-log \.chat-message/);
    assert.match(main, /select\[name="messageMode"\]/);
    assert.match(main, /\.message-mode/);
    assert.match(main, /\.sfmod-transparent-chat\.system-sfrpg \.chat-message:not\(\.sfrpg\.chat-card\)/);
    assert.match(main, /\.sfmod-sidebar-glow\.system-sfrpg #sidebar-tabs/);
    assert.match(main, /\.sfmod-sidebar-glow\.system-sfrpg #sidebar nav\.tabs/);
    assert.doesNotMatch(main, /^\.system-sfrpg\.system-sfrpg \.chat-message:not\(\.sfrpg\.chat-card\) \{\s*background:\s*none/m);
});

test("mod window rules pair window-app with application", () => {
    const mods = path.join(root, "css", "mods");
    for (const file of ["forien-quest-log.css", "foundryvtt-simple-calendar.css", "one-journal.css", "tidy-ui_game-settings.css"]) {
        const css = fs.readFileSync(path.join(mods, file), "utf8");
        assert.match(css, /\.window-app/, file);
        assert.match(css, /\.application/, file);
    }
});

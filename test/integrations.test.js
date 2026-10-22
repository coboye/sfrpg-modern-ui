import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { Integrations } from "../themes/index.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const modsDir = path.join(root, "css", "mods");

test("every integration has a stylesheet and every stylesheet is listed", () => {
    const files = fs.readdirSync(modsDir).filter((file) => file.endsWith(".css")).sort();
    const listed = Integrations.map((id) => `${id}.css`).sort();
    assert.deepEqual(files, listed);
    for (const id of Integrations) {
        assert.equal(fs.existsSync(path.join(modsDir, `${id}.css`)), true, id);
    }
});

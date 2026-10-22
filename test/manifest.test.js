import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const manifest = JSON.parse(readFileSync(new URL("../module.json", import.meta.url), "utf8"));
const root = new URL("../", import.meta.url);

function stylePath(entry) {
    return typeof entry === "string" ? entry : entry.src;
}

test("manifest targets Foundry 13 and 14", () => {
    assert.equal(manifest.version, "1.9.0");
    assert.equal(manifest.compatibility.minimum, "13");
    assert.equal(manifest.compatibility.verified, "14");
});

test("manifest URLs stay on the coboye repository", () => {
    for (const key of ["bugs", "url", "manifest", "download", "readme", "changelog"]) {
        assert.match(manifest[key], /^https:\/\/(raw\.githubusercontent|github)\.com\/coboye\/sfrpg-modern-ui/);
    }
    assert.equal(
        manifest.download,
        `https://github.com/coboye/sfrpg-modern-ui/releases/download/release/${manifest.version}/sfrpg-modern-ui.zip`
    );
});

test("manifest files exist", () => {
    const paths = [
        ...manifest.styles.map(stylePath),
        ...manifest.esmodules,
        ...manifest.languages.map((language) => language.path)
    ];
    for (const path of paths) {
        assert.equal(existsSync(new URL(path, root)), true, path);
    }
});

test("base stylesheet opts out of the modules layer", () => {
    assert.deepEqual(manifest.styles, [{ src: "sfrpg-modern-ui.css", layer: null }]);
});

import { Constants } from "./constants.js";
import { Logger } from "./logger.js";
import { UIEngine } from "./engine.js";
import { Themes } from "../themes/index.js";
import { Utils } from "./utils.js";

const RESET_SELECTOR = '[data-action="resetDefaults"], button[name="reset"]';
let removalObserver = null;

/**
 * Accept either an ApplicationV2 HTMLElement or a jQuery object from older hooks.
 * @param {HTMLElement | { get?: Function, 0?: HTMLElement } | null} html
 * @returns {HTMLElement | null}
 */
export function asElement(html) {
    if (!html) return null;
    if (typeof HTMLElement !== "undefined" && html instanceof HTMLElement) return html;
    if (html.nodeType === 1) return html;
    if (typeof html.get === "function") {
        const node = html.get(0);
        if (node && node.nodeType === 1) return node;
    }
    if (html[0] && html[0].nodeType === 1) return html[0];
    return null;
}

/**
 * @param {HTMLInputElement | null} target
 * @returns {string | boolean | null}
 */
export function readControlValue(target) {
    if (!target) return null;
    if (target.type === "checkbox") return Boolean(target.checked);
    return target.value;
}

/**
 * @param {HTMLElement} element
 * @param {(value: string | boolean | null) => void} onValue
 */
export function bindControl(element, onValue) {
    if (!element || element.dataset?.sfmodBound === "1") return;
    if (element.dataset) element.dataset.sfmodBound = "1";
    const handler = (evt) => onValue(readControlValue(evt.target));
    element.addEventListener("change", handler);
    element.addEventListener("input", handler);
}

/**
 * @param {ParentNode} root
 * @param {() => void} onReset
 */
export function bindResetControls(root, onReset) {
    if (!root?.querySelectorAll) return;
    root.querySelectorAll(RESET_SELECTOR).forEach((button) => {
        if (button.dataset?.sfmodReset === "1") return;
        if (button.dataset) button.dataset.sfmodReset = "1";
        button.addEventListener("click", () => onReset());
    });
}

/**
 * Backup for when the settings app is removed without closeSettingsConfig.
 * Skips the callback if a replacement #client-settings is already in the document.
 * @param {HTMLElement} root
 * @param {() => void} onRemove
 */
export function observeSettingsRemoval(root, onRemove) {
    if (typeof MutationObserver === "undefined" || !root?.parentNode) return;
    if (removalObserver) removalObserver.disconnect();
    removalObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== "childList") continue;
            const removed = Array.from(mutation.removedNodes);
            const gone = removed.some((node) => node === root || node.id === "client-settings" || node.contains?.(root));
            if (!gone) continue;
            const current = typeof document !== "undefined" && document.getElementById
                ? document.getElementById("client-settings")
                : null;
            removalObserver.disconnect();
            removalObserver = null;
            if (current && current !== root) return;
            onRemove();
            return;
        }
    });
    removalObserver.observe(root.parentNode, { childList: true, subtree: true });
}

export class SettingRange {
    min = 0;
    max = 100;
    step = 1;

    constructor(min, max, step) {
        this.min = min;
        this.max = max;
        this.step = step;
    }
}
export const SettingScope = Object.freeze({
    CLIENT: "client",
    GLOBAL: "global"
})
export class Setting {
    key = "setting";
    value;
    scope = SettingScope.GLOBAL;
    default = "";
    showHint = true;
    type = String;
    choices = null;
    config = true;
    /**
     * @type {SettingRange}
     */
    range = null;
    /**
     * @type {Function}
     */
    callback = () => { UIEngine.apply() };

    register() {
        Logger.debug("Setting:register", this.key);
        let setting = {
            name: Utils.localize(`settings.${this.key}.label`),
            hint: this.showHint ? Utils.localize(`settings.${this.key}.hint`) : null,
            scope: this.scope,
            type: this.type,
            default: this.default,
            config: this.config,
            onChange: this.changed.bind(this)
        }
        if (this.type == Number) {
            // If range is specified, the resulting setting will be a range slider
            if (this.range != null) {
                setting.range = {
                    min: this.range.min,
                    max: this.range.max,
                    step: this.range.step
                }
            }
        }
        if (this.choices != null) {
            setting.choices = this.choices;
        }
        game.settings.register(Constants.MODULENAME, this.key, setting);
        this.value = game.settings.get(Constants.MODULENAME, this.key);

    }
    get tagname() {
        return this.choices != null ? "select" : "input";
    }
    reset() {
        this.value = game.settings.get(Constants.MODULENAME, this.key);
    }
    changed(value) {
        Logger.debug("Setting:changed", this.key, value);
        this.value = value;
        this.callback(value);
    }
    updated(value) {
        Logger.debug("Setting:updated", this.key, value);
        this.value = value;
        this.callback(value);
    }
    /**
     * @param {ParentNode} root
     */
    watch(root) {
        Logger.debug("Setting:watch", this.key);
        const element = root?.querySelector?.(`[name="${Constants.MODULENAME}.${this.key}"]`);
        if (!element) return;
        bindControl(element, (value) => this.updated(value));
    }

    constructor(key, properties) {
        Object.assign(this, { ...properties });
        this.key = key;
    }
}
export class Settings {
    /**
     * @type {Array<Setting>}
     */
    properties = [];

    /**
     * 
     * @param {Arrayy<Setting>} properties 
     */
    constructor(properties) {
        this.properties = this.properties || [];
    }

    register() {
        this.properties.forEach(p => p.register());
    }

    /**
     * @param {HTMLElement | { get?: Function, 0?: HTMLElement }} html
     */
    watch(html) {
        const root = asElement(html) ?? (typeof document !== "undefined" && document.getElementById
            ? document.getElementById("client-settings")
            : null);
        if (!root) return;
        this.properties.forEach(p => p.watch(root));
        bindResetControls(root, () => this.reset());
        observeSettingsRemoval(root, () => this.reset());
    }

    reset() {
        this.properties.forEach(p => p.reset());
        UIEngine.apply();
    }

    value(key) {
        const property = this.properties.find(p => {
            return p.key == key;
        });
        return (property || {}).value;
    }
}

export const SettingsProvider = {

    settings: new Settings(),

    watch: (html) => {
        SettingsProvider.settings.watch(html);
    },

    reset: () => {
        SettingsProvider.settings.reset();
    },

    initialize: () => {
        // Register any custom module settings here   
        let themes = Object.keys(Themes).reduce((map, key) => {
            map[key] = game.i18n.localize(Constants.MODULENAME + ".theme." + key) || key;
            return map;
        }, {});

        SettingsProvider.settings.properties.push(
            new Setting(Constants.Settings.theme, {
                scope: SettingScope.CLIENT,
                type: String,
                choices: themes,
                default: new Themes.starfinder().toString()
            })
        );
        SettingsProvider.settings.properties.push(
            new Setting(Constants.Settings.background_alpha, {
                scope: SettingScope.CLIENT,
                type: Number,
                range: new SettingRange(0, 100, 10),
                default: 40
            })
        );
        SettingsProvider.settings.properties.push(
            new Setting(Constants.Settings.blur_radius, {
                scope: SettingScope.CLIENT,
                type: Number,
                range: new SettingRange(0, 50, 1),
                default: 10
            })
        );
        SettingsProvider.settings.properties.push(
            new Setting(Constants.Settings.colors_saturation, {
                scope: SettingScope.CLIENT,
                type: Number,
                range: new SettingRange(-100, 100, 1),
                default: 0,
                showHint: false
            })
        );
        SettingsProvider.settings.properties.push(
            new Setting(Constants.Settings.colors_value, {
                scope: SettingScope.CLIENT,
                type: Number,
                range: new SettingRange(-100, 100, 1),
                default: 0,
                showHint: false
            })
        );
        SettingsProvider.settings.properties.push(
            new Setting(Constants.Settings.colors_lightness, {
                scope: SettingScope.CLIENT,
                type: Number,
                range: new SettingRange(-100, 100, 1),
                default: 0,
                showHint: false
            })
        );
        SettingsProvider.settings.properties.push(
            new Setting(Constants.Settings.colors_hue, {
                scope: SettingScope.CLIENT,
                type: Number,
                range: new SettingRange(-360, 360, 1),
                default: 0,
                showHint: false
            })
        );

        SettingsProvider.settings.properties.push(
            new Setting(Constants.Settings.chat_font_size, {
                scope: SettingScope.CLIENT,
                type: Number,
                range: new SettingRange(8, 18, 1),
                default: 12,
                showHint: false
            })
        );

        SettingsProvider.settings.properties.push(
            new Setting(Constants.Settings.compact_mode, {
                scope: SettingScope.CLIENT,
                type: Boolean,
                default: true,
                showHint: false
            })
        );
        SettingsProvider.settings.properties.push(
            new Setting(Constants.Settings.transparent_chat, {
                scope: SettingScope.CLIENT,
                type: Boolean,
                default: false
            })
        );
        SettingsProvider.settings.properties.push(
            new Setting(Constants.Settings.sidebar_tab_glow, {
                scope: SettingScope.CLIENT,
                type: Boolean,
                default: false
            })
        );


        SettingsProvider.settings.register();

    }
};

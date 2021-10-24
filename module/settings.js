import { Constants } from "./constants.js";
import { Logger } from "./logger.js";
import { UIEngine } from "./engine.js";
import { Themes } from "../themes/index.js";
import { Utils } from "./utils.js";

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
    get element() {
        return $(`[name="${Constants.MODULENAME}.${this.key}"]`);
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
    watch() {
        Logger.debug("Setting:watch", this.key);

        this.element.on("change", (evt) => { this.updated(this.eventValue(evt)) });
        this.element.on("input", (evt) => { this.updated(this.eventValue(evt), evt) });
        if (this.element.is(":checkbox")) {
            this.element.parent().prev().click(() => this.updated(this.eventValue({ target: this.element })));
        }
        this.element.on("checked", (evt) => { this.updated(this.eventValue(evt), evt) });
    }
    eventValue(evt) {
        let val = null;
        const target = $(evt.target);
        if (target.is(':checkbox')) {
            val = target.is(':checked');
        } else {
            val = target.val();
        }
        return val;
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

    watch() {
        this.properties.forEach(p => p.watch());

        // Create an observer instance linked to the callback function
        const observer = new MutationObserver((mutations, observer) => {
            mutations.forEach((mutation) => {
                if (mutation.type == 'childList' && mutation.removedNodes) {
                    if (Array.from(mutation.removedNodes).some(node => node.id == 'client-settings')) {
                        observer.disconnect();
                        this.reset();
                    }
                }
            });
        });
        // Start observing the target node for configured mutations
        observer.observe($("#client-settings").get(0).parentNode, { attributes: false, childList: true, subtree: true });

        $('#client-settings button[name="reset"]').on("click", () => this.reset());
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

    watch: () => {
        SettingsProvider.settings.watch();
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


        SettingsProvider.settings.register();

    }
};

import { Color } from "../module/colors.js";
import { Constants } from "../module/constants.js";
import { Logger } from "../module/logger.js";
import { Settings } from "../module/settings.js";
import { Utils } from "../module/utils.js";

/**
 * Abstract Class Theme.
 *
 * @class Theme
 */
export default class AbstractTheme {

    __name = null;

    compactMode = true;

    __backgroundAlpha = .40;
    __blurRadius = "10px";
    __colorsSaturation = 0;
    __colorsValue = 0;
    __colorsHue = 0;
    __colorsLightness = 0;

    __chatFontSize = "12px";

    colorPrimary = new Color();
    colorPrimaryVariant = new Color();
    colorPrimaryLight = new Color();
    colorPrimaryGradient = [new Color(), new Color(), new Color(), new Color()];
    colorSecondary = new Color();
    colorSecondaryLight = new Color();
    colorSecondaryGradient = [new Color(), new Color(), new Color(), new Color()];

    colorSelection = new Color();
    colorError = new Color("#C52611");

    colorSurface = new Color();
    colorBackground = new Color();

    textOnBackground = new Color();
    textOnBackgroundLight = new Color();
    textOnSurface = new Color();
    textOnPrimary = new Color();
    textOnSecondary = new Color();
    textOnError = new Color();
    textOnSelection = new Color();

    borderOnBackground = new Color();
    borderOnBackgroundLight = new Color();

    constructor(name) {
        /* if (this.constructor == AbstractTheme) {
            throw new Error("Theme Abstract classes can't be instantiated.");
        } */
        this.__name = name || null;
    }


    /**
     * 
     * @param {Settings} settings 
     */
    apply(settings) {
        this.compactMode = settings.value(Constants.Settings.compact_mode);
        if (!this.core) {
            this.__backgroundAlpha = (settings.value(Constants.Settings.background_alpha) / 100).toFixed(2);
            this.__blurRadius = settings.value(Constants.Settings.blur_radius) + "px";
            this.__chatFontSize = settings.value(Constants.Settings.chat_font_size) + "px";

            this.saturation = settings.value(Constants.Settings.colors_saturation);
            this.value = settings.value(Constants.Settings.colors_value);
            this.hue = settings.value(Constants.Settings.colors_hue);
            this.lightness = settings.value(Constants.Settings.colors_lightness);
        }
        return this;
    }

    get saturation() { return this.__colorsSaturation; }
    set saturation(value) {
        this.__colorsSaturation = (Math.min(100, Math.max(-100, parseInt(value))) / 100);
        if (this.__colorsSaturation != 0) {
            Object.keys(this).forEach(key => {
                let color = this[key];
                if (!!color && !!color.saturateByRatio) {
                    this[key] = color.saturateByRatio(this.__colorsSaturation);
                }
            })
        }
        Logger.debug("saturation", this.colorPrimary.getSaturation(), this.colorPrimary.toString());
    }

    get value() { return this.__colorsValue; }
    set value(value) {
        this.__colorsValue = (Math.min(100, Math.max(-100, parseInt(value))) / 100);
        if (this.__colorsValue != 0) {
            Object.keys(this).forEach(key => {
                let color = this[key];
                if (!!color && !!color.valueByRatio) {
                    this[key] = color.valueByRatio(this.__colorsValue);
                }
            })
        }
        Logger.debug("value", this.colorPrimary.getValue(), this.colorPrimary.toString());
    }

    get lightness() { return this.__colorsLightness; }
    set lightness(value) {
        this.__colorsLightness = (Math.min(100, Math.max(-100, parseInt(value))) / 100);
        if (this.__colorsLightness != 0) {
            Object.keys(this).forEach(key => {
                let color = this[key];
                if (!!color && !!color.lightenByRatio) {
                    this[key] = color.lightenByRatio(this.__colorsLightness);
                }
            })
        }
        Logger.debug("lightness", this.colorPrimary.getLightness(), this.colorPrimary.toString());
    }

    get hue() { return this.__colorsValue; }
    set hue(value) {
        this.__colorsHue = Math.min(360, Math.max(-360, parseInt(value)));
        if (this.__colorsHue != 0) {
            Object.keys(this).forEach(key => {
                let color = this[key];
                if (!!color && !!color.shiftHue) {
                    this[key] = color.shiftHue(this.__colorsHue);
                }
            })
        }
        Logger.debug("hue", this.colorPrimary.getHue(), this.colorPrimary.toString());
    }
    get chatFontSize() { return this.__chatFontSize + "px"; }
    set chatFontSize(value) {
        this.__colorsHue = Math.min(360, Math.max(-360, parseInt(value)));
        if (this.__colorsHue != 0) {
            Object.keys(this).forEach(key => {
                let color = this[key];
                if (!!color && !!color.shiftHue) {
                    this[key] = color.shiftHue(this.__colorsHue);
                }
            })
        }
        Logger.debug("hue", this.colorPrimary.getHue(), this.colorPrimary.toString());
    }

    get core() { return this.__name == null };

    set backgroundAlpha(value) {
        Logger.debug("ThemeConfiguration.backgroundAlpha", value);
        value = parseFloat(value);
        if (!isNaN(value)) {
            if (value > 1.0) {
                value = value / 100;
            }
            this.__backgroundAlpha = value.toFixed(2);
        }
    }

    set blurRadius(value) {
        Logger.debug("ThemeConfiguration.blurRadius", value);
        value = parseInt(value);
        if (!isNaN(value)) {
            this.__blurRadius = value + "px";
        }
    }
    set chatFontSize(value) {
        Logger.debug("ThemeConfiguration.chatFontSize", value);
        value = parseInt(value);
        if (!isNaN(value)) {
            this.__chatFontSize = value + "px";
        }
    }

    get colorSurfaceWbr() {
        return this.colorSurface.setAlpha(this.__backgroundAlpha);
    }

    get properties() {
        const toCSS = (obj) => {
            return obj && obj.toString && obj.toString();
        }
        let props = {
            "theme-name": this.__name, ...Object.keys(this).reduce((map, key) => {
                let dashed = Utils.camelToDash(key);
                map[dashed.replace(/^_/, '')] = toCSS(this[key]);
                return map;
            }, {})
        };

        props["color-surface-wbr"] = this.colorSurfaceWbr.toString();
        props["blur-radius"] = this.__blurRadius;
        props["chat-font-size"] = this.__chatFontSize;
        props["background-alpha"] = this.__backgroundAlpha;
        props["--sfmod-hue-shift"] = this.__colorsHue + 'deg';

        return props;
    }

    toString() {
        return this.__name;
    }
}
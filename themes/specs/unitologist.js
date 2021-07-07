import { Color, ColorStep, LinearGradient } from "../../module/colors.js";
import AbstractTheme from "../theme.js";

export default class extends AbstractTheme {

    constructor() {
        super("unitologist");

        this.colorPrimary = new Color("#D91828");
        this.colorPrimaryLight = new Color("#f84655");
        this.colorPrimaryVariant = new Color("#110617");
        this.colorPrimaryGradient = new LinearGradient("25deg", [new ColorStep("#110617", "0%"), new ColorStep("#D91828", "40%"), new ColorStep("#f84655", "60%"), new ColorStep("#110617", "100%")]);

        this.colorSecondary = new Color("#8003fd");
        this.colorSecondaryLight = new Color("#b46bfd");
        this.colorSecondaryGradient = new LinearGradient("25deg", [new ColorStep("#180B26", "0%"), new ColorStep("#531B8C", "40%"), new ColorStep("#643594", "60%"), new ColorStep("#180B26", "100%")]);

        this.colorSelection = new Color("#D91828");
        this.colorError = new Color("#C52611");

        this.colorSurface = new Color("#0D0101");
        this.colorBackground = new Color("#0e0101");

        this.textOnBackground = new Color("#cfcfcf");
        this.textOnPrimary = new Color("#ffffff");
        this.textOnSecondary = new Color("#ffffff");
        this.textOnBackgroundLight = new Color("#eaeaea");
        this.textOnError = new Color("#ffffff");
        this.textOnSurface = new Color("#e7d5f8");
        this.textOnSelection = new Color("#ffffff");

        this.borderOnBackground = new Color("#5a1228");
        this.borderOnBackgroundLight = new Color("#771a37");
    }

}

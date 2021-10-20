import { Color, ColorStep, LinearGradient } from "../../module/colors.js";
import AbstractTheme from "../theme.js";

export default class extends AbstractTheme {

    constructor() {
        super("starfinder");

        this.colorPrimary = new Color("#bf2351");
        this.colorPrimaryLight = new Color("#c16883");
        this.colorPrimaryVariant = new Color("#6615ea");
        this.colorPrimaryGradient = new LinearGradient("25deg", [new ColorStep("#6615EA", "0%"), new ColorStep("#271026", "40%"), new ColorStep("#561552", "60%"), new ColorStep("#6615EA", "100%")]);

        this.colorSecondary = new Color("#107565");
        this.colorSecondaryLight = new Color("#00dab5");
        this.colorSecondaryGradient = new LinearGradient("25deg", [new ColorStep("#000000", "0%"), new ColorStep("#13463e", "40%"), new ColorStep("#2c9986", "60%"), new ColorStep("#0e2f2a", "100%")]);

        this.colorSelection = new Color("#c61b71");
        this.colorError = new Color("#C52611");

        this.colorSurface = new Color("#150000");
        this.colorBackground = new Color("#081916");

        this.textOnBackground = new Color("#ddfaff");
        this.textOnPrimary = new Color("#ffffff");
        this.textOnSecondary = new Color("#ffffff");
        this.textOnBackgroundLight = new Color("#eaeaea");
        this.textOnError = new Color("#ffffff");
        this.textOnSurface = new Color("#869096");
        this.textOnSelection = new Color("#ffffff");

        this.borderOnBackground = new Color("#4d615d");
        this.borderOnBackgroundLight = new Color("#822e58");
    }

}

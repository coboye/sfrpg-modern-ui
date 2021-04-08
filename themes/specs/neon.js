import { Color } from "../../module/colors.js";
import AbstractTheme from "../theme.js";

export default class extends AbstractTheme{

    constructor(){
        super("neon");        

        this.colorPrimary = new Color("#aa45cf");
        this.colorPrimaryLight = new Color("#aa45cf");
        this.colorPrimaryVariant = new Color("#aa45cf");
        this.colorPrimaryGradient = new Color("#aa45cf");//--sfmod-color-primary-gradient: linear-gradient(25deg, #1d4e8c 0%, #45afeb 40%, #2b6abb 60%, #1d4e8c 100%);
        this.colorSecondary = new Color("#03b5be");
        this.colorSecondaryLight = new Color("#03b5be");
        this.colorSecondaryGradient = new Color("#03b5be"); //--sfmod-color-primary-gradient: linear-gradient(25deg, #1d4e8c 0%, #45afeb 40%, #2b6abb 60%, #1d4e8c 100%);

        this.colorSelection = new Color("#5fc4ffcc");
        this.colorError = new Color("#C52611");

        this.colorSurface = new Color("#121212");
        this.colorBackground = new Color("#121212");

        this.colorTextOnBackground = new Color("#ffffff");
        this.colorTextOnPrimary = new Color("#ffffff");
        this.colorTextOnSecondary = new Color("#ffffff");
        this.colorTextOnBackgroundLight = new Color("#eaeaea");
        this.colorTextOnError = new Color("#ffffff");
        this.colorTextOnSurface = new Color("#869096");
        this.colorTextOnSelection = new Color("#ffffff");
        
        this.colorBorderOnBackground = new Color("#475258");
        this.colorBorderOnBackgroundLight = new Color("#7a7971");
    }
    
}

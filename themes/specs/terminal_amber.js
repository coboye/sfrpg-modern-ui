import { Color } from "../../module/colors.js";
import AbstractTheme from "../theme.js";

export default class extends AbstractTheme{

    constructor(){
        super("terminal_amber");        

        this.colorPrimary = new Color("#45afeb");
        this.colorPrimaryLight = new Color("#5fc4ff");
        this.colorPrimaryVariant = new Color("#1d4e8c");
        this.colorPrimaryGradient = new Color("#1d4e8c");//--sfmod-color-primary-gradient: linear-gradient(25deg, #1d4e8c 0%, #45afeb 40%, #2b6abb 60%, #1d4e8c 100%);
        this.colorSecondary = new Color("#f49045");
        this.colorSecondaryLight = new Color("#efa26b");
        this.colorSecondaryGradient = new Color("#f49045"); //--sfmod-color-primary-gradient: linear-gradient(25deg, #1d4e8c 0%, #45afeb 40%, #2b6abb 60%, #1d4e8c 100%);

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

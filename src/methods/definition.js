import {
  cpAbout,
  cpText,
  cpSwitch,
  cpString,
  cpDropDownString,
  cpColorPicker,
  cpNumber
} from "./util";

var chooseOptionsDim = [
  //   {
  //     value: "cName",
  //     label: "Country name",
  //   },
  {
    value: "alpha2",
    label: "Alpha-2 code",
  },
  {
    value: "alpha3",
    label: "Alpha-3 code",
  },
  //   {
  //     value: "nCode",
  //     label: "Numeric code",
  //   },
  {
    value: "continents",
    label: "Continents",
  }
];

var chooseOptionsWorld = [
  //     {
  //     value: "points",
  //     label: "Points Layer"
  // },
  {
    value: "choropleth",
    label: "Choropleth",
  },
  // {
  //     value: "hollow",
  //     label: "Hollow"
  // }
];

var chooseOptionsBackground = [
  {
    value: "nightSky",
    label: "Night sky",
  },
  {
    value: "black",
    label: "Black",
  },
  {
    value: "customBG",
    label: "Custom BG",
  },
];

var chooseOptionsTexture = [
  {
    value: "earthDay",
    label: "Earth day",
  },
  {
    value: "earthDay2",
    label: "Earth day2",
  },
  {
    value: "earthNight",
    label: "Earth night",
  },
  {
    value: "earthBlueMarble",
    label: "Earth blue marble",
  },
  {
    value: "earthDark",
    label: "Earth dark",
  },
  {
    value: "customTexture",
    label: "Custom Texture",
  },
];

var chooseOptionsChoroType = [
  {
    value: "countries",
    label: "Countries",
  },
  {
    value: "continents",
    label: "Continents",
  },
];

var chooseColorationType = [
  {
    value: "standard",
    label: "Standard",
  },
  {
    value: "if",
    label: "If",
  },
  {
    value: "gradient",
    label: "Gradient"
  }
];

export default {
  type: "items",
  component: "accordion",
  items: {
    dimensions: {
      uses: "dimensions",
      min: 1,
      max: 1,
      items: {
        type: cpDropDownString("qDef.type","Dimension type", chooseOptionsDim, "cName"),

        // Color by if
				color: cpString("qAttributeExpressions.0.qExpression", "Color by if", "", "optional", "string", "expression"),
      },
    },
    measures: {
      uses: "measures",
      min: 1,
      max: 4,
      items: {	
				// Navigation
				navSheet: cpString("qAttributeExpressions.0.qExpression", "Sheet Navigation", "", "always", "string", "expression"),
				navSel: cpString("qAttributeExpressions.1.qExpression", "Value to select(Field;value|Field;value:value:..)", "", "always", "string", "expression"),
				navClear: cpString("qAttributeExpressions.2.qExpression", "Value to clear(Field|Field)", "", "always", "string", "expression"),
      }
    },
    // settings: {
    // 	uses: "settings",

    // },
    firstOptions: {
      type: "items",
      label: "Start",
      items: {
        // settings
        worldType: cpDropDownString( "globegl.worldType", "World type", chooseOptionsWorld, "points" ),

        background: cpSwitch( "globegl.background", "Background", "Yes", "No", true),
        backgroundChoose: cpDropDownString( "globegl.backgroundChoose", "Choose background", chooseOptionsBackground, "nightSky", function (data) { return data.globegl.background;} ),
        customBackground: cpString( "globegl.customBG", "Custom background", "", "optional", false, null, function (data) { return data.globegl.backgroundChoose == "customBG"; } ),

        texture: cpSwitch("globegl.texture", "World texture", "Yes", "No", true),
        textureChoose: cpDropDownString("globegl.textureChoose","Choose texture",chooseOptionsTexture,"earthDay",function (data) {  return data.globegl.texture; } ),
        customTexture: cpString( "globegl.customTexture", "Custom texture", "", "optional", false, null, function (data) {   return data.globegl.textureChoose == "customTexture"; } ),

        showAtmosphere: cpSwitch( "globegl.showAtmosphere", "Atmosphere", "Yes", "No", true ),
        atmosphereColor: cpString( "globegl.atmosphereColor", "Atmosphere color", "", "optional", false, null, function (data) {   return data.globegl.showAtmosphere; } ),
        atmosphereAltitude: cpString( "globegl.atmosphereAltitude", "Atmosphere altitude", "", "optional", false, null, function (data) {   return data.globegl.showAtmosphere; } ),
      
        rotationSwitch: cpSwitch("globegl.rotationSwitch", "Auto-rotate", "Yes", "No", true),
        rotationSpeed: cpNumber("globegl.rotationSpeed", "Rotation speed", "", "number", null, null, null, function(data){ return data.globegl.rotationSwitch}),
      },
    },
    config: {
      type: "items",
      label: "Configuration",
      items: {
        // Choose coloration 
        colorType: cpDropDownString( "globegl.colorType", "Coloration type", chooseColorationType, "standard"),
        colorStandard: cpString( "globegl.colorStandard", "Color", "", "optional", false, null, function (data) { return data.globegl.colorType == "standard"}),
        colorIf: cpText("Set the expresion under the dimension", function (data) { return data.globegl.colorType == "if"}),
        colorGrad1: cpColorPicker( "globegl.colorGrad1", "First color (lowest value)", "", function (data) { return  data.globegl.colorType == "gradient" }),
        colorGrad2: cpColorPicker( "globegl.colorGrad2", "Second color (highest value)", "", function (data) { return  data.globegl.colorType == "gradient" }),

        //points
        pointsGradientCol1: cpColorPicker( "globegl.pointsCol1", "First color (lowest value)", "", function (data) { return data.globegl.worldType == "points"; } ),
        pointsGradientCol2: cpColorPicker( "globegl.pointsCol2", "Second color (highest value)", "", function (data) {   return data.globegl.worldType == "points"; } ),

        //choropleth
        choroType: cpDropDownString( "globegl.choroType", "Polygon type", chooseOptionsChoroType, "countries", function (data) { return data.globegl.worldType == "choropleth"; } ),
        polygonHoverColor: cpString( "globegl.polyHoverColor", "Hover color", "", null, null, null, function (data) {   return data.globegl.worldType == "choropleth"; } ),
        polygonSideColor: cpString( "globegl.polySideColor", "Side color", "", null, null, null, function (data) {   return data.globegl.worldType == "choropleth"; } ),
        polygonStrokeColor: cpString( "globegl.polyStrokeColor", "Stroke color", "", null, null, null, function (data) {   return data.globegl.worldType == "choropleth"; } ),
        polygonAltitude: cpNumber( "globegl.polyAltitude", "Altitude of polygons", "", "number", null, false, null, function (data) {   return data.globegl.worldType == "choropleth"; } ),
        polygonHoverAltitude: cpString( "globegl.polyHoverAltitude", "Hover altitude", "", null, null, null, function (data) {   return data.globegl.worldType == "choropleth"; } ),
        polygonTransitionDuration: cpNumber( "globegl.polyTrans", "Transition duration", "", "number", null, false, null, function (data) {   return data.globegl.worldType == "choropleth"; } ),
        // Rotation?
        rotationPause: cpSwitch("globegl.rotationPause", "Pause rotation on hover", "Yes", "No", false, function(data){ return data.globegl.worldType && data.globegl.rotationSwitch }),

      },
    },

    about: cpAbout("extension", "1.0.0"),
  },
};

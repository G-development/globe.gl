export const createProps = (layout) => {
  var g = layout.globegl;
  var allProps = {
    /* START */
    // Type
    worldType:
      g.worldType && g.worldType != null && g.worldType != ""
        ? g.worldType
        : false,

    // Background settings
    background:
      g.background && g.background != null && g.background != ""
        ? g.background
        : false,
    backgroundChoose:
      g.backgroundChoose &&
      g.backgroundChoose != null &&
      g.backgroundChoose != ""
        ? g.backgroundChoose
        : false,
    customBackground:
      g.customBG && g.customBG != null && g.customBG != "" ? g.customBG : "",

    // Texture settings
    texture:
      g.texture && g.texture != null && g.texture != "" ? g.texture : false,
    textureChoose:
      g.textureChoose && g.textureChoose != null && g.textureChoose != ""
        ? g.textureChoose
        : false,
    customTexture:
      g.customTexture && g.customTexture != null && g.customTexture != ""
        ? g.customTexture
        : "",

    // Atmosphere
    showAtmosphere:
      g.showAtmosphere && g.showAtmosphere != null && g.showAtmosphere != ""
        ? g.showAtmosphere
        : false,
    atmosphereColor:
      g.atmosphereColor && g.atmosphereColor != null && g.atmosphereColor != ""
        ? g.atmosphereColor
        : "lightskyblue",
    atmosphereAltitude:
      g.atmosphereAltitude &&
      g.atmosphereAltitude != null &&
      g.atmosphereAltitude != ""
        ? g.atmosphereAltitude
        : 0.15,

    // Rotation
    rotationSwitch:
      g.rotationSwitch && g.rotationSwitch != null && g.rotationSwitch != ""
        ? g.rotationSwitch
        : false,
    rotationSpeed:
      g.rotationSpeed && g.rotationSpeed != null && g.rotationSpeed != ""
        ? g.rotationSpeed
        : 1.8,

    /* CONFIGURATION */
    // Coloration
    colorType:
      g.colorType && g.colorType != null && g.colorType != ""
        ? g.colorType
        : "standard",

    colorStandard:
      g.colorType == "standard" &&
      g.colorStandard != null &&
      g.colorStandard != ""
        ? g.colorStandard
        : "#ffff00",
    colorGrad1:
      g.colorType == "gradient" && g.colorGrad1 != null && g.colorGrad1 != ""
        ? g.colorGrad1
        : { color: "#ff0000" },
    colorGrad2:
      g.colorType == "gradient" && g.colorGrad2 != null && g.colorGrad2 != ""
        ? g.colorGrad2
        : { color: "#00ff00" },

    // For points
    pointsGradientCol1:
      g.pointsCol1 && g.pointsCol1 != null && g.pointsCol1 != ""
        ? g.pointsCol1
        : { color: "#ff0000" },
    pointsGradientCol2:
      g.pointsCol2 && g.pointsCol2 != null && g.pointsCol2 != ""
        ? g.pointsCol2
        : { color: "#00ff00" },

    // For choropleth
    choroType:
      g.choroType && g.choroType != null && g.choroType != ""
        ? g.choroType
        : "countries",
    polygonAltitude:
      g.polyAltitude && g.polyAltitude != null && g.polyAltitude != ""
        ? g.polyAltitude
        : 0.06,
    polygonHoverColor:
      g.polyHoverColor && g.polyHoverColor != null && g.polyHoverColor != ""
        ? g.polyHoverColor
        : "steelblue",
    polygonSideColor:
      g.polySideColor && g.polySideColor != null && g.polySideColor != ""
        ? g.polySideColor
        : "rgba(0, 100, 0, 0.15)",
    polygonStrokeColor:
      g.polyStrokeColor && g.polyStrokeColor != null && g.polyStrokeColor != ""
        ? g.polyStrokeColor
        : "#111",
    polygonHoverAltitude:
      g.polyHoverAltitude &&
      g.polyHoverAltitude != null &&
      g.polyHoverAltitude != ""
        ? g.polyHoverAltitude
        : 0.12,
    polygonTransitionDuration:
      g.polyTrans && g.polyTrans != null && g.polyTrans != ""
        ? g.polyTrans
        : 300,
      // Choro - rotation pause on hover polygon
      rotationPause: 
      g.rotationSwitch && g.rotationPause != null && g.rotationPause != ""
        ? g.rotationPause
        : false,
  };

  return allProps;
};

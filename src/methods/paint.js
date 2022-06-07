import "./style.css";
var qlik = window.require("qlik");
var Rainbow = require("rainbowvis.js");

import Globe from "globe.gl";
import * as topojson from "topojson";

import { createProps } from "../features/createProps";
import { makeGradients } from "../features/gradients";
import { createTooltip } from "../features/usefulMethods";

import { countryCoords } from "../data/countryCoords";
import * as countriesData from "../data/ne_110_light.json";
import * as continentsData from "../data/continents.json";

let earthDay = require("../assets/earth-day.jpg");
let earthDay2 = require("../assets/earth-day2.jpg");
let earthNight = require("../assets/earth-night.jpg");
let earthBlueMarble = require("../assets/earth-blue-marble.jpg");
let earthDark = require("../assets/earth-dark.jpg");

let stars = require("../assets/galaxy_starfield.png");
let nightSky = require("../assets/night-sky.png");
let transparentBG = require("../assets/transparent.png");

export default function paint($element, layout) {
  console.log("layout", layout);

  // for resize
  if ($("#world canvas")) $("#world canvas").remove();

  const allProps = createProps(layout);
  console.log("allProps: ", allProps);

  /* Create DATA */
  var hc = layout.qHyperCube,
    mat = hc.qDataPages[0].qMatrix,
    dimensions = [],
    measures = [];

  hc.qDimensionInfo.forEach((x) => dimensions.push(x.qFallbackTitle));
  hc.qMeasureInfo.forEach((x) => measures.push(x.qFallbackTitle));

  let usedISOs = [],
    colorByIf = [];
  let cc2 = mat.map((item) => {
    usedISOs.push(item[0].qText);
    colorByIf.push(item[0].qAttrExps.qValues[0].qText);
    let measObj = [];
    measures.forEach((measure, i) => {
      measObj.push({ name: measure, val: item[1 + i].qText });
    });
    return {
      ISO: item[0].qText,
      measures: measObj,
      nav: {
        // colorByIf: item[0].qAttrExps.qValues[0].qText,
        navSheet: item[1].qAttrExps.qValues[0].qText,
        navSel: item[1].qAttrExps.qValues[1].qText,
        navClear: item[1].qAttrExps.qValues[2].qText,
      },
    };
  });

  console.log("usedISOs", usedISOs);
  console.log("colorByIf", colorByIf);
  console.log("cc2", cc2);

  // Start options (background and texture)
  var bg =
    allProps.background == false
      ? transparentBG.default
      : eval(allProps.backgroundChoose + ".default");
  var texture =
    allProps.texture == false
      ? null
      : eval(allProps.textureChoose + ".default");

  // Manage polygons coloration
  var gradients;
  if (allProps.colorType == "gradient") {
    // make gradients
    gradients = makeGradients(
      mat,
      Rainbow,
      allProps.colorGrad1.color,
      allProps.colorGrad2.color
    );
  }

  // Points layer
  if (allProps.worldType === "points") {
    console.log("points");

    // make gradients
    var gradients = makeGradients(
      mat,
      Rainbow,
      allProps.pointsGradientCol1.color,
      allProps.pointsGradientCol2.color
    );
    // console.log("gradients", gradients);

    let test = Object.keys(countryCodes);
    let N,
      gData = [],
      i = 0;
    countryCoords.forEach((x) => {
      if (test.includes(x['"Country"'])) {
        let temp = x['"Country"'];
        N = test.length;
        gData.push({
          lat: x['"Latitude"'],
          lng: x['"Longitude"'],
          size: countryCodes[temp]["Sum(ValWorld)"] / 2000,
          // color: ["red", "white", "blue", "green"][
          //   Math.round(Math.random() * 3)
          // ],
          color: gradients[i],
        });
        i++;
      }
    });

    // console.log("Points gData", gData);

    Globe()
      .globeImageUrl(texture)
      .backgroundImageUrl(bg)
      .width($element.width())
      .height($element.height())
      .pointsData(gData)
      .pointAltitude("size")
      .pointColor("color")
      .pointLabel(["Ue!"])
      .showAtmosphere(allProps.showAtmosphere)
      .atmosphereColor(allProps.atmosphereColor)

      .atmosphereAltitude(allProps.atmosphereAltitude)(
      document.getElementById("world")
    );
  }
  // Choropleth
  else if (allProps.worldType === "choropleth") {
    console.log("choropleth");

    // for choroType == "countries"
    let countries = countriesData.default;
    // let keys = Object.keys(countryCodes);
    let countriesFiltered = countries.features.filter((d) =>
      usedISOs.includes(d.properties.ISO_A2)
    );

    countriesFiltered.forEach((country, i) => {
      country.properties.PROPS = cc2[i];
      if (allProps.colorType == "if")
        country.properties.colorByIf = colorByIf[i];
      if (allProps.colorType == "gradient")
        country.properties.colorByGrad = gradients[i];
    });

    console.log("countriesFiltered", countriesFiltered);

    // for choroType == "continents"
    let continentsRaw = topojson.feature(
      continentsData,
      continentsData.objects.continent
    ).features;

    continentsRaw.forEach((continent) => {
      if (usedISOs.includes(continent.properties.CONTINENT)) {
        let ind = usedISOs.indexOf(continent.properties.CONTINENT);
        if (allProps.colorType == "if")
          continent.properties.colorByIf = colorByIf[ind];
        if (allProps.colorType == "gradient")
          continent.properties.colorByGrad = gradients[ind];
        continent.properties.PROPS = cc2[ind];
      }
    });

    let continentsFiltered = continentsRaw.filter((d) =>
      usedISOs.includes(d.properties.CONTINENT)
    );
    console.log("continentsRaw", continentsRaw);
    console.log("continentsFiltered", continentsFiltered);

    const world = Globe()
      .globeImageUrl(texture)
      .backgroundImageUrl(bg)
      .width($element.width())
      .height($element.height())
      .lineHoverPrecision(0)
      .polygonsData(
        allProps.choroType == "countries"
          ? countriesFiltered
          : continentsFiltered
      )
      .polygonAltitude(allProps.polygonAltitude)
      .polygonCapColor(
        allProps.colorType == "standard"
          ? (d) => allProps.colorStandard
          : allProps.colorType == "if"
          ? (d) => d.properties.colorByIf
          : (d) => d.properties.colorByGrad
      )
      .polygonSideColor(() => allProps.polygonSideColor)
      .polygonStrokeColor(() => allProps.polygonStrokeColor)
      .polygonLabel(({ properties: d }) =>
        allProps.choroType == "countries"
          ? `
            <b>${d.ADMIN} (${d.ISO_A2}):</b> <br />
            ${createTooltip(d)}
          `
          : `<b>${d.CONTINENT}</b> <br />`
      )

      .onPolygonHover((hoverD) => {
        world
          .polygonAltitude((d) =>
            d === hoverD
              ? allProps.polygonHoverAltitude
              : allProps.polygonAltitude
          )
          .polygonCapColor((d) =>
            d === hoverD
              ? allProps.polygonHoverColor
              : allProps.colorType == "standard"
              ? allProps.colorStandard
              : allProps.colorType == "if"
              ? d.properties.colorByIf
              : d.properties.colorByGrad
          );
        if (hoverD && allProps.rotationPause)
          // Manage stop rotation on click
          world.controls().autoRotate = false;
        else world.controls().autoRotate = true;
      })
      .onPolygonClick((d) => {
        // console.log("CLICKED!", d.properties.ADMIN);
        let sheetNav = {
          sheetID: d.properties.PROPS.nav.navSheet,
          sheetSel: d.properties.PROPS.nav.navSel,
          sheetClear: d.properties.PROPS.nav.navClear,
        };
        console.log(sheetNav);
        if (sheetNav?.sheetID || sheetNav?.sheetSel || sheetNav?.sheetClear) {
          qlik.fun.promiseNavigationHistory(
            sheetNav.sheetClear,
            sheetNav.sheetSel,
            sheetNav.sheetID,
            false
          );
        }
      })
      .polygonsTransitionDuration(allProps.polygonTransitionDuration)
      .showAtmosphere(allProps.showAtmosphere)
      .atmosphereColor(allProps.atmosphereColor)
      .atmosphereAltitude(allProps.atmosphereAltitude)(
      document.getElementById("world")
    );

    // Auto-rotate
    if (allProps.rotationSwitch) {
      world.controls().autoRotate = true;
      world.controls().autoRotateSpeed = allProps.rotationSpeed;
    } else world.controls().autoRotate = false;
  }
}

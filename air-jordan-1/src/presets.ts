import { Model, Material } from "./reducer";

type Preset = {
  name: string;
  value: string;
  model: Omit<Model, "display">;
};

const glossLeatherMaterial: Omit<Material, "color"> = {
  metalness: 0,
  roughness: 0.5
};

const matteLeatherMaterial: Omit<Material, "color"> = {
  metalness: 0,
  roughness: 0.7
};

const baseClothMaterial: Omit<Material, "color"> = {
  metalness: 0,
  roughness: 0.9
};

const red = "#CE1141";
const black = "#000000";
const white = "#FAFAFA";
const royalBlue = "#1D4ED8";
const shadowGrey = "#8A8D8F";
const carolinaBlue = "#4B9CD3";

const PRESETS: Preset[] = [
  {
    name: "Chicagos",
    value: "chicagos",
    model: {
      collar: { ...glossLeatherMaterial, color: black },
      collarLining: { ...baseClothMaterial, color: black },
      collarLogo: { ...baseClothMaterial, color: black },
      collarOverlay: { ...glossLeatherMaterial, color: red },
      eyestay: { ...glossLeatherMaterial, color: red },
      heel: { ...glossLeatherMaterial, color: red },
      heelTab: { ...glossLeatherMaterial, color: red },
      lace: { ...baseClothMaterial, color: black },
      midsole: { ...glossLeatherMaterial, color: white },
      midsoleStitch: { ...baseClothMaterial, color: white },
      outsole: { ...matteLeatherMaterial, color: red },
      quarter: { ...glossLeatherMaterial, color: white },
      quarterOverlay: { ...glossLeatherMaterial, color: red },
      swoosh: { ...glossLeatherMaterial, color: black },
      toe: { ...glossLeatherMaterial, color: red },
      tongue: { ...glossLeatherMaterial, color: white },
      tongueLabel: { ...baseClothMaterial, color: red },
      vamp: { ...glossLeatherMaterial, color: white }
    }
  },
  {
    name: "Banned",
    value: "banned",
    model: {
      collar: { ...glossLeatherMaterial, color: black },
      collarLining: { ...baseClothMaterial, color: black },
      collarLogo: { ...baseClothMaterial, color: black },
      collarOverlay: { ...glossLeatherMaterial, color: red },
      eyestay: { ...glossLeatherMaterial, color: black },
      heel: { ...glossLeatherMaterial, color: red },
      heelTab: { ...glossLeatherMaterial, color: black },
      lace: { ...baseClothMaterial, color: red },
      midsole: { ...glossLeatherMaterial, color: white },
      midsoleStitch: { ...baseClothMaterial, color: white },
      outsole: { ...matteLeatherMaterial, color: red },
      quarter: { ...glossLeatherMaterial, color: black },
      quarterOverlay: { ...glossLeatherMaterial, color: black },
      swoosh: { ...glossLeatherMaterial, color: red },
      toe: { ...glossLeatherMaterial, color: black },
      tongue: { ...glossLeatherMaterial, color: black },
      tongueLabel: { ...baseClothMaterial, color: red },
      vamp: { ...glossLeatherMaterial, color: red }
    }
  },
  {
    name: "Royal",
    value: "royal",
    model: {
      collar: { ...glossLeatherMaterial, color: black },
      collarLining: { ...baseClothMaterial, color: black },
      collarLogo: { ...baseClothMaterial, color: black },
      collarOverlay: { ...glossLeatherMaterial, color: royalBlue },
      eyestay: { ...glossLeatherMaterial, color: black },
      heel: { ...glossLeatherMaterial, color: royalBlue },
      heelTab: { ...glossLeatherMaterial, color: black },
      lace: { ...baseClothMaterial, color: royalBlue },
      midsole: { ...glossLeatherMaterial, color: white },
      midsoleStitch: { ...baseClothMaterial, color: white },
      outsole: { ...matteLeatherMaterial, color: royalBlue },
      quarter: { ...glossLeatherMaterial, color: black },
      quarterOverlay: { ...glossLeatherMaterial, color: black },
      swoosh: { ...glossLeatherMaterial, color: royalBlue },
      toe: { ...glossLeatherMaterial, color: black },
      tongue: { ...glossLeatherMaterial, color: black },
      tongueLabel: { ...baseClothMaterial, color: royalBlue },
      vamp: { ...glossLeatherMaterial, color: royalBlue }
    }
  },
  {
    name: "Black Toe",
    value: "blacktoe",
    model: {
      collar: { ...glossLeatherMaterial, color: black },
      collarLining: { ...baseClothMaterial, color: black },
      collarLogo: { ...baseClothMaterial, color: black },
      collarOverlay: { ...glossLeatherMaterial, color: red },
      eyestay: { ...glossLeatherMaterial, color: black },
      heel: { ...glossLeatherMaterial, color: red },
      heelTab: { ...glossLeatherMaterial, color: red },
      lace: { ...baseClothMaterial, color: white },
      midsole: { ...glossLeatherMaterial, color: white },
      midsoleStitch: { ...baseClothMaterial, color: white },
      outsole: { ...matteLeatherMaterial, color: red },
      quarter: { ...glossLeatherMaterial, color: white },
      quarterOverlay: { ...glossLeatherMaterial, color: black },
      swoosh: { ...glossLeatherMaterial, color: black },
      toe: { ...glossLeatherMaterial, color: black },
      tongue: { ...glossLeatherMaterial, color: black },
      tongueLabel: { ...baseClothMaterial, color: black },
      vamp: { ...glossLeatherMaterial, color: white }
    }
  },
  {
    name: "Shadow",
    value: "shadow",
    model: {
      collar: { ...glossLeatherMaterial, color: black },
      collarLining: { ...baseClothMaterial, color: black },
      collarLogo: { ...baseClothMaterial, color: black },
      collarOverlay: { ...glossLeatherMaterial, color: shadowGrey },
      eyestay: { ...glossLeatherMaterial, color: black },
      heel: { ...glossLeatherMaterial, color: shadowGrey },
      heelTab: { ...glossLeatherMaterial, color: shadowGrey },
      lace: { ...baseClothMaterial, color: shadowGrey },
      midsole: { ...glossLeatherMaterial, color: white },
      midsoleStitch: { ...baseClothMaterial, color: white },
      outsole: { ...matteLeatherMaterial, color: black },
      quarter: { ...glossLeatherMaterial, color: black },
      quarterOverlay: { ...glossLeatherMaterial, color: black },
      swoosh: { ...glossLeatherMaterial, color: shadowGrey },
      toe: { ...glossLeatherMaterial, color: black },
      tongue: { ...glossLeatherMaterial, color: black },
      tongueLabel: { ...baseClothMaterial, color: black },
      vamp: { ...glossLeatherMaterial, color: shadowGrey }
    }
  },
  {
    name: "Carolina",
    value: "carolina",
    model: {
      collar: { ...glossLeatherMaterial, color: white },
      collarLining: { ...baseClothMaterial, color: white },
      collarLogo: { ...baseClothMaterial, color: white },
      collarOverlay: { ...glossLeatherMaterial, color: carolinaBlue },
      eyestay: { ...glossLeatherMaterial, color: carolinaBlue },
      heel: { ...glossLeatherMaterial, color: carolinaBlue },
      heelTab: { ...glossLeatherMaterial, color: carolinaBlue },
      lace: { ...baseClothMaterial, color: white },
      midsole: { ...glossLeatherMaterial, color: white },
      midsoleStitch: { ...baseClothMaterial, color: white },
      outsole: { ...matteLeatherMaterial, color: carolinaBlue },
      quarter: { ...glossLeatherMaterial, color: white },
      quarterOverlay: { ...glossLeatherMaterial, color: carolinaBlue },
      swoosh: { ...glossLeatherMaterial, color: carolinaBlue },
      toe: { ...glossLeatherMaterial, color: carolinaBlue },
      tongue: { ...glossLeatherMaterial, color: white },
      tongueLabel: { ...baseClothMaterial, color: white },
      vamp: { ...glossLeatherMaterial, color: white }
    }
  },
  {
    name: "None",
    value: "none",
    model: {
      collar: { ...glossLeatherMaterial, color: white },
      collarLining: { ...baseClothMaterial, color: black },
      collarLogo: { ...baseClothMaterial, color: white },
      collarOverlay: { ...glossLeatherMaterial, color: black },
      eyestay: { ...glossLeatherMaterial, color: black },
      heel: { ...glossLeatherMaterial, color: black },
      heelTab: { ...glossLeatherMaterial, color: black },
      lace: { ...baseClothMaterial, color: white },
      midsole: { ...glossLeatherMaterial, color: white },
      midsoleStitch: { ...baseClothMaterial, color: white },
      outsole: { ...matteLeatherMaterial, color: black },
      quarter: { ...glossLeatherMaterial, color: white },
      quarterOverlay: { ...glossLeatherMaterial, color: black },
      swoosh: { ...glossLeatherMaterial, color: black },
      toe: { ...glossLeatherMaterial, color: black },
      tongue: { ...glossLeatherMaterial, color: white },
      tongueLabel: { ...baseClothMaterial, color: white },
      vamp: { ...glossLeatherMaterial, color: white }
    }
  }
];

export default PRESETS;
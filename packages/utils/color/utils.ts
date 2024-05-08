import { Hex, Hsv, Rgb } from "../../types/color";


export function hexToRgb(hex: Hex): Rgb {
  const red = parseInt(hex.slice(1, 3), 16);
  const green = parseInt(hex.slice(3, 5), 16);
  const blue = parseInt(hex.slice(5, 7), 16);
  return {
    red: red,
    green: green,
    blue: blue,
  };
}


export function rgbToHex(rgb: Rgb): Hex {
  const { red, green, blue } = rgb;
  const hex = `#${red.toString(16).padStart(2, "0")}${green
    .toString(16)
    .padStart(2, "0")}${blue.toString(16).padStart(2, "0")}`;
  return hex;
}


export function hsvToRgb(hsv: Hsv): Rgb {
  const { hue, saturation, value } = hsv;
  const chroma = value * saturation;
  const huePrime = hue / 60;
  const x = chroma * (1 - Math.abs((huePrime % 2) - 1));
  let rgb: Rgb;
  if (huePrime >= 0 && huePrime <= 1) {
    rgb = {
      red: chroma,
      green: x,
      blue: 0,
    };
  } else if (huePrime >= 1 && huePrime <= 2) {
    rgb = {
      red: x,
      green: chroma,
      blue: 0,
    };
  } else if (huePrime >= 2 && huePrime <= 3) {
    rgb = {
      red: 0,
      green: chroma,
      blue: x,
    };
  } else if (huePrime >= 3 && huePrime <= 4) {
    rgb = {
      red: 0,
      green: x,
      blue: chroma,
    };
  } else if (huePrime >= 4 && huePrime <= 5) {
    rgb = {
      red: x,
      green: 0,
      blue: chroma,
    };
  } else if (huePrime >= 5 && huePrime <= 6) {
    rgb = {
      red: chroma,
      green: 0,
      blue: x,
    };
  } else {
    rgb = {
      red: 0,
      green: 0,
      blue: 0,
    };
  }
  const lightness = value - chroma;
  rgb.red += lightness;
  rgb.green += lightness;
  rgb.blue += lightness;
  rgb.red = Math.round(rgb.red * 255);
  rgb.green = Math.round(rgb.green * 255);
  rgb.blue = Math.round(rgb.blue * 255);
  return rgb;
}


export function rgbToHsv(rgb: Rgb): Hsv {
  const { red, green, blue } = rgb;
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const cMax = Math.max(r, g, b);
  const cMin = Math.min(r, g, b);
  const delta = cMax - cMin;
  let hue: number;
  if (delta === 0) {
    hue = 0;
  } else if (cMax === r) {
    hue = ((g - b) / delta) % 6;
  } else if (cMax === g) {
    hue = (b - r) / delta + 2;
  } else {
    hue = (r - g) / delta + 4;
  }
  hue *= 60;
  if (hue < 0) {
    hue += 360;
  }
  const saturation = cMax === 0 ? 0 : delta / cMax;
  const value = cMax;
  return {
    hue: hue,
    saturation: saturation,
    value: value,
  };
}


export function hexToHsv(hex: Hex): Hsv {
  const rgb = hexToRgb(hex);
  return rgbToHsv(rgb);
}


export function hsvToHex(hsv: Hsv): Hex {
  const rgb = hsvToRgb(hsv);
  return rgbToHex(rgb);
}

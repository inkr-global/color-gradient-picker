'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function toVal(mix) {
	var k, y, str='';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			for (k=0; k < mix.length; k++) {
				if (mix[k]) {
					if (y = toVal(mix[k])) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (k in mix) {
				if (mix[k]) {
					str && (str += ' ');
					str += k;
				}
			}
		}
	}

	return str;
}

function cn () {
	var i=0, tmp, x, str='';
	while (i < arguments.length) {
		if (tmp = arguments[i++]) {
			if (x = toVal(tmp)) {
				str && (str += ' ');
				str += x;
			}
		}
	}
	return str;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$e = ":root {\n  --color-gradient-picker-font-family: -apple-system, blinkmacsystemfont,\n    \"Segoe UI\", roboto, \"Helvetica Neue\", arial, \"Noto Sans\", sans-serif,\n    \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\";\n  --color-gradient-picker-base-font-size: 14px;\n  --color-gradient-picker-text-color: rgba(255, 255, 255, 0.65);\n  --color-gradient-picker-value-picker-width: 12px;\n  --color-gradient-picker-value-picker-border: 2px;\n  --color-gradient-picker-input-focus-color: #a58d12;\n}\n\n.ColorGradientPicker-module_wrapper__xOje8,\n.ColorGradientPicker-module_wrapper__xOje8 * {\n  box-sizing: border-box;\n}\n\n.ColorGradientPicker-module_wrapper__xOje8 {\n  font-family: var(--color-gradient-picker-font-family);\n  font-size: var(--color-gradient-picker-base-font-size);\n  color: var(--color-gradient-picker-text-color);\n  position: relative;\n}\n\n.ColorGradientPicker-module_picking_panel__tdy22 {\n  width: 290px;\n  border-radius: 4px;\n  background-color: #1f1f1f;\n  position: absolute;\n  top: calc(26px + 10px); /* 26px: input height */\n  padding-bottom: 16px;\n}\n";
var s$e = {"wrapper":"ColorGradientPicker-module_wrapper__xOje8","picking_panel":"ColorGradientPicker-module_picking_panel__tdy22"};
styleInject(css_248z$e);

/**
 * Get the hue value from a given position on the hue slider
 * @param {number} x The x coordinate on the hue slider
 * @param {number} width The width of the hue slider
 * @returns {number} The hue based on the x position
 */
function getHueFromPosition(x, width) {
    if (!width) {
        return 0;
    }
    var percentage = x / width;
    var hue = Math.max(Math.min(percentage, 1), 0) * 360;
    return hue;
}
/**
 * Get the alpha value from a given position on the alpha slider
 * @param {number} x The x coordinate on the alpha slider
 * @param {number} width The width of the alpha slider
 * @returns {number} The alpha based on the x position
 */
function getAlphaFromPosition(x, width) {
    if (!width) {
        return 0;
    }
    var percentage = x / width;
    var alpha = Math.max(Math.min(percentage, 1), 0) * 100;
    return Math.round(alpha);
}
/**
 * Get the saturation and value from a given position on the SV slider
 * @param {number} x The x coordinate on the SV selector
 * @param {number} y The y coordinate on the SV selector
 * @param {number} width The width of the SV selector
 * @param {number} height The height of the SV selector
 * @returns {SaturationValue} The saturation and value based on the position
 */
function getSaturationValueFromPosition(x, y, width, height) {
    var percentageX = !width ? 0 : x / width;
    var percentageY = !height ? 0 : 1 - y / height;
    var saturation = Math.max(Math.min(percentageX, 1), 0);
    var value = Math.max(Math.min(percentageY, 1), 0);
    return {
        saturation: saturation,
        value: value,
    };
}
/**
 * Get the color from EyeDropper API
 * @returns {string} Hex color
 */
var openNativeEyeDropper = function () { return __awaiter(void 0, void 0, void 0, function () {
    var abortController, eyeDropper, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                abortController = new AbortController();
                eyeDropper = new EyeDropper();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, eyeDropper.open({ signal: abortController.signal })];
            case 2:
                result = _a.sent();
                return [2 /*return*/, result.sRGBHex];
            case 3:
                _a.sent();
                return [2 /*return*/, null];
            case 4: return [2 /*return*/];
        }
    });
}); };

/**
 * Converts a hex color string to its red, green, and blue component values
 * @param {string} colorHex The color value in hex format
 * @returns {Rgb} The RGB values for the color
 */
function hexToRgb(colorHex) {
    var sanitizedHex = colorHex.replace(/[^a-fA-F0-9]/g, "");
    if (sanitizedHex.length !== 6 && sanitizedHex.length !== 3) {
        throw new Error("Color should be either 3 or 6 characters in length - received a length of ".concat(sanitizedHex.length));
    }
    if (sanitizedHex.length === 3) {
        sanitizedHex = "".concat(sanitizedHex[0].repeat(2)).concat(sanitizedHex[1].repeat(2)).concat(sanitizedHex[2].repeat(2));
    }
    var rgb = parseInt(sanitizedHex, 16);
    if (Number.isNaN(rgb)) {
        throw new Error("Unable to parse hex color ".concat(colorHex));
    }
    var red = (rgb >> 16) & 0xff;
    var green = (rgb >> 8) & 0xff;
    var blue = rgb & 0xff;
    return {
        red: red,
        green: green,
        blue: blue,
    };
}

/**
 * Takes given red, green, and blue values and returns the HSV representation
 * @param {number} red The red component of the color (0 - 255)
 * @param {number} green The green component of the color (0 - 255)
 * @param {number} blue The blue component of the color (0 - 255)
 * @returns {Hsv} The HSV representation of the color
 */
function rgbToHsv(red, green, blue) {
    var redPercent = red / 255;
    var greenPercent = green / 255;
    var bluePercent = blue / 255;
    var max = Math.max(redPercent, greenPercent, bluePercent);
    var min = Math.min(redPercent, greenPercent, bluePercent);
    var diff = max - min;
    var hue = 0;
    var saturation = (max === 0) ? 0 : diff / max;
    var value = max;
    if (min === max) ;
    else {
        switch (max) {
            case redPercent: {
                hue = (greenPercent - bluePercent) / diff + (greenPercent < bluePercent ? 6 : 0);
                break;
            }
            case greenPercent: {
                hue = (bluePercent - redPercent) / diff + 2;
                break;
            }
            case bluePercent: {
                hue = (redPercent - greenPercent) / diff + 4;
                break;
            }
        }
        hue /= 6;
        hue *= 360;
    }
    return {
        hue: hue,
        saturation: saturation,
        value: value,
    };
}

/**
 * Converts a hex color string to its hue, saturation, and value
 * @param {string} colorHex The color value in hex format
 * @returns {Hsv} The HSV values for the color
 */
function hexToHsv(colorHex) {
    // Hex validation handled by hexToRgb
    var _a = hexToRgb(colorHex), red = _a.red, green = _a.green, blue = _a.blue;
    return rgbToHsv(red, green, blue);
}

/**
 * Takes given hue, saturation and value and returns the respective RGB values
 * @param {number} hue The hue of the color (0.0 - 360.0)
 * @param {number} saturation The saturation of the color (0.0 - 1.0)
 * @param {number} value The value of the color (0.0 - 1.0)
 * @returns {Rgb} The RGB values for the color
 */
function hsvToRgb(hue, saturation, value) {
    // Bounds check
    if ((hue < 0 || hue > 360)
        || (saturation < 0 || saturation > 1)
        || (value < 0 || value > 1)) {
        throw new Error('Invalid hue, saturation, or value - all values must be between 0 and 1');
    }
    var red = 0;
    var green = 0;
    var blue = 0;
    var huePercent = hue / 360;
    var i = Math.floor(huePercent * 6);
    var f = huePercent * 6 - i;
    var p = value * (1 - saturation);
    var q = value * (1 - f * saturation);
    var t = value * (1 - (1 - f) * saturation);
    switch (i % 6) {
        case 0: {
            red = value;
            green = t;
            blue = p;
            break;
        }
        case 1: {
            red = q;
            green = value;
            blue = p;
            break;
        }
        case 2: {
            red = p;
            green = value;
            blue = t;
            break;
        }
        case 3: {
            red = p;
            green = q;
            blue = value;
            break;
        }
        case 4: {
            red = t;
            green = p;
            blue = value;
            break;
        }
        case 5: {
            red = value;
            green = p;
            blue = q;
            break;
        }
    }
    red = Math.round(red * 255);
    green = Math.round(green * 255);
    blue = Math.round(blue * 255);
    return {
        red: red,
        green: green,
        blue: blue,
    };
}

/**
 * Takes given red, green, and blue values and returns the hex color representation
 * @param {number} red The red component of the color (0 - 255)
 * @param {number} green The green component of the color (0 - 255)
 * @param {number} blue The blue component of the color (0 - 255)
 * @returns {string} The hex string representation of the color
 */
function rgbToHex(red, green, blue) {
    var rgb = blue | (green << 8) | (red << 16);
    return "#".concat((0x1000000 + rgb).toString(16).slice(1));
}

/**
 * Takes given hue, saturation and value and returns the hex color representation
 * @param {number} hue The hue of the color (0.0 - 360.0)
 * @param {number} saturation The saturation of the color (0.0 - 1.0)
 * @param {number} value The value of the color (0.0 - 1.0)
 * @returns {string} The hex string representation of the color
 */
function hsvToHex(hue, saturation, value) {
    // Bounds check handled by hsvToRgb
    var _a = hsvToRgb(hue, saturation, value), red = _a.red, green = _a.green, blue = _a.blue;
    return rgbToHex(red, green, blue);
}

var css_248z$d = ".ColorPicker-module_sliders_wrapper__AbyWM {\n  display: flex;\n  padding: 10px 16px 16px 8px;\n  align-items: flex-start;\n}\n\n.ColorPicker-module_sliders__-QKql {\n  flex-grow: 1;\n  padding-top: 8px;\n}\n\n.ColorPicker-module_hue_slider__QnXGF {\n  margin-bottom: 16px;\n}\n";
var s$d = {"sliders_wrapper":"ColorPicker-module_sliders_wrapper__AbyWM","sliders":"ColorPicker-module_sliders__-QKql","hue_slider":"ColorPicker-module_hue_slider__QnXGF"};
styleInject(css_248z$d);

var css_248z$c = ".AlphaSlider-module_alpha_slider__wK9WL {\n  position: relative;\n  height: calc(var(--color-gradient-picker-value-picker-width) - 4px);\n  border-radius: calc(\n    (var(--color-gradient-picker-value-picker-width) - 4px) / 2\n  );\n\n  background-color: #7e7e84;\n  background-image: linear-gradient(\n      45deg,\n      #4c4c52 25%,\n      transparent 25%,\n      transparent 75%,\n      #4c4c52 75%,\n      #4c4c52\n    ),\n    linear-gradient(\n      45deg,\n      #4c4c52 25%,\n      transparent 25%,\n      transparent 75%,\n      #4c4c52 75%,\n      #4c4c52\n    );\n  background-position: 0 0,\n    calc((var(--color-gradient-picker-value-picker-width) - 4px) / 2)\n      calc((var(--color-gradient-picker-value-picker-width) - 4px) / 2);\n  background-size: calc(var(--color-gradient-picker-value-picker-width) - 4px)\n      calc(var(--color-gradient-picker-value-picker-width) - 4px),\n    calc(var(--color-gradient-picker-value-picker-width) - 4px)\n      calc(var(--color-gradient-picker-value-picker-width) - 4px);\n  background-repeat: repeat, repeat;\n}\n\n.AlphaSlider-module_alpha_slider_picker__O84g1 {\n  position: absolute;\n  top: calc(0px - var(--color-gradient-picker-value-picker-border));\n  left: 0;\n  width: var(--color-gradient-picker-value-picker-width);\n  height: var(--color-gradient-picker-value-picker-width);\n  border: var(--color-gradient-picker-value-picker-border) solid #ffffff;\n  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);\n  background-color: #ff0000;\n  border-radius: 55%;\n  cursor: pointer;\n  transform: translateX(-50%);\n}\n\n.AlphaSlider-module_alpha_slider_bg__WGtCU {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  border-radius: calc(\n    (var(--color-gradient-picker-value-picker-width) - 4px) / 2\n  );\n}\n";
var s$c = {"alpha_slider":"AlphaSlider-module_alpha_slider__wK9WL","alpha_slider_picker":"AlphaSlider-module_alpha_slider_picker__O84g1","alpha_slider_bg":"AlphaSlider-module_alpha_slider_bg__WGtCU"};
styleInject(css_248z$c);

var AlphaSlider = function (props) {
    // ------------------------------------------------------------------------------------------
    var alpha = props.alpha, onChange = props.onChange, hex = props.hex, className = props.className;
    // ------------------------------------------------------------------------------------------
    var _a = react.useState(false), isInteracting = _a[0], setIsInteracting = _a[1];
    var sliderDivRef = react.useRef(null);
    // ------------------------------------------------------------------------------------------
    var updateAlpha = react.useCallback(function (evt) {
        if (!sliderDivRef.current) {
            return;
        }
        var alphaPosition = sliderDivRef.current.getBoundingClientRect();
        var x = evt.clientX - alphaPosition.left;
        var updatedAlpha = getAlphaFromPosition(x, sliderDivRef.current.clientWidth);
        onChange(updatedAlpha);
    }, [onChange]);
    var onPointerDown = react.useCallback(function (evt) {
        evt.target.setPointerCapture(evt.pointerId);
        setIsInteracting(true);
        updateAlpha(evt);
    }, [updateAlpha]);
    var onPointerUp = react.useCallback(function (evt) {
        evt.target.releasePointerCapture(evt.pointerId);
        setIsInteracting(false);
    }, []);
    var onMouseDown = react.useCallback(function (evt) {
        setIsInteracting(true);
        updateAlpha(evt);
    }, [updateAlpha]);
    var onMove = react.useCallback(function (evt) {
        if (isInteracting) {
            updateAlpha(evt);
        }
    }, [isInteracting, updateAlpha]);
    var onMouseUp = react.useCallback(function () {
        setIsInteracting(false);
    }, []);
    // Setup pointer events for supported browsers for two reasons:
    //   1. It allows for pointer capture which allows for continued
    //      interaction even when the cursor/pointer outside of picker
    //   2. It allows for unified code across devices (mobile and desktop)
    var interactionCallbacks = window.PointerEvent
        ? {
            onPointerDown: onPointerDown,
            onPointerMove: onMove,
            onPointerUp: onPointerUp,
        }
        : {
            onMouseDown: onMouseDown,
            onMouseMove: onMove,
            onMouseUp: onMouseUp,
        };
    var sliderStyle = {
        left: "".concat(alpha, "%"),
        backgroundColor: hex,
    };
    var _b = hexToRgb(hex), red = _b.red, green = _b.green, blue = _b.blue;
    var alphaStyle = {
        background: "linear-gradient(to right, rgba(".concat(red, ", ").concat(green, ", ").concat(blue, ", 0) 0%, ").concat(hex, " 100%)"),
    };
    return (jsxRuntime.jsxs("div", __assign({ className: cn(s$c.alpha_slider, className), ref: sliderDivRef, title: "Alpha" }, interactionCallbacks, { children: [jsxRuntime.jsx("div", { className: s$c.alpha_slider_bg, style: alphaStyle }), jsxRuntime.jsx("div", { className: cn(s$c.alpha_slider_picker), style: sliderStyle })] })));
};

var EyeDropper$1 = function (_a) {
    var onClick = _a.onClick;
    return (jsxRuntime.jsx("button", __assign({ style: {
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            padding: "6px 12px 8px 6px",
            flexShrink: 0,
        }, onClick: onClick }, { children: jsxRuntime.jsx("svg", __assign({ width: "12", height: "13", viewBox: "0 0 12 13", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: jsxRuntime.jsx("path", { d: "M2.61333 11.6667L1.33333 10.3867L6.70667 5.00002L8 6.29335L2.61333 11.6667ZM11.8067 2.75335L10.2467 1.19335C10 0.933352 9.56667 0.933352 9.30667 1.19335L7.22667 3.27335L5.94 2.00002L5 2.94002L5.94667 3.88669L0 9.83335V13H3.16667L9.11333 7.05335L10.06 8.00002L11 7.06002L9.72 5.78002L11.8 3.70002C12.0667 3.43335 12.0667 3.00002 11.8067 2.75335Z", fill: "white", fillOpacity: "0.3" }) })) })));
};

var css_248z$b = ".HueSlider-module_hue_slider__A0Iu0 {\n  position: relative;\n  height: calc(var(--color-gradient-picker-value-picker-width) - 4px);\n  border-radius: calc(\n    (var(--color-gradient-picker-value-picker-width) - 4px) / 2\n  );\n\n  background-image: linear-gradient(\n    to left,\n    #ff0000 0%,\n    #ff00ff 16.66%,\n    #0000ff 33.33%,\n    #00ffff 50%,\n    #00ff00 66.66%,\n    #ffff00 80.33%,\n    #ff0000 100%\n  );\n}\n\n.HueSlider-module_hue_slider_picker__igszs {\n  position: absolute;\n  top: calc(0px - var(--color-gradient-picker-value-picker-border));\n  left: 0;\n  width: var(--color-gradient-picker-value-picker-width);\n  height: var(--color-gradient-picker-value-picker-width);\n  border: var(--color-gradient-picker-value-picker-border) solid #ffffff;\n  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);\n  background-color: #ff0000;\n  border-radius: 55%;\n  cursor: pointer;\n  transform: translateX(-50%);\n}\n";
var s$b = {"hue_slider":"HueSlider-module_hue_slider__A0Iu0","hue_slider_picker":"HueSlider-module_hue_slider_picker__igszs"};
styleInject(css_248z$b);

var HueSlider = function (props) {
    // ------------------------------------------------------------------------------------------
    var hue = props.hue, onChange = props.onChange, className = props.className;
    // ------------------------------------------------------------------------------------------
    var _a = react.useState(false), isInteracting = _a[0], setIsInteracting = _a[1];
    var sliderDivRef = react.useRef(null);
    var hueColor = hsvToHex(hue, 1, 1);
    // ------------------------------------------------------------------------------------------
    var updateHue = react.useCallback(function (evt) {
        if (!sliderDivRef.current) {
            return;
        }
        var huePosition = sliderDivRef.current.getBoundingClientRect();
        var x = evt.clientX - huePosition.left;
        var updatedHue = getHueFromPosition(x, sliderDivRef.current.clientWidth);
        onChange(updatedHue);
    }, [onChange]);
    var onPointerDown = react.useCallback(function (evt) {
        evt.target.setPointerCapture(evt.pointerId);
        setIsInteracting(true);
        updateHue(evt);
    }, [updateHue]);
    var onPointerUp = react.useCallback(function (evt) {
        evt.target.releasePointerCapture(evt.pointerId);
        setIsInteracting(false);
    }, []);
    var onMouseDown = react.useCallback(function (evt) {
        setIsInteracting(true);
        updateHue(evt);
    }, [updateHue]);
    var onMove = react.useCallback(function (evt) {
        if (isInteracting) {
            updateHue(evt);
        }
    }, [isInteracting, updateHue]);
    var onMouseUp = react.useCallback(function () {
        setIsInteracting(false);
    }, []);
    // Setup pointer events for supported browsers for two reasons:
    //   1. It allows for pointer capture which allows for continued
    //      interaction even when the cursor/pointer outside of picker
    //   2. It allows for unified code across devices (mobile and desktop)
    var interactionCallbacks = window.PointerEvent
        ? {
            onPointerDown: onPointerDown,
            onPointerMove: onMove,
            onPointerUp: onPointerUp,
        }
        : {
            onMouseDown: onMouseDown,
            onMouseMove: onMove,
            onMouseUp: onMouseUp,
        };
    var sliderStyle = {
        left: "".concat((hue / 360) * 100, "%"),
        backgroundColor: hueColor,
    };
    return (jsxRuntime.jsx("div", __assign({ className: cn(s$b.hue_slider, className), ref: sliderDivRef, title: "Hue" }, interactionCallbacks, { children: jsxRuntime.jsx("div", { className: cn(s$b.hue_slider_picker), style: sliderStyle }) })));
};

var KEYS = {
    ENTER: "Enter",
};
var ALPHA_VALUE = {
    MAX: 100,
    MIN: 0,
};
var RGB_VALUE = {
    MAX: 255,
    MIN: 0,
};
var DEGREE_VALUE = {
    MAX: 360,
    MIN: 0,
};
var DEFAULT_HEX = "#000";

var css_248z$a = ".Input-Alpha-module_alpha_info__4qWzi {\n  width: 16px;\n  height: 16px;\n  border-radius: 1px;\n  border: 2px solid #7e7e84;\n\n  background-color: #1f1f1f;\n  background-image: linear-gradient(\n      45deg,\n      #7e7e84 25%,\n      transparent 25%,\n      transparent 75%,\n      #7e7e84 75%,\n      #7e7e84\n    ),\n    linear-gradient(\n      45deg,\n      #7e7e84 25%,\n      transparent 25%,\n      transparent 75%,\n      #7e7e84 75%,\n      #7e7e84\n    );\n  background-position: 0 0, 4px 4px;\n  background-size: 8px 8px, 8px 8px;\n  background-repeat: repeat, repeat;\n}\n\n.Input-Alpha-module_alpha_input__ibsbE {\n  margin-right: 2px;\n}\n";
var s$a = {"alpha_info":"Input-Alpha-module_alpha_info__4qWzi","alpha_input":"Input-Alpha-module_alpha_input__ibsbE"};
styleInject(css_248z$a);

function InputAlphaInfo() {
    return jsxRuntime.jsx("div", { className: s$a.alpha_info });
}
var ALPHA_SYMBOL = "%";
var getAlphaString = function (alpha) { return "".concat(alpha).concat(ALPHA_SYMBOL); };
function Alpha(props) {
    var value = props.value, onChange = props.onChange, onInputBlur = props.onInputBlur, rest = __rest(props, ["value", "onChange", "onInputBlur"]);
    var _a = react.useState(getAlphaString(value)), valueState = _a[0], setValueState = _a[1];
    // -----------------------------------------------------------------------
    react.useEffect(function () {
        setValueState(getAlphaString(value));
    }, [value]);
    // -----------------------------------------------------------------------
    var _onInternalChange = function (e) {
        var _value = parseInt(e.currentTarget.value.replace(ALPHA_SYMBOL, ""));
        _value = Math.round(_value);
        if (_value < ALPHA_VALUE.MIN)
            _value = ALPHA_VALUE.MIN;
        if (_value > ALPHA_VALUE.MAX)
            _value = ALPHA_VALUE.MAX;
        if (isNaN(_value))
            _value = ALPHA_VALUE.MIN;
        setValueState(getAlphaString(_value));
    };
    var _onOutsideChange = function () {
        var _a;
        // remove % if the valueState has it
        var _valueState = parseInt((_a = ((valueState === null || valueState === void 0 ? void 0 : valueState.toString()) || ALPHA_VALUE.MAX.toString())) === null || _a === void 0 ? void 0 : _a.replace(ALPHA_SYMBOL, ""));
        onChange(_valueState);
        setValueState(getAlphaString(_valueState));
    };
    var _onKeyDown = function (e) {
        e.stopPropagation();
        if (e.key === KEYS.ENTER)
            _onOutsideChange();
    };
    var _onBlur = function (e) {
        _onOutsideChange();
        if (typeof onInputBlur === "function")
            onInputBlur(e);
    };
    // -----------------------------------------------------------------------
    return (jsxRuntime.jsx(Input, __assign({}, rest, { info: jsxRuntime.jsx(InputAlphaInfo, {}), onChange: _onInternalChange, onKeyDown: _onKeyDown, onInputBlur: _onBlur, value: valueState, inputClassName: s$a.alpha_input })));
}

var DEGREE_SYMBOL = "°";
function DegreeInfo() {
    return (jsxRuntime.jsx("svg", __assign({ width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: {
            position: "relative",
            top: 2,
        } }, { children: jsxRuntime.jsx("path", { d: "M6.99062 0.937567C3.53906 0.942254 0.75 3.73444 0.75 7.186C0.75 9.186 1.69062 10.9673 3.15312 12.111L2.56719 12.861C2.50313 12.9438 2.5625 13.0641 2.66563 13.0626L5.275 13.0501C5.35625 13.0501 5.41562 12.9735 5.39531 12.8954L4.77812 10.3594C4.77255 10.3366 4.76064 10.3158 4.74376 10.2994C4.72688 10.283 4.70571 10.2717 4.6827 10.2668C4.65968 10.2619 4.63575 10.2636 4.61366 10.2717C4.59157 10.2798 4.57221 10.294 4.55781 10.3126L3.92188 11.1266C3.7625 11.0016 3.60938 10.8657 3.46406 10.7204C3.00722 10.2651 2.64318 9.72543 2.39219 9.13132C2.13125 8.51569 2 7.861 2 7.186C2 6.511 2.13125 5.85632 2.39219 5.24069C2.64375 4.64538 3.00469 4.111 3.46406 3.65163C3.92344 3.19225 4.45781 2.83132 5.05312 2.57975C5.67031 2.31882 6.325 2.18757 7 2.18757C7.675 2.18757 8.32969 2.31882 8.94531 2.57975C9.54062 2.83132 10.075 3.19225 10.5344 3.65163C10.9938 4.111 11.3547 4.64538 11.6062 5.24069C11.8672 5.85632 11.9984 6.511 11.9984 7.186C11.9984 7.861 11.8672 8.51569 11.6062 9.13132C11.3553 9.72543 10.9912 10.2651 10.5344 10.7204C10.4172 10.8376 10.2953 10.9469 10.1687 11.0516C10.1434 11.0722 10.1272 11.102 10.1237 11.1345C10.1202 11.167 10.1296 11.1995 10.15 11.2251L10.7656 12.0141C10.8094 12.0688 10.8891 12.0782 10.9438 12.0344C12.3516 10.8876 13.25 9.14225 13.25 7.186C13.25 3.73132 10.4469 0.932879 6.99062 0.937567Z", fill: "white", fillOpacity: "0.3" }) })));
}
var getDegreeString = function (degree) { return "".concat(degree).concat(DEGREE_SYMBOL); };
function Degree(props) {
    var value = props.value, onChange = props.onChange, onInputBlur = props.onInputBlur, rest = __rest(props, ["value", "onChange", "onInputBlur"]);
    var _a = react.useState(getDegreeString(value)), valueState = _a[0], setValueState = _a[1];
    // ------------------------------------------------------------------------------------------
    react.useEffect(function () {
        setValueState(getDegreeString(value));
    }, [value]);
    var _onInternalChange = function (e) {
        var _value = parseInt(e.currentTarget.value.replace(DEGREE_SYMBOL, ""));
        _value = Math.round(_value);
        if (_value < DEGREE_VALUE.MIN)
            _value = DEGREE_VALUE.MIN;
        if (_value > DEGREE_VALUE.MAX)
            _value = DEGREE_VALUE.MAX;
        if (isNaN(_value))
            _value = DEGREE_VALUE.MIN;
        setValueState(getDegreeString(_value));
    };
    var _onOutsideChange = function () {
        var _a;
        var _valueState = parseInt((_a = valueState === null || valueState === void 0 ? void 0 : valueState.toString()) === null || _a === void 0 ? void 0 : _a.replace(DEGREE_SYMBOL, ""));
        onChange(_valueState);
        setValueState(getDegreeString(_valueState));
    };
    var _onKeyDown = function (e) {
        e.stopPropagation();
        if (e.key === KEYS.ENTER)
            _onOutsideChange();
    };
    var _onBlur = function (e) {
        _onOutsideChange();
        if (typeof onInputBlur === "function")
            onInputBlur(e);
    };
    // -----------------------------------------------------------------------
    return (jsxRuntime.jsx(Input, __assign({}, rest, { onChange: _onInternalChange, onKeyDown: _onKeyDown, value: valueState, onInputBlur: _onBlur, info: jsxRuntime.jsx(DegreeInfo, {}), inputWidth: 35 })));
}

var compare = function (_a, _b) {
    var offset1 = _a.offset;
    var offset2 = _b.offset;
    return offset1 - offset2;
};
var sortPalette = function (palette) {
    return palette.sort(compare);
};
var getLinearGradientBackgroundCss = function (gradient) {
    var sortedPalette = sortPalette(gradient.palette);
    var linearGradientColors = "linear-gradient(\n    ".concat(gradient.degree, "deg,\n    ").concat(sortedPalette
        .map(function (_a) {
        var alpha = _a.alpha, offset = _a.offset, _b = _a.color, red = _b.red, green = _b.green, blue = _b.blue;
        return "rgb(".concat(red, ", ").concat(green, ", ").concat(blue, ", ").concat(alpha, ") ").concat(offset * 100, "%");
    })
        .join(", "), "\n  )");
    return linearGradientColors;
};
var noop = function () { return undefined; };

var css_248z$9 = ".Input-Gradient-module_gradient_preview__9mgD0 {\n  width: 16px;\n  height: 16px;\n  box-sizing: border-box;\n  border-radius: 2px;\n  text-align: center;\n}\n";
var s$9 = {"gradient_preview":"Input-Gradient-module_gradient_preview__9mgD0"};
styleInject(css_248z$9);

function GradientPreview(props) {
    var value = props.value;
    var color = DEFAULT_HEX;
    if (typeof value !== "undefined") {
        color = getLinearGradientBackgroundCss(value);
    }
    return (jsxRuntime.jsx("div", { style: {
            background: color,
        }, className: s$9.gradient_preview }));
}
// ------------------------------------------------------------------------------------------
function GradientInput(props) {
    var value = props.value, rest = __rest(props, ["value"]);
    // -----------------------------------------------------------------------
    return (jsxRuntime.jsx(Input, __assign({}, rest, { value: "Gradient", onChange: noop, info: jsxRuntime.jsx(GradientPreview, { value: value }) })));
}

/**
 * Removes invalid characters and formats color hex to 6 characters
 * @param {string} colorHex The color value in hex format to sanitize
 * @returns {string} The sanitized hex color
 */
function sanitizeHex(colorHex) {
    var sanitizedHex = colorHex.replace(/[^a-fA-F0-9]/g, '');
    if (sanitizedHex.length === 0) {
        sanitizedHex = '000000';
    }
    else if (sanitizedHex.length === 1) {
        sanitizedHex = sanitizedHex[0].repeat(6);
    }
    else if (sanitizedHex.length === 2) {
        sanitizedHex = "".concat(sanitizedHex[0].repeat(3)).concat(sanitizedHex[1].repeat(3));
    }
    else if (sanitizedHex.length >= 3 && sanitizedHex.length < 6) {
        sanitizedHex = "".concat(sanitizedHex[0].repeat(2)).concat(sanitizedHex[1].repeat(2)).concat(sanitizedHex[2].repeat(2));
    }
    else if (sanitizedHex.length > 6) {
        sanitizedHex = sanitizedHex.slice(0, 6);
    }
    return "#".concat(sanitizedHex);
}

var css_248z$8 = ".Input-Hex-module_color_preview__HTigr {\n  width: 16px;\n  height: 16px;\n  box-sizing: border-box;\n  border-radius: 2px;\n  text-align: center;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}\n";
var s$8 = {"color_preview":"Input-Hex-module_color_preview__HTigr"};
styleInject(css_248z$8);

function ColorPreview(props) {
    var value = props.value;
    return (jsxRuntime.jsx("div", { style: {
            background: value,
        }, className: s$8.color_preview }));
}
// ------------------------------------------------------------------------------------------
function Hex(props) {
    var value = props.value, onChange = props.onChange, onInputBlur = props.onInputBlur, rest = __rest(props, ["value", "onChange", "onInputBlur"]);
    var _a = react.useState(value), valueState = _a[0], setValueState = _a[1];
    // -----------------------------------------------------------------------
    react.useEffect(function () {
        setValueState(value);
    }, [value]);
    var _onInternalChange = function (e) {
        var _value = e.currentTarget.value;
        setValueState(_value);
    };
    var _onOutsideChange = function () {
        var _valueState = sanitizeHex(valueState);
        onChange(_valueState);
        setValueState(_valueState);
    };
    var _onKeyDown = function (e) {
        e.stopPropagation();
        if (e.key === KEYS.ENTER)
            _onOutsideChange();
    };
    var _onBlur = function (e) {
        _onOutsideChange();
        if (typeof onInputBlur === "function")
            onInputBlur(e);
    };
    // -----------------------------------------------------------------------
    return (jsxRuntime.jsx(Input, __assign({}, rest, { onChange: _onInternalChange, onKeyDown: _onKeyDown, onInputBlur: _onBlur, value: valueState.toUpperCase(), info: jsxRuntime.jsx(ColorPreview, { value: value }) })));
}

var css_248z$7 = ".Input-module_container__UIJW7 {\n  display: inline-flex;\n  align-items: center;\n  height: 26px;\n}\n\n.Input-module_container__UIJW7:hover .Input-module_wrapper__YQPzB {\n  border: 1px solid #262626;\n}\n\n.Input-module_wrapper__YQPzB {\n  display: inline-flex;\n  align-items: center;\n  border-radius: 2px;\n  height: 100%;\n  border: 1px solid transparent;\n  transition: border-color 0.25s ease;\n}\n\n.Input-module_container__UIJW7 .Input-module_wrapper__YQPzB.Input-module_isFocus__R2hS2 {\n  border: 1px solid var(--color-gradient-picker-input-focus-color);\n}\n\n.Input-module_container__UIJW7 .Input-module_extra_component__ClBmv {\n  border: none !important;\n}\n\n.Input-module_extra_component__ClBmv input {\n  padding-left: 6px;\n}\n\n.Input-module_label__YtHRq {\n  margin-right: 12px;\n}\n\n.Input-module_input__rWdpT {\n  border: none;\n  line-height: 1.5;\n  background-color: transparent;\n  color: var(--color-gradient-picker-text-color);\n  border: none;\n  outline: none;\n}\n\n.Input-module_input__rWdpT {\n  margin-right: 8px;\n}\n\n.Input-module_input__rWdpT::-webkit-outer-spin-button,\n.Input-module_input__rWdpT::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.Input-module_input__rWdpT[type=\"number\"] {\n  -moz-appearance: textfield;\n}\n\n.Input-module_info__enne1 {\n  margin-right: 6px;\n  margin-left: 6px;\n}\n";
var s$7 = {"container":"Input-module_container__UIJW7","wrapper":"Input-module_wrapper__YQPzB","isFocus":"Input-module_isFocus__R2hS2","extra_component":"Input-module_extra_component__ClBmv","label":"Input-module_label__YtHRq","input":"Input-module_input__rWdpT","info":"Input-module_info__enne1"};
styleInject(css_248z$7);

var css_248z$6 = ".Input-Rgb-module_input_text__VCz4h {\n  width: 16px;\n  height: 16px;\n  box-sizing: border-box;\n  border-radius: 2px;\n  text-align: center;\n  position: relative;\n  top: -1px;\n}\n";
var s$6 = {"input_text":"Input-Rgb-module_input_text__VCz4h"};
styleInject(css_248z$6);

function InputTextInfo(props) {
    var children = props.children;
    return jsxRuntime.jsx("div", __assign({ className: s$6.input_text }, { children: children }));
}
// ------------------------------------------------------------------------------------------
function Rgb(props) {
    var inputProps = props.inputProps, info = props.info, onChange = props.onChange, value = props.value, onInputBlur = props.onInputBlur, rest = __rest(props, ["inputProps", "info", "onChange", "value", "onInputBlur"]);
    var _a = react.useState(value), valueState = _a[0], setValueState = _a[1];
    var customInputProps = __assign(__assign({}, inputProps), { type: "number", min: RGB_VALUE.MIN, max: RGB_VALUE.MAX });
    // -----------------------------------------------------------------------
    react.useEffect(function () {
        setValueState(value);
    }, [value]);
    // -----------------------------------------------------------------------
    var _onInternalChange = function (e) {
        var _value = parseInt(e.currentTarget.value);
        if (_value < RGB_VALUE.MIN)
            _value = RGB_VALUE.MIN;
        if (_value > RGB_VALUE.MAX)
            _value = RGB_VALUE.MAX;
        if (isNaN(_value))
            _value = RGB_VALUE.MIN;
        setValueState(_value);
    };
    var _onOutsideChange = function () {
        onChange(valueState);
        setValueState(valueState);
    };
    var _onKeyDown = function (e) {
        e.stopPropagation();
        if (e.key === KEYS.ENTER)
            _onOutsideChange();
    };
    var _onBlur = function (e) {
        _onOutsideChange();
        if (typeof onInputBlur === "function")
            onInputBlur(e);
    };
    // -----------------------------------------------------------------------
    return (jsxRuntime.jsx(Input, __assign({}, rest, { onChange: _onInternalChange, onKeyDown: _onKeyDown, value: valueState, onInputBlur: _onBlur, info: jsxRuntime.jsx(InputTextInfo, { children: info }), inputProps: customInputProps })));
}

function Input(props) {
    // ------------------------------------------------------------------------------------------
    var className = props.className, info = props.info, label = props.label, style = props.style, inputWrapperClassName = props.inputWrapperClassName, inputClassName = props.inputClassName, inputProps = props.inputProps, placeholder = props.placeholder, onInputFocus = props.onInputFocus, onInputBlur = props.onInputBlur, onChange = props.onChange, onKeyDown = props.onKeyDown, value = props.value, inputWidth = props.inputWidth, extra = props.extraInput, isExtraComponent = props.isExtraComponent;
    var _a = inputProps || {}, inputStyle = _a.style, restInputProps = __rest(_a, ["style"]);
    // -----------------------------------------------------------------------
    var _b = react.useState(), isFocus = _b[0], setFocus = _b[1];
    var containerRef = react.useRef(null);
    react.useEffect(function () {
        if (typeof document === "undefined")
            return function () { return undefined; };
        var handler = function (e) {
            var _a;
            if ((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target)) {
                setFocus(true);
            }
            else {
                setFocus(false);
            }
        };
        document.addEventListener("click", handler);
        document.addEventListener("touchstart", handler);
        return function () {
            document.removeEventListener("click", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, []);
    // -----------------------------------------------------------------------
    return (jsxRuntime.jsxs("div", __assign({ className: cn(s$7.container, className), style: style }, { children: [label && jsxRuntime.jsx("div", __assign({ className: cn(s$7.label) }, { children: label })), jsxRuntime.jsxs("div", __assign({ className: cn(s$7.wrapper, isFocus && s$7.isFocus, isExtraComponent && s$7.extra_component, inputWrapperClassName), ref: containerRef }, { children: [info && !isExtraComponent && (jsxRuntime.jsx("div", __assign({ className: cn(s$7.info) }, { children: info }))), jsxRuntime.jsx("input", __assign({}, restInputProps, { style: __assign(__assign({}, inputStyle), { width: inputWidth }), onFocus: function (e) {
                            if (typeof onInputFocus === "function")
                                onInputFocus(e);
                            setTimeout(function () {
                                e.target.select();
                            }, 100);
                        }, onBlur: onInputBlur, placeholder: placeholder, className: cn(s$7.input, inputClassName), value: value, onChange: onChange, onKeyDown: onKeyDown })), extra] }))] })));
}
// ------------------------------------------------------------------------------------------
Input.Alpha = Alpha;
Input.Rgb = Rgb;
Input.Hex = Hex;
Input.Degree = Degree;
Input.Gradient = GradientInput;

var css_248z$5 = ".InputFields-module_color_inputs_wrapper__izMj3 {\n  padding-left: 16px;\n  padding-right: 16px;\n  display: grid;\n  grid-template-areas: \"hex hex alpha\" \"red green blue\";\n  gap: 8px;\n}\n";
var s$5 = {"color_inputs_wrapper":"InputFields-module_color_inputs_wrapper__izMj3"};
styleInject(css_248z$5);

var InputFields = function (props) {
    var hex = props.hex, alpha = props.alpha, rgb = props.rgb, setColor = props.setColor, setAlpha = props.setAlpha, setColorFromRgb = props.setColorFromRgb;
    var red = rgb.red, green = rgb.green, blue = rgb.blue;
    return (jsxRuntime.jsxs("div", __assign({ className: s$5.color_inputs_wrapper }, { children: [jsxRuntime.jsx(Input.Hex, { label: "HEX", inputWidth: 100, style: { gridArea: "hex" }, value: hex, onChange: function (_hex) {
                    setColor(_hex, hexToHsv(_hex));
                } }), jsxRuntime.jsx(Input.Alpha, { inputWidth: 40, style: { gridArea: "alpha" }, value: alpha, onChange: function (_alpha) {
                    setAlpha(_alpha);
                } }), jsxRuntime.jsx(Input.Rgb, { label: "RGB", info: "R", inputWidth: 26, style: {
                    gridArea: "red",
                    marginLeft: -2,
                }, value: red, onChange: function (_red) {
                    setColorFromRgb({
                        red: _red,
                        green: green,
                        blue: blue,
                    });
                } }), jsxRuntime.jsx(Input.Rgb, { info: "G", inputWidth: 26, style: { gridArea: "green" }, value: green, onChange: function (_green) {
                    setColorFromRgb({
                        red: red,
                        green: _green,
                        blue: blue,
                    });
                } }), jsxRuntime.jsx(Input.Rgb, { info: "B", inputWidth: 26, style: { gridArea: "blue" }, value: blue, onChange: function (_blue) {
                    setColorFromRgb({
                        red: red,
                        green: green,
                        blue: _blue,
                    });
                } })] })));
};

var css_248z$4 = ".SaturationPicker-module_saturation_value_selector__r-R0H {\n  position: relative;\n  box-sizing: border-box;\n  width: 290px;\n  height: 290px;\n  background-image: linear-gradient(\n      to bottom,\n      rgba(0, 0, 0, 0) 0%,\n      #000000 100%\n    ),\n    linear-gradient(to left, rgba(255, 255, 255, 0) 0%, #ffffff 100%);\n  background-color: #ffffff;\n}\n\n.SaturationPicker-module_saturation_value_picker__wN2fj {\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  width: var(--color-gradient-picker-value-picker-width);\n  height: var(--color-gradient-picker-value-picker-width);\n  box-sizing: border-box;\n\n  border: 2px solid #ffffff;\n  border-radius: 50%;\n  cursor: pointer;\n  transform: translate(-50%, -50%);\n}\n";
var s$4 = {"saturation_value_selector":"SaturationPicker-module_saturation_value_selector__r-R0H","saturation_value_picker":"SaturationPicker-module_saturation_value_picker__wN2fj"};
styleInject(css_248z$4);

var SaturationPicker = function (props) {
    // ------------------------------------------------------------------------------------------
    var hue = props.hue, saturation = props.saturation, value = props.value, onChange = props.onChange;
    // ------------------------------------------------------------------------------------------
    var _a = react.useState(false), isInteracting = _a[0], setIsInteracting = _a[1];
    var selectorDivRef = react.useRef(null);
    var hueColor = hsvToHex(hue, 1, 1);
    var hex = hsvToHex(hue, saturation, value);
    var updateSaturationValue = react.useCallback(function (evt) {
        if (!selectorDivRef.current) {
            return;
        }
        var svPosition = selectorDivRef.current.getBoundingClientRect();
        var x = evt.clientX - svPosition.left;
        var y = evt.clientY - svPosition.top;
        var updatedSaturationValue = getSaturationValueFromPosition(x, y, selectorDivRef.current.clientWidth, selectorDivRef.current.clientHeight);
        onChange(updatedSaturationValue);
    }, [onChange]);
    var onPointerDown = react.useCallback(function (evt) {
        evt.target.setPointerCapture(evt.pointerId);
        setIsInteracting(true);
        updateSaturationValue(evt);
    }, [updateSaturationValue]);
    var onPointerUp = react.useCallback(function (evt) {
        evt.target.releasePointerCapture(evt.pointerId);
        setIsInteracting(false);
    }, []);
    var onMouseDown = react.useCallback(function (evt) {
        setIsInteracting(true);
        updateSaturationValue(evt);
    }, [updateSaturationValue]);
    var onMove = react.useCallback(function (evt) {
        if (isInteracting) {
            updateSaturationValue(evt);
        }
    }, [isInteracting, updateSaturationValue]);
    var onMouseUp = react.useCallback(function () {
        setIsInteracting(false);
    }, []);
    // Setup pointer events for supported browsers for two reasons:
    //   1. It allows for pointer capture which allows for continued
    //      interaction even when the cursor/pointer outside of picker
    //   2. It allows for unified code across devices (mobile and desktop)
    var interactionCallbacks = window.PointerEvent
        ? {
            onPointerDown: onPointerDown,
            onPointerMove: onMove,
            onPointerUp: onPointerUp,
        }
        : {
            onMouseDown: onMouseDown,
            onMouseMove: onMove,
            onMouseUp: onMouseUp,
        };
    return (jsxRuntime.jsx("div", __assign({ className: cn(s$4.saturation_value_selector), style: {
            backgroundColor: hueColor,
        }, ref: selectorDivRef, title: "Saturation and Value" }, interactionCallbacks, { children: jsxRuntime.jsx("div", { className: cn(s$4.saturation_value_picker), style: {
                left: "".concat(saturation * 100, "%"),
                top: "".concat((1 - value) * 100, "%"),
                backgroundColor: hex,
            } }) })));
};

var ColorPicker = function (props) {
    // ------------------------------------------------------------------------------------------
    var hex = props.hex, alpha = props.alpha, onColorChange = props.onColorChange, onAlphaChange = props.onAlphaChange;
    var _a = react.useState(hex), setHexState = _a[1];
    // ------------------------------------------------------------------------------------------
    var hsvRef = react.useRef(hexToHsv(hex));
    var hexRef = react.useRef(hex);
    var _b = hsvRef.current, hue = _b.hue, saturation = _b.saturation, value = _b.value;
    var rgb = hexToRgb(hexRef.current);
    // ------------------------------------------------------------------------------------------
    react.useEffect(function () {
        hsvRef.current = hexToHsv(hex);
        hexRef.current = hex;
        setHexState(hex);
    }, [hex]);
    // ------------------------------------------------------------------------------------------
    var _onSetColor = function (_updatedHex, _updatedHsv) {
        hexRef.current = _updatedHex;
        hsvRef.current = _updatedHsv;
        onColorChange(_updatedHex);
    };
    var _onSetColorFromRgb = function (updatedRgb) {
        var red = updatedRgb.red, green = updatedRgb.green, blue = updatedRgb.blue;
        _onSetColor(rgbToHex(red, green, blue), rgbToHsv(red, green, blue));
    };
    var _onEyeDropperClick = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _hex;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, openNativeEyeDropper()];
                case 1:
                    _hex = _a.sent();
                    if (_hex !== null) {
                        _onSetColor(_hex, hexToHsv(_hex));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    // Helper to set the color when HSV change
    var _onSetColorFromHsv = function (_updatedHsv) {
        _onSetColor(hsvToHex(_updatedHsv.hue, _updatedHsv.saturation, _updatedHsv.value), _updatedHsv);
    };
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(SaturationPicker, { hue: hue, saturation: saturation, value: value, onChange: function (_saturationValue) {
                    _onSetColorFromHsv(__assign(__assign({}, hsvRef.current), _saturationValue));
                } }), jsxRuntime.jsxs("div", __assign({ className: cn(s$d.sliders_wrapper) }, { children: [jsxRuntime.jsx(EyeDropper$1, { onClick: _onEyeDropperClick }), jsxRuntime.jsxs("div", __assign({ className: cn(s$d.sliders) }, { children: [jsxRuntime.jsx(HueSlider, { hue: hue, onChange: function (updatedHue) {
                                    return _onSetColorFromHsv(__assign(__assign({}, hsvRef.current), { hue: updatedHue }));
                                }, className: s$d.hue_slider }), jsxRuntime.jsx(AlphaSlider, { alpha: alpha, hex: hex, onChange: onAlphaChange })] }))] })), jsxRuntime.jsx(InputFields, { hex: hex, rgb: rgb, alpha: alpha, setAlpha: onAlphaChange, setColor: _onSetColor, setColorFromRgb: _onSetColorFromRgb })] }));
};

var COLOR_TYPE;
(function (COLOR_TYPE) {
    COLOR_TYPE["SOLID"] = "SOLID";
    COLOR_TYPE["LINEAR"] = "LINEAR";
})(COLOR_TYPE || (COLOR_TYPE = {}));

var css_248z$3 = ".ColorTypeSelect-module_select_wrapper__HVYz1 {\n  height: 42px;\n  display: flex;\n  align-items: center;\n  padding-left: 16px;\n  padding-right: 16px;\n}\n\n.ColorTypeSelect-module_select__caD04 {\n  background-color: transparent;\n  outline: none;\n  border: none;\n  color: var(--color-gradient-picker-text-color);\n  font-size: var(--color-gradient-picker-base-font-size);\n  margin-left: 8px;\n}\n";
var s$3 = {"select_wrapper":"ColorTypeSelect-module_select_wrapper__HVYz1","select":"ColorTypeSelect-module_select__caD04"};
styleInject(css_248z$3);

var ColorTypeSelect = function (_a) {
    var value = _a.value, onChange = _a.onChange;
    return (jsxRuntime.jsxs("div", __assign({ className: s$3.select_wrapper }, { children: [jsxRuntime.jsx("svg", __assign({ width: "16", height: "14", viewBox: "0 0 16 14", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: jsxRuntime.jsx("path", { d: "M10.4294 0.714828H0.715123C0.636551 0.714828 0.572266 0.779114 0.572266 0.857686V3.1434C0.572266 3.22197 0.636551 3.28626 0.715123 3.28626H1.71512C1.79369 3.28626 1.85798 3.22197 1.85798 3.1434V2.00054H4.85798V12.0005H3.21512C3.13655 12.0005 3.07227 12.0648 3.07227 12.1434V13.1434C3.07227 13.222 3.13655 13.2863 3.21512 13.2863H7.92941C8.00798 13.2863 8.07227 13.222 8.07227 13.1434V12.1434C8.07227 12.0648 8.00798 12.0005 7.92941 12.0005H6.28655V2.00054H9.28655V3.1434C9.28655 3.22197 9.35084 3.28626 9.42941 3.28626H10.4294C10.508 3.28626 10.5723 3.22197 10.5723 3.1434V0.857686C10.5723 0.779114 10.508 0.714828 10.4294 0.714828ZM15.3008 10.4648H14.1437V3.53626H15.3008C15.408 3.53626 15.4687 3.41126 15.4026 3.32733L13.6026 1.04876C13.5907 1.03334 13.5754 1.02085 13.5579 1.01227C13.5404 1.00368 13.5212 0.999211 13.5017 0.999211C13.4822 0.999211 13.463 1.00368 13.4455 1.01227C13.428 1.02085 13.4128 1.03334 13.4008 1.04876L11.6008 3.32733C11.5858 3.34639 11.5765 3.3693 11.5739 3.39341C11.5714 3.41753 11.5756 3.44189 11.5862 3.4637C11.5969 3.4855 11.6134 3.50387 11.634 3.51671C11.6546 3.52954 11.6784 3.53632 11.7026 3.53626H12.858V10.4648H11.7008C11.5937 10.4648 11.533 10.5898 11.5991 10.6738L13.3991 12.9505C13.4508 13.0166 13.5508 13.0166 13.6008 12.9505L15.4008 10.6738C15.416 10.6549 15.4254 10.6321 15.4282 10.6081C15.431 10.584 15.4269 10.5597 15.4164 10.5379C15.406 10.5161 15.3896 10.4976 15.3692 10.4847C15.3487 10.4718 15.325 10.4649 15.3008 10.4648Z", fill: "white", fillOpacity: "0.3" }) })), jsxRuntime.jsxs("select", __assign({ className: s$3.select, value: value, onChange: function (e) {
                    onChange(e.target.value);
                }, style: { width: value === COLOR_TYPE.LINEAR ? 65 : 55 } }, { children: [jsxRuntime.jsx("option", __assign({ value: COLOR_TYPE.SOLID }, { children: "Solid" })), jsxRuntime.jsx("option", __assign({ value: COLOR_TYPE.LINEAR }, { children: "Linear" }))] }))] })));
};

var STOP_WIDTH = 14;
var HALF_STOP_WIDTH = STOP_WIDTH / 2;
var DEFAULT_STOP_REMOVAL_DROP = 50;
var DEFAULT_PALETTE_WIDTH = 258;
var DEFAULT_PALETTE_HEIGHT = 22;
var DEFAULT_MAX_STOPS = 5;
var DEFAULT_MIN_STOPS = 2;
var DEFAULT_PALETTE = [
    {
        id: 1,
        offset: 0,
        color: {
            red: 0,
            green: 0,
            blue: 0,
        },
        alpha: 100,
    },
    {
        id: 2,
        offset: 1.0,
        color: {
            red: 255,
            green: 255,
            blue: 255,
        },
        alpha: 100,
    },
];
var DEFAULT_DEGREE = 90;

var css_248z$2 = ".ColorStop-module_cs__E3PN4 {\n  position: absolute;\n  cursor: pointer;\n  height: 14px;\n  width: 14px;\n  top: 8px;\n  border-radius: 2px;\n  border: 2px solid #262626;\n  box-shadow: 0 0 6px #000;\n}\n\n.ColorStop-module_cs__E3PN4:hover {\n  border-color: #434343;\n}\n\n.ColorStop-module_cs__E3PN4::before {\n  content: \"\";\n  width: 0;\n  height: 0;\n  position: absolute;\n  top: -8px;\n  left: 2px;\n  border: 3px solid transparent;\n  border-bottom: 3px solid #262626;\n  box-sizing: border-box;\n}\n\n.ColorStop-module_cs__E3PN4:hover::before {\n  border-bottom-color: #434343;\n}\n\n.ColorStop-module_cs__E3PN4.ColorStop-module_active__jjC6- {\n  border: 2px solid #fafafa;\n}\n\n.ColorStop-module_cs__E3PN4.ColorStop-module_active__jjC6-::before {\n  border-bottom-color: #fafafa;\n}\n\n.ColorStop-module_cs__E3PN4::after {\n  content: \"\";\n  width: 2px;\n  height: 26px;\n  position: absolute;\n  border-radius: 2px;\n  background-color: #fafafa;\n  top: -34px;\n  left: 4px;\n  box-shadow: 0 0 6px #000;\n}\n";
var s$2 = {"cs":"ColorStop-module_cs__E3PN4","active":"ColorStop-module_active__jjC6-"};
styleInject(css_248z$2);

var EVENTS = {
    MOUSEDOWN: 'mousedown',
    MOUSEMOVE: 'mousemove',
    MOUSEUP: 'mouseup',
    TOUCHSTART: 'touchstart',
    TOUCHMOVE: 'touchmove',
    TOUCHEND: 'touchend'
};

// TODO check tsc
var DRAG_HANDLERS = {
    MOUSE: {
        stop: function (e) {
            e.stopPropagation();
        },
        coordinates: function (_a) {
            var clientX = _a.clientX, clientY = _a.clientY;
            return ({
                clientX: clientX,
                clientY: clientY,
            });
        },
        dragEvent: { name: EVENTS.MOUSEMOVE },
        dragEndEvent: { name: EVENTS.MOUSEUP },
    },
    TOUCH: {
        stop: noop,
        coordinates: function (e) {
            var touch = e.touches[0];
            return {
                clientX: touch.clientX,
                clientY: touch.clientY,
            };
        },
        dragEvent: {
            name: EVENTS.TOUCHMOVE,
            options: {
                cancelable: true,
                passive: true,
            },
        },
        dragEndEvent: { name: EVENTS.TOUCHEND },
    },
};
var isTouch = function (e) { return e.type === EVENTS.TOUCHSTART; };
var useDragging = function (_a) {
    var onDragStart = _a.onDragStart, onDrag = _a.onDrag, onDragEnd = _a.onDragEnd;
    var _b = react.useState(false), dragging = _b[0], setDragging = _b[1];
    var dragContext = react.useRef({});
    // ------------------------------------------------------------------------------------------
    var activateEvent = function (e, handler) {
        setDragging(true);
        dragContext.current.handler = handler;
        onDragStart(handler.coordinates(e));
    };
    var deactivateEvent = function () {
        setDragging(false);
        onDragEnd(dragContext.current.change);
        dragContext.current = {};
    };
    var dragHandler = function (e) {
        var handler = isTouch(e) ? DRAG_HANDLERS.TOUCH : DRAG_HANDLERS.MOUSE;
        handler.stop(e);
        activateEvent(e, handler);
    };
    var handleDrag = function (e) {
        var handler = dragContext.current.handler;
        if (!dragging)
            return;
        dragContext.current.change = onDrag(handler.coordinates(e));
    };
    react.useEffect(function () {
        var handler = dragContext.current.handler;
        if (!handler)
            return;
        var dragEvent = handler.dragEvent, dragEndEvent = handler.dragEndEvent;
        if (dragging) {
            document.addEventListener(dragEvent.name, handleDrag, dragEndEvent.options);
            document.addEventListener(dragEndEvent.name, deactivateEvent);
        }
        return function () {
            document.removeEventListener(dragEvent.name, handleDrag, dragEndEvent.options);
            document.removeEventListener(dragEndEvent.name, deactivateEvent);
        };
    }, [dragging]);
    return [dragHandler, activateEvent, deactivateEvent];
};

/**
 * Limits a client drag movement within given min / max
 */
var limitPos = function (offset, min, max) {
    return Math.max(Math.min(offset, max), min);
};
var getColorStopRefTop = function (ref) {
    if (!ref.current)
        return 0;
    return ref.current.getBoundingClientRect().top;
};
var useStopDragging = function (_a) {
    var limits = _a.limits, stop = _a.stop, colorStopRef = _a.colorStopRef, onPosChange = _a.onPosChange, onDragStart = _a.onDragStart, onDragEnd = _a.onDragEnd, onDeleteColor = _a.onDeleteColor;
    var _b = react.useState(0), posStart = _b[0], setPosStart = _b[1];
    var handleDrag = function (_a) {
        var clientX = _a.clientX, clientY = _a.clientY;
        var id = stop.id, offset = stop.offset;
        var min = limits.min, max = limits.max;
        // Removing if out of drop limit on Y axis.
        var top = getColorStopRefTop(colorStopRef);
        if (Math.abs(clientY - top) > (limits.drop || DEFAULT_STOP_REMOVAL_DROP)) {
            // deactivateEvent();
            return onDeleteColor(id);
        }
        // Limit movements
        var dragOffset = offset - posStart;
        var limitedPos = limitPos(dragOffset + clientX, min, max);
        onPosChange(id, limitedPos);
    };
    var drag = useDragging({
        onDragStart: function (_a) {
            var clientX = _a.clientX;
            setPosStart(clientX);
            onDragStart(stop.id);
        },
        onDrag: handleDrag,
        onDragEnd: function () { return onDragEnd(stop.id); },
    })[0];
    return [drag];
};

var ColorStop = function (props) {
    var stop = props.stop, limits = props.limits, onPosChange = props.onPosChange, onDeleteColor = props.onDeleteColor, _a = props.onDragStart, onDragStart = _a === void 0 ? noop : _a, _b = props.onDragEnd, onDragEnd = _b === void 0 ? noop : _b;
    var colorStopRef = react.useRef(null);
    var drag = useStopDragging({
        stop: stop,
        limits: limits,
        onPosChange: onPosChange,
        onDragStart: onDragStart,
        onDragEnd: onDragEnd,
        onDeleteColor: onDeleteColor,
        colorStopRef: colorStopRef,
    })[0];
    var offset = stop.offset, color = stop.color, isActive = stop.isActive, alpha = stop.alpha, id = stop.id;
    react.useEffect(function () {
        if (typeof document === "undefined")
            return function () { return undefined; };
        var handler = function (e) {
            if ((e.key === "Delete" || e.key === "Backspace") && isActive) {
                onDeleteColor(id);
            }
        };
        document.addEventListener("keydown", handler);
        return function () {
            document.removeEventListener("keydown", handler);
        };
        // do not check onDelete
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, id]);
    var rgba = "rgba(".concat(color.red, ", ").concat(color.green, ", ").concat(color.blue, ", ").concat(alpha, ")");
    return (jsxRuntime.jsx("div", { className: cn(s$2.cs, isActive && s$2.active), ref: colorStopRef, style: {
            left: offset,
            backgroundColor: rgba,
            opacity: alpha,
        }, 
        // TODO check tsc
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onMouseDown: drag, 
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onTouchStart: drag, title: rgba, tabIndex: 0 }));
};

var ColorStopsHolder = function (props) {
    var stops = props.stops, rest = __rest(props, ["stops"]);
    return (jsxRuntime.jsx("div", __assign({ style: {
            width: DEFAULT_PALETTE_WIDTH,
            height: 22,
            position: "relative",
        } }, { children: stops.map(function (stop) { return (jsxRuntime.jsx(ColorStop, __assign({ stop: stop }, rest), stop.id)); }) })));
};

var Palette = function (props) {
    var palette = props.palette, degree = props.degree, onAddColor = props.onAddColor, disabled = props.disabled;
    // ------------------------------------------------------------------------------------------
    var linearGradientColors = getLinearGradientBackgroundCss({
        palette: palette,
        degree: degree,
    });
    // ------------------------------------------------------------------------------------------
    var handleColorAdd = function (e) {
        e.preventDefault();
        if (e.button)
            return;
        var offset = e.clientX - e.target.getBoundingClientRect().left;
        onAddColor(offset);
    };
    return (jsxRuntime.jsx("div", { style: {
            width: DEFAULT_PALETTE_WIDTH,
            height: DEFAULT_PALETTE_HEIGHT,
            marginTop: 8,
            backgroundImage: linearGradientColors,
            cursor: disabled ? "default" : "copy",
        }, onMouseDown: handleColorAdd }));
};

var css_248z$1 = ".GradientPicker-module_gp_wrap__dDiMf {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  border-top: 1px solid #303030;\n  padding-top: 8px;\n  padding-bottom: 16px;\n}\n";
var s$1 = {"gp_wrap":"GradientPicker-module_gp_wrap__dDiMf"};
styleInject(css_248z$1);

// ------------------------------------------------------------------------------------------
var nextColorId = function (palette) {
    return Math.max.apply(Math, palette.map(function (_a) {
        var id = _a.id;
        return id;
    })) + 1;
};
var mapIdToPalette = function (palette) {
    return palette.map(function (color, index) { return (__assign(__assign({}, color), { id: color.id || index + 1 })); });
};
var mapPaletteToStops = function (_a) {
    var palette = _a.palette, activeId = _a.activeId;
    return palette.map(function (color) {
        return __assign(__assign({}, color), { id: color.id, offset: DEFAULT_PALETTE_WIDTH * Number(color.offset) - HALF_STOP_WIDTH, isActive: color.id === activeId });
    });
};
var getPaletteColor = function (_palette, _id) {
    var color = _palette.find(function (_color) { return _color.id === _id; }) || _palette[0];
    return __assign(__assign({}, color), { offset: Number(color.offset) });
};
// ------------------------------------------------------------------------------------------
var GradientPicker = function (props) {
    var gradient = props.gradient, onLinearGradientChange = props.onLinearGradientChange, _a = props.stopRemovalDrop, stopRemovalDrop = _a === void 0 ? DEFAULT_STOP_REMOVAL_DROP : _a, _b = props.minStops, minStops = _b === void 0 ? DEFAULT_MIN_STOPS : _b, _c = props.maxStops, maxStops = _c === void 0 ? DEFAULT_MAX_STOPS : _c;
    var paletteProp = gradient.palette, degree = gradient.degree;
    var palette = mapIdToPalette(paletteProp);
    // ------------------------------------------------------------------------------------------
    var defaultActiveColor = palette[0];
    var _d = react.useState(defaultActiveColor.id), activeColorId = _d[0], setActiveColorId = _d[1];
    // ------------------------------------------------------------------------------------------
    var limits = react.useMemo(function () {
        var min = -HALF_STOP_WIDTH;
        var max = DEFAULT_PALETTE_WIDTH - HALF_STOP_WIDTH;
        return {
            min: min,
            max: max,
            drop: stopRemovalDrop,
        };
    }, [stopRemovalDrop]);
    // ------------------------------------------------------------------------------------------
    var onStopDragStart = function (id) {
        if (id !== activeColorId) {
            setActiveColorId(id);
        }
    };
    var handleGradientChange = function (_palette, _degree) {
        var sortedPalette = sortPalette(_palette).map(function (_a) {
            var offset = _a.offset, id = _a.id, rest = __rest(_a, ["offset", "id"]);
            return (__assign(__assign({}, rest), { id: id, offset: offset, active: id === activeColorId }));
        });
        onLinearGradientChange({
            degree: _degree,
            palette: sortedPalette,
        });
    };
    var handleColorAdd = function (offset) {
        if (palette.length >= maxStops)
            return;
        var color = getPaletteColor(palette, activeColorId).color;
        var newStop = {
            id: nextColorId(palette),
            offset: offset / DEFAULT_PALETTE_WIDTH,
            color: color,
            alpha: ALPHA_VALUE.MAX,
        };
        var updatedPalette = __spreadArray(__spreadArray([], palette, true), [newStop], false);
        setActiveColorId(newStop.id);
        handleGradientChange(updatedPalette, degree);
    };
    var handleColorDelete = function (id) {
        if (palette.length <= minStops)
            return;
        var updatedPalette = palette.filter(function (c) { return c.id !== id; });
        var activeId = updatedPalette.reduce(function (a, x) { return (x.offset < a.offset ? x : a); }, updatedPalette[0]).id;
        setActiveColorId(activeId);
        handleGradientChange(updatedPalette, degree);
    };
    var handleStopPosChange = function (id, offset) {
        var updatedPalette = palette.map(function (_palette) {
            return id === _palette.id
                ? __assign(__assign({}, _palette), { offset: (offset + HALF_STOP_WIDTH) / DEFAULT_PALETTE_WIDTH }) : _palette;
        });
        handleGradientChange(updatedPalette, degree);
    };
    var handleDegreeChange = function (_degree) {
        handleGradientChange(paletteProp, _degree);
    };
    var handleStopAlphaChange = function (_alpha) {
        var updatedPalette = palette.map(function (_palette) {
            return activeColorId === _palette.id
                ? __assign(__assign({}, _palette), { alpha: _alpha }) : _palette;
        });
        handleGradientChange(updatedPalette, degree);
    };
    var handleStopColorChange = function (_updateHex) {
        var updatedPalette = palette.map(function (_palette) {
            return activeColorId === _palette.id
                ? __assign(__assign({}, _palette), { color: hexToRgb(_updateHex) }) : _palette;
        });
        handleGradientChange(updatedPalette, degree);
    };
    // ------------------------------------------------------------------------------------------
    var stopsHolderDisabled = palette.length >= maxStops;
    var activeColor = palette.find(function (item) { return item.id === activeColorId; });
    var alpha = (activeColor === null || activeColor === void 0 ? void 0 : activeColor.alpha) || ALPHA_VALUE.MAX;
    var _e = (activeColor === null || activeColor === void 0 ? void 0 : activeColor.color) || {
        red: 0,
        green: 0,
        blue: 0,
    }, red = _e.red, green = _e.green, blue = _e.blue;
    // ------------------------------------------------------------------------------------------
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("div", __assign({ className: s$1.gp_wrap }, { children: [jsxRuntime.jsx(Input.Degree, { onChange: handleDegreeChange, value: degree }), jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx(Palette, { onAddColor: handleColorAdd, degree: degree, palette: palette, disabled: stopsHolderDisabled }), jsxRuntime.jsx(ColorStopsHolder, { stops: mapPaletteToStops({
                                    palette: palette,
                                    activeId: activeColorId,
                                }), limits: limits, onPosChange: handleStopPosChange, onDeleteColor: handleColorDelete, onDragStart: onStopDragStart, onDragEnd: noop })] })] })), jsxRuntime.jsx(ColorPicker, { hex: rgbToHex(red, green, blue), alpha: alpha, onAlphaChange: handleStopAlphaChange, onColorChange: handleStopColorChange })] }));
};

var css_248z = ".UserInput-module_input_vertical_divider__hDZqV {\n  border-left: 1px solid #262626;\n  width: 1px;\n  height: 100%;\n}\n";
var s = {"input_vertical_divider":"UserInput-module_input_vertical_divider__hDZqV"};
styleInject(css_248z);

var UserInput = function (props) {
    var color = props.color, onSolidColorChange = props.onSolidColorChange, onAlphaChange = props.onAlphaChange, hasAlphaInput = props.hasAlphaInput, _a = props.inputWidth, inputWidth = _a === void 0 ? 80 : _a, rest = __rest(props, ["color", "onSolidColorChange", "onAlphaChange", "hasAlphaInput", "inputWidth"]);
    var type = color.type, _b = color.solid, solid = _b === void 0 ? DEFAULT_HEX : _b, _c = color.alpha, alpha = _c === void 0 ? ALPHA_VALUE.MAX : _c, gradient = color.gradient;
    var alphaInput = hasAlphaInput ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("div", { className: s.input_vertical_divider }), jsxRuntime.jsx(Input.Alpha, __assign({}, rest, { isExtraComponent: true, value: alpha, onChange: onAlphaChange, inputWidth: 45 }))] })) : undefined;
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [type === COLOR_TYPE.SOLID && (jsxRuntime.jsx(Input.Hex, __assign({}, rest, { inputWidth: inputWidth, value: solid, onChange: onSolidColorChange, extraInput: alphaInput }))), type === COLOR_TYPE.LINEAR && (jsxRuntime.jsx(Input.Gradient, __assign({}, rest, { inputWidth: inputWidth, value: gradient })))] }));
};

var DEFAULT_CLASS_NAME = "cgp";

var useCloseWhenClickOutside = function (containerRef, callback) {
    react.useEffect(function () {
        if (typeof document === "undefined")
            return function () { return undefined; };
        var handler = function (e) {
            var _a;
            if (!((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target))) {
                callback();
            }
        };
        document.addEventListener("click", handler);
        document.addEventListener("touchstart", handler);
        return function () {
            document.removeEventListener("click", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [callback, containerRef]);
};

var useCloseWhenPressEcs = function (callback) {
    react.useEffect(function () {
        if (typeof document === "undefined")
            return function () { return undefined; };
        var handler = function (e) {
            var _a;
            if (e.key === "Escape") {
                callback();
                (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur();
            }
        };
        document.addEventListener("keydown", handler);
        return function () {
            document.removeEventListener("keydown", handler);
        };
    }, [callback]);
};

function ColorGradientPicker(props) {
    // ------------------------------------------------------------------------------------------
    var _a = props.classNamePrefix, classNamePrefix = _a === void 0 ? DEFAULT_CLASS_NAME : _a, className = props.className, color = props.color, onChange = props.onChange, onInputFocus = props.onInputFocus, rest = __rest(props, ["classNamePrefix", "className", "color", "onChange", "onInputFocus"]);
    // ------------------------------------------------------------------------------------------
    var solidColor = sanitizeHex((color === null || color === void 0 ? void 0 : color.solid) || DEFAULT_HEX);
    var totalAlpha = (color === null || color === void 0 ? void 0 : color.alpha) || ALPHA_VALUE.MAX;
    var linearGradient = (color === null || color === void 0 ? void 0 : color.gradient) || {
        degree: DEFAULT_DEGREE,
        palette: DEFAULT_PALETTE,
    };
    var propColorType = (color === null || color === void 0 ? void 0 : color.type) || COLOR_TYPE.SOLID;
    // ------------------------------------------------------------------------------------------
    var _b = react.useState(false), isOpenPicker = _b[0], setOpenPicker = _b[1];
    var containerRef = react.useRef(null);
    // ------------------------------------------------------------------------------------------
    var handleInputFocus = function (e) {
        setOpenPicker(true);
        if (typeof onInputFocus === "function")
            onInputFocus(e);
    };
    var onHidePicker = react.useCallback(function () {
        setOpenPicker(false);
    }, []);
    // ------------------------------------------------------------------------------------------
    useCloseWhenClickOutside(containerRef, onHidePicker);
    useCloseWhenPressEcs(onHidePicker);
    // ------------------------------------------------------------------------------------------
    var handleSolidColorChange = function (_updatedHex) {
        onChange(__assign(__assign({}, color), { solid: _updatedHex }));
    };
    var handleTotalAlphaChange = function (_alpha) {
        onChange(__assign(__assign({}, color), { alpha: _alpha }));
    };
    var handleSetColorType = function (_type) {
        onChange(__assign(__assign({}, color), { type: _type }));
    };
    var handleLinearGradientChange = function (_gradient) {
        onChange(__assign(__assign({}, color), { gradient: _gradient }));
    };
    // ------------------------------------------------------------------------------------------
    return (jsxRuntime.jsxs("div", __assign({ ref: containerRef, className: cn(s$e.wrapper, classNamePrefix, className) }, { children: [jsxRuntime.jsx(UserInput, __assign({}, rest, { onSolidColorChange: handleSolidColorChange, onAlphaChange: handleTotalAlphaChange, color: color, onInputFocus: handleInputFocus })), isOpenPicker && (jsxRuntime.jsxs("div", __assign({ className: s$e.picking_panel }, { children: [jsxRuntime.jsx(ColorTypeSelect, { value: propColorType, onChange: handleSetColorType }), propColorType === COLOR_TYPE.LINEAR && (jsxRuntime.jsx(GradientPicker, { gradient: linearGradient, onLinearGradientChange: handleLinearGradientChange })), propColorType === COLOR_TYPE.SOLID && (jsxRuntime.jsx(ColorPicker, { hex: solidColor, alpha: totalAlpha, onAlphaChange: handleTotalAlphaChange, onColorChange: handleSolidColorChange }))] })))] })));
}

exports.ColorGradientPicker = ColorGradientPicker;
exports.ColorPicker = ColorPicker;
exports.GradientPicker = GradientPicker;
exports["default"] = ColorGradientPicker;

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

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
    const percentage = x / width;
    const hue = Math.max(Math.min(percentage, 1), 0) * 360;
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
    const percentage = x / width;
    const alpha = Math.max(Math.min(percentage, 1), 0) * 100;
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
    const percentageX = !width ? 0 : x / width;
    const percentageY = !height ? 0 : 1 - y / height;
    const saturation = Math.max(Math.min(percentageX, 1), 0);
    const value = Math.max(Math.min(percentageY, 1), 0);
    return {
        saturation,
        value,
    };
}
/**
 * Get the color from EyeDropper API
 * @returns {string} Hex color
 */
const openNativeEyeDropper = async () => {
    const abortController = new AbortController();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore this is new EyeDropper API
    const eyeDropper = new EyeDropper();
    try {
        const result = await eyeDropper.open({ signal: abortController.signal });
        return result.sRGBHex;
    }
    catch (e) {
        return null;
    }
};

/**
 * Converts a hex color string to its red, green, and blue component values
 * @param {string} colorHex The color value in hex format
 * @returns {Rgb} The RGB values for the color
 */
function hexToRgb(colorHex) {
    let sanitizedHex = colorHex.replace(/[^a-fA-F0-9]/g, "");
    if (sanitizedHex.length !== 6 && sanitizedHex.length !== 3) {
        throw new Error(`Color should be either 3 or 6 characters in length - received a length of ${sanitizedHex.length}`);
    }
    if (sanitizedHex.length === 3) {
        sanitizedHex = `${sanitizedHex[0].repeat(2)}${sanitizedHex[1].repeat(2)}${sanitizedHex[2].repeat(2)}`;
    }
    const rgb = parseInt(sanitizedHex, 16);
    if (Number.isNaN(rgb)) {
        throw new Error(`Unable to parse hex color ${colorHex}`);
    }
    const red = (rgb >> 16) & 0xff;
    const green = (rgb >> 8) & 0xff;
    const blue = rgb & 0xff;
    return {
        red,
        green,
        blue,
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
    const redPercent = red / 255;
    const greenPercent = green / 255;
    const bluePercent = blue / 255;
    const max = Math.max(redPercent, greenPercent, bluePercent);
    const min = Math.min(redPercent, greenPercent, bluePercent);
    const diff = max - min;
    let hue = 0;
    const saturation = (max === 0) ? 0 : diff / max;
    const value = max;
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
        hue,
        saturation,
        value,
    };
}

/**
 * Converts a hex color string to its hue, saturation, and value
 * @param {string} colorHex The color value in hex format
 * @returns {Hsv} The HSV values for the color
 */
function hexToHsv(colorHex) {
    // Hex validation handled by hexToRgb
    const { red, green, blue } = hexToRgb(colorHex);
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
    let red = 0;
    let green = 0;
    let blue = 0;
    const huePercent = hue / 360;
    const i = Math.floor(huePercent * 6);
    const f = huePercent * 6 - i;
    const p = value * (1 - saturation);
    const q = value * (1 - f * saturation);
    const t = value * (1 - (1 - f) * saturation);
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
        red,
        green,
        blue,
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
    const rgb = blue | (green << 8) | (red << 16);
    return `#${(0x1000000 + rgb).toString(16).slice(1)}`;
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
    const { red, green, blue, } = hsvToRgb(hue, saturation, value);
    return rgbToHex(red, green, blue);
}

var css_248z$d = ".ColorPicker-module_sliders_wrapper__AbyWM {\n  display: flex;\n  padding: 10px 16px 16px 8px;\n  align-items: flex-start;\n}\n\n.ColorPicker-module_sliders__-QKql {\n  flex-grow: 1;\n  padding-top: 8px;\n}\n\n.ColorPicker-module_hue_slider__QnXGF {\n  margin-bottom: 16px;\n}\n";
var s$d = {"sliders_wrapper":"ColorPicker-module_sliders_wrapper__AbyWM","sliders":"ColorPicker-module_sliders__-QKql","hue_slider":"ColorPicker-module_hue_slider__QnXGF"};
styleInject(css_248z$d);

var css_248z$c = ".AlphaSlider-module_alpha_slider__wK9WL {\n  position: relative;\n  height: calc(var(--color-gradient-picker-value-picker-width) - 4px);\n  border-radius: calc(\n    (var(--color-gradient-picker-value-picker-width) - 4px) / 2\n  );\n\n  background-color: #7e7e84;\n  background-image: linear-gradient(\n      45deg,\n      #4c4c52 25%,\n      transparent 25%,\n      transparent 75%,\n      #4c4c52 75%,\n      #4c4c52\n    ),\n    linear-gradient(\n      45deg,\n      #4c4c52 25%,\n      transparent 25%,\n      transparent 75%,\n      #4c4c52 75%,\n      #4c4c52\n    );\n  background-position: 0 0,\n    calc((var(--color-gradient-picker-value-picker-width) - 4px) / 2)\n      calc((var(--color-gradient-picker-value-picker-width) - 4px) / 2);\n  background-size: calc(var(--color-gradient-picker-value-picker-width) - 4px)\n      calc(var(--color-gradient-picker-value-picker-width) - 4px),\n    calc(var(--color-gradient-picker-value-picker-width) - 4px)\n      calc(var(--color-gradient-picker-value-picker-width) - 4px);\n  background-repeat: repeat, repeat;\n}\n\n.AlphaSlider-module_alpha_slider_picker__O84g1 {\n  position: absolute;\n  top: calc(0px - var(--color-gradient-picker-value-picker-border));\n  left: 0;\n  width: var(--color-gradient-picker-value-picker-width);\n  height: var(--color-gradient-picker-value-picker-width);\n  border: var(--color-gradient-picker-value-picker-border) solid #ffffff;\n  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);\n  background-color: #ff0000;\n  border-radius: 55%;\n  cursor: pointer;\n  transform: translateX(-50%);\n}\n\n.AlphaSlider-module_alpha_slider_bg__WGtCU {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  border-radius: calc(\n    (var(--color-gradient-picker-value-picker-width) - 4px) / 2\n  );\n}\n";
var s$c = {"alpha_slider":"AlphaSlider-module_alpha_slider__wK9WL","alpha_slider_picker":"AlphaSlider-module_alpha_slider_picker__O84g1","alpha_slider_bg":"AlphaSlider-module_alpha_slider_bg__WGtCU"};
styleInject(css_248z$c);

const AlphaSlider = (props) => {
    // ------------------------------------------------------------------------------------------
    const { alpha, onChange, hex, className } = props;
    // ------------------------------------------------------------------------------------------
    const [isInteracting, setIsInteracting] = react.useState(false);
    const sliderDivRef = react.useRef(null);
    // ------------------------------------------------------------------------------------------
    const updateAlpha = react.useCallback((evt) => {
        if (!sliderDivRef.current) {
            return;
        }
        const alphaPosition = sliderDivRef.current.getBoundingClientRect();
        const x = evt.clientX - alphaPosition.left;
        const updatedAlpha = getAlphaFromPosition(x, sliderDivRef.current.clientWidth);
        onChange(updatedAlpha);
    }, [onChange]);
    const onPointerDown = react.useCallback((evt) => {
        evt.target.setPointerCapture(evt.pointerId);
        setIsInteracting(true);
        updateAlpha(evt);
    }, [updateAlpha]);
    const onPointerUp = react.useCallback((evt) => {
        evt.target.releasePointerCapture(evt.pointerId);
        setIsInteracting(false);
    }, []);
    const onMouseDown = react.useCallback((evt) => {
        setIsInteracting(true);
        updateAlpha(evt);
    }, [updateAlpha]);
    const onMove = react.useCallback((evt) => {
        if (isInteracting) {
            updateAlpha(evt);
        }
    }, [isInteracting, updateAlpha]);
    const onMouseUp = react.useCallback(() => {
        setIsInteracting(false);
    }, []);
    // Setup pointer events for supported browsers for two reasons:
    //   1. It allows for pointer capture which allows for continued
    //      interaction even when the cursor/pointer outside of picker
    //   2. It allows for unified code across devices (mobile and desktop)
    const interactionCallbacks = window.PointerEvent
        ? {
            onPointerDown,
            onPointerMove: onMove,
            onPointerUp,
        }
        : {
            onMouseDown,
            onMouseMove: onMove,
            onMouseUp,
        };
    const sliderStyle = {
        left: `${alpha}%`,
        backgroundColor: hex,
    };
    const { red, green, blue } = hexToRgb(hex);
    const alphaStyle = {
        background: `linear-gradient(to right, rgba(${red}, ${green}, ${blue}, 0) 0%, ${hex} 100%)`,
    };
    return (jsxRuntime.jsxs("div", { className: cn(s$c.alpha_slider, className), ref: sliderDivRef, title: "Alpha", ...interactionCallbacks, children: [jsxRuntime.jsx("div", { className: s$c.alpha_slider_bg, style: alphaStyle }), jsxRuntime.jsx("div", { className: cn(s$c.alpha_slider_picker), style: sliderStyle })] }));
};

const EyeDropper$1 = ({ onClick }) => {
    return (jsxRuntime.jsx("button", { style: {
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
            padding: "6px 12px 8px 6px",
            flexShrink: 0,
        }, onClick: onClick, children: jsxRuntime.jsx("svg", { width: "12", height: "13", viewBox: "0 0 12 13", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntime.jsx("path", { d: "M2.61333 11.6667L1.33333 10.3867L6.70667 5.00002L8 6.29335L2.61333 11.6667ZM11.8067 2.75335L10.2467 1.19335C10 0.933352 9.56667 0.933352 9.30667 1.19335L7.22667 3.27335L5.94 2.00002L5 2.94002L5.94667 3.88669L0 9.83335V13H3.16667L9.11333 7.05335L10.06 8.00002L11 7.06002L9.72 5.78002L11.8 3.70002C12.0667 3.43335 12.0667 3.00002 11.8067 2.75335Z", fill: "white", fillOpacity: "0.3" }) }) }));
};

var css_248z$b = ".HueSlider-module_hue_slider__A0Iu0 {\n  position: relative;\n  height: calc(var(--color-gradient-picker-value-picker-width) - 4px);\n  border-radius: calc(\n    (var(--color-gradient-picker-value-picker-width) - 4px) / 2\n  );\n\n  background-image: linear-gradient(\n    to left,\n    #ff0000 0%,\n    #ff00ff 16.66%,\n    #0000ff 33.33%,\n    #00ffff 50%,\n    #00ff00 66.66%,\n    #ffff00 80.33%,\n    #ff0000 100%\n  );\n}\n\n.HueSlider-module_hue_slider_picker__igszs {\n  position: absolute;\n  top: calc(0px - var(--color-gradient-picker-value-picker-border));\n  left: 0;\n  width: var(--color-gradient-picker-value-picker-width);\n  height: var(--color-gradient-picker-value-picker-width);\n  border: var(--color-gradient-picker-value-picker-border) solid #ffffff;\n  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);\n  background-color: #ff0000;\n  border-radius: 55%;\n  cursor: pointer;\n  transform: translateX(-50%);\n}\n";
var s$b = {"hue_slider":"HueSlider-module_hue_slider__A0Iu0","hue_slider_picker":"HueSlider-module_hue_slider_picker__igszs"};
styleInject(css_248z$b);

const HueSlider = (props) => {
    // ------------------------------------------------------------------------------------------
    const { hue, onChange, className } = props;
    // ------------------------------------------------------------------------------------------
    const [isInteracting, setIsInteracting] = react.useState(false);
    const sliderDivRef = react.useRef(null);
    const hueColor = hsvToHex(hue, 1, 1);
    // ------------------------------------------------------------------------------------------
    const updateHue = react.useCallback((evt) => {
        if (!sliderDivRef.current) {
            return;
        }
        const huePosition = sliderDivRef.current.getBoundingClientRect();
        const x = evt.clientX - huePosition.left;
        const updatedHue = getHueFromPosition(x, sliderDivRef.current.clientWidth);
        onChange(updatedHue);
    }, [onChange]);
    const onPointerDown = react.useCallback((evt) => {
        evt.target.setPointerCapture(evt.pointerId);
        setIsInteracting(true);
        updateHue(evt);
    }, [updateHue]);
    const onPointerUp = react.useCallback((evt) => {
        evt.target.releasePointerCapture(evt.pointerId);
        setIsInteracting(false);
    }, []);
    const onMouseDown = react.useCallback((evt) => {
        setIsInteracting(true);
        updateHue(evt);
    }, [updateHue]);
    const onMove = react.useCallback((evt) => {
        if (isInteracting) {
            updateHue(evt);
        }
    }, [isInteracting, updateHue]);
    const onMouseUp = react.useCallback(() => {
        setIsInteracting(false);
    }, []);
    // Setup pointer events for supported browsers for two reasons:
    //   1. It allows for pointer capture which allows for continued
    //      interaction even when the cursor/pointer outside of picker
    //   2. It allows for unified code across devices (mobile and desktop)
    const interactionCallbacks = window.PointerEvent
        ? {
            onPointerDown,
            onPointerMove: onMove,
            onPointerUp,
        }
        : {
            onMouseDown,
            onMouseMove: onMove,
            onMouseUp,
        };
    const sliderStyle = {
        left: `${(hue / 360) * 100}%`,
        backgroundColor: hueColor,
    };
    return (jsxRuntime.jsx("div", { className: cn(s$b.hue_slider, className), ref: sliderDivRef, title: "Hue", ...interactionCallbacks, children: jsxRuntime.jsx("div", { className: cn(s$b.hue_slider_picker), style: sliderStyle }) }));
};

const KEYS = {
    ENTER: "Enter",
};
const ALPHA_VALUE = {
    MAX: 100,
    MIN: 0,
};
const RGB_VALUE = {
    MAX: 255,
    MIN: 0,
};
const DEGREE_VALUE = {
    MAX: 360,
    MIN: 0,
};
const DEFAULT_HEX = "#000";

var css_248z$a = ".Input-Alpha-module_alpha_info__4qWzi {\n  width: 16px;\n  height: 16px;\n  border-radius: 1px;\n  border: 2px solid #7e7e84;\n\n  background-color: #1f1f1f;\n  background-image: linear-gradient(\n      45deg,\n      #7e7e84 25%,\n      transparent 25%,\n      transparent 75%,\n      #7e7e84 75%,\n      #7e7e84\n    ),\n    linear-gradient(\n      45deg,\n      #7e7e84 25%,\n      transparent 25%,\n      transparent 75%,\n      #7e7e84 75%,\n      #7e7e84\n    );\n  background-position: 0 0, 4px 4px;\n  background-size: 8px 8px, 8px 8px;\n  background-repeat: repeat, repeat;\n}\n\n.Input-Alpha-module_alpha_input__ibsbE {\n  margin-right: 2px;\n}\n";
var s$a = {"alpha_info":"Input-Alpha-module_alpha_info__4qWzi","alpha_input":"Input-Alpha-module_alpha_input__ibsbE"};
styleInject(css_248z$a);

function InputAlphaInfo() {
    return jsxRuntime.jsx("div", { className: s$a.alpha_info });
}
const ALPHA_SYMBOL = "%";
const getAlphaString = (alpha) => `${alpha}${ALPHA_SYMBOL}`;
function Alpha(props) {
    const { value, onChange, onInputBlur, ...rest } = props;
    const [valueState, setValueState] = react.useState(getAlphaString(value));
    // -----------------------------------------------------------------------
    react.useEffect(() => {
        setValueState(getAlphaString(value));
    }, [value]);
    // -----------------------------------------------------------------------
    const _onInternalChange = (e) => {
        let _value = parseInt(e.currentTarget.value.replace(ALPHA_SYMBOL, ""));
        _value = Math.round(_value);
        if (_value < ALPHA_VALUE.MIN)
            _value = ALPHA_VALUE.MIN;
        if (_value > ALPHA_VALUE.MAX)
            _value = ALPHA_VALUE.MAX;
        if (isNaN(_value))
            _value = ALPHA_VALUE.MIN;
        setValueState(getAlphaString(_value));
    };
    const _onOutsideChange = () => {
        // remove % if the valueState has it
        const _valueState = parseInt((valueState?.toString() || ALPHA_VALUE.MAX.toString())?.replace(ALPHA_SYMBOL, ""));
        onChange(_valueState);
        setValueState(getAlphaString(_valueState));
    };
    const _onKeyDown = (e) => {
        e.stopPropagation();
        if (e.key === KEYS.ENTER)
            _onOutsideChange();
    };
    const _onBlur = (e) => {
        _onOutsideChange();
        if (typeof onInputBlur === "function")
            onInputBlur(e);
    };
    // -----------------------------------------------------------------------
    return (jsxRuntime.jsx(Input, { ...rest, info: jsxRuntime.jsx(InputAlphaInfo, {}), onChange: _onInternalChange, onKeyDown: _onKeyDown, onInputBlur: _onBlur, value: valueState, inputClassName: s$a.alpha_input }));
}

const DEGREE_SYMBOL = "°";
function DegreeInfo() {
    return (jsxRuntime.jsx("svg", { width: "14", height: "14", viewBox: "0 0 14 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", style: {
            position: "relative",
            top: 2,
        }, children: jsxRuntime.jsx("path", { d: "M6.99062 0.937567C3.53906 0.942254 0.75 3.73444 0.75 7.186C0.75 9.186 1.69062 10.9673 3.15312 12.111L2.56719 12.861C2.50313 12.9438 2.5625 13.0641 2.66563 13.0626L5.275 13.0501C5.35625 13.0501 5.41562 12.9735 5.39531 12.8954L4.77812 10.3594C4.77255 10.3366 4.76064 10.3158 4.74376 10.2994C4.72688 10.283 4.70571 10.2717 4.6827 10.2668C4.65968 10.2619 4.63575 10.2636 4.61366 10.2717C4.59157 10.2798 4.57221 10.294 4.55781 10.3126L3.92188 11.1266C3.7625 11.0016 3.60938 10.8657 3.46406 10.7204C3.00722 10.2651 2.64318 9.72543 2.39219 9.13132C2.13125 8.51569 2 7.861 2 7.186C2 6.511 2.13125 5.85632 2.39219 5.24069C2.64375 4.64538 3.00469 4.111 3.46406 3.65163C3.92344 3.19225 4.45781 2.83132 5.05312 2.57975C5.67031 2.31882 6.325 2.18757 7 2.18757C7.675 2.18757 8.32969 2.31882 8.94531 2.57975C9.54062 2.83132 10.075 3.19225 10.5344 3.65163C10.9938 4.111 11.3547 4.64538 11.6062 5.24069C11.8672 5.85632 11.9984 6.511 11.9984 7.186C11.9984 7.861 11.8672 8.51569 11.6062 9.13132C11.3553 9.72543 10.9912 10.2651 10.5344 10.7204C10.4172 10.8376 10.2953 10.9469 10.1687 11.0516C10.1434 11.0722 10.1272 11.102 10.1237 11.1345C10.1202 11.167 10.1296 11.1995 10.15 11.2251L10.7656 12.0141C10.8094 12.0688 10.8891 12.0782 10.9438 12.0344C12.3516 10.8876 13.25 9.14225 13.25 7.186C13.25 3.73132 10.4469 0.932879 6.99062 0.937567Z", fill: "white", fillOpacity: "0.3" }) }));
}
const getDegreeString = (degree) => `${degree}${DEGREE_SYMBOL}`;
function Degree(props) {
    const { value, onChange, onInputBlur, ...rest } = props;
    const [valueState, setValueState] = react.useState(getDegreeString(value));
    // ------------------------------------------------------------------------------------------
    react.useEffect(() => {
        setValueState(getDegreeString(value));
    }, [value]);
    const _onInternalChange = (e) => {
        let _value = parseInt(e.currentTarget.value.replace(DEGREE_SYMBOL, ""));
        _value = Math.round(_value);
        if (_value < DEGREE_VALUE.MIN)
            _value = DEGREE_VALUE.MIN;
        if (_value > DEGREE_VALUE.MAX)
            _value = DEGREE_VALUE.MAX;
        if (isNaN(_value))
            _value = DEGREE_VALUE.MIN;
        setValueState(getDegreeString(_value));
    };
    const _onOutsideChange = () => {
        const _valueState = parseInt(valueState?.toString()?.replace(DEGREE_SYMBOL, ""));
        onChange(_valueState);
        setValueState(getDegreeString(_valueState));
    };
    const _onKeyDown = (e) => {
        e.stopPropagation();
        if (e.key === KEYS.ENTER)
            _onOutsideChange();
    };
    const _onBlur = (e) => {
        _onOutsideChange();
        if (typeof onInputBlur === "function")
            onInputBlur(e);
    };
    // -----------------------------------------------------------------------
    return (jsxRuntime.jsx(Input, { ...rest, onChange: _onInternalChange, onKeyDown: _onKeyDown, value: valueState, onInputBlur: _onBlur, info: jsxRuntime.jsx(DegreeInfo, {}), inputWidth: 35 }));
}

const compare = ({ offset: offset1 }, { offset: offset2 }) => offset1 - offset2;
const sortPalette = (palette) => {
    return palette.sort(compare);
};
const getLinearGradientBackgroundCss = (gradient) => {
    const sortedPalette = sortPalette(gradient.palette);
    const linearGradientColors = `linear-gradient(
    ${gradient.degree}deg,
    ${sortedPalette
        .map(({ alpha, offset, color: { red, green, blue } }) => `rgb(${red}, ${green}, ${blue}, ${alpha}) ${offset * 100}%`)
        .join(", ")}
  )`;
    return linearGradientColors;
};
const noop = () => undefined;

var css_248z$9 = ".Input-Gradient-module_gradient_preview__9mgD0 {\n  width: 16px;\n  height: 16px;\n  box-sizing: border-box;\n  border-radius: 2px;\n  text-align: center;\n}\n";
var s$9 = {"gradient_preview":"Input-Gradient-module_gradient_preview__9mgD0"};
styleInject(css_248z$9);

function GradientPreview(props) {
    const { value } = props;
    let color = DEFAULT_HEX;
    if (typeof value !== "undefined") {
        color = getLinearGradientBackgroundCss(value);
    }
    return (jsxRuntime.jsx("div", { style: {
            background: color,
        }, className: s$9.gradient_preview }));
}
// ------------------------------------------------------------------------------------------
function GradientInput(props) {
    const { value, ...rest } = props;
    // -----------------------------------------------------------------------
    return (jsxRuntime.jsx(Input, { ...rest, value: "Gradient", onChange: noop, info: jsxRuntime.jsx(GradientPreview, { value: value }) }));
}

/**
 * Removes invalid characters and formats color hex to 6 characters
 * @param {string} colorHex The color value in hex format to sanitize
 * @returns {string} The sanitized hex color
 */
function sanitizeHex(colorHex) {
    let sanitizedHex = colorHex.replace(/[^a-fA-F0-9]/g, '');
    if (sanitizedHex.length === 0) {
        sanitizedHex = '000000';
    }
    else if (sanitizedHex.length === 1) {
        sanitizedHex = sanitizedHex[0].repeat(6);
    }
    else if (sanitizedHex.length === 2) {
        sanitizedHex = `${sanitizedHex[0].repeat(3)}${sanitizedHex[1].repeat(3)}`;
    }
    else if (sanitizedHex.length >= 3 && sanitizedHex.length < 6) {
        sanitizedHex = `${sanitizedHex[0].repeat(2)}${sanitizedHex[1].repeat(2)}${sanitizedHex[2].repeat(2)}`;
    }
    else if (sanitizedHex.length > 6) {
        sanitizedHex = sanitizedHex.slice(0, 6);
    }
    return `#${sanitizedHex}`;
}

var css_248z$8 = ".Input-Hex-module_color_preview__HTigr {\n  width: 16px;\n  height: 16px;\n  box-sizing: border-box;\n  border-radius: 2px;\n  text-align: center;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n}\n";
var s$8 = {"color_preview":"Input-Hex-module_color_preview__HTigr"};
styleInject(css_248z$8);

function ColorPreview(props) {
    const { value } = props;
    return (jsxRuntime.jsx("div", { style: {
            background: value,
        }, className: s$8.color_preview }));
}
// ------------------------------------------------------------------------------------------
function Hex(props) {
    const { value, onChange, onInputBlur, ...rest } = props;
    const [valueState, setValueState] = react.useState(value);
    // -----------------------------------------------------------------------
    react.useEffect(() => {
        setValueState(value);
    }, [value]);
    const _onInternalChange = (e) => {
        const _value = e.currentTarget.value;
        setValueState(_value);
    };
    const _onOutsideChange = () => {
        const _valueState = sanitizeHex(valueState);
        onChange(_valueState);
        setValueState(_valueState);
    };
    const _onKeyDown = (e) => {
        e.stopPropagation();
        if (e.key === KEYS.ENTER)
            _onOutsideChange();
    };
    const _onBlur = (e) => {
        _onOutsideChange();
        if (typeof onInputBlur === "function")
            onInputBlur(e);
    };
    // -----------------------------------------------------------------------
    return (jsxRuntime.jsx(Input, { ...rest, onChange: _onInternalChange, onKeyDown: _onKeyDown, onInputBlur: _onBlur, value: valueState.toUpperCase(), info: jsxRuntime.jsx(ColorPreview, { value: value }) }));
}

var css_248z$7 = ".Input-module_container__UIJW7 {\n  display: inline-flex;\n  align-items: center;\n  height: 26px;\n}\n\n.Input-module_container__UIJW7:hover .Input-module_wrapper__YQPzB {\n  border: 1px solid #262626;\n}\n\n.Input-module_wrapper__YQPzB {\n  display: inline-flex;\n  align-items: center;\n  border-radius: 2px;\n  height: 100%;\n  border: 1px solid transparent;\n  transition: border-color 0.25s ease;\n}\n\n.Input-module_container__UIJW7 .Input-module_wrapper__YQPzB.Input-module_isFocus__R2hS2 {\n  border: 1px solid var(--color-gradient-picker-input-focus-color);\n}\n\n.Input-module_container__UIJW7 .Input-module_extra_component__ClBmv {\n  border: none !important;\n}\n\n.Input-module_extra_component__ClBmv input {\n  padding-left: 6px;\n}\n\n.Input-module_label__YtHRq {\n  margin-right: 12px;\n}\n\n.Input-module_input__rWdpT {\n  border: none;\n  line-height: 1.5;\n  background-color: transparent;\n  color: var(--color-gradient-picker-text-color);\n  border: none;\n  outline: none;\n}\n\n.Input-module_input__rWdpT {\n  margin-right: 8px;\n}\n\n.Input-module_input__rWdpT::-webkit-outer-spin-button,\n.Input-module_input__rWdpT::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.Input-module_input__rWdpT[type=\"number\"] {\n  -moz-appearance: textfield;\n}\n\n.Input-module_info__enne1 {\n  margin-right: 6px;\n  margin-left: 6px;\n}\n";
var s$7 = {"container":"Input-module_container__UIJW7","wrapper":"Input-module_wrapper__YQPzB","isFocus":"Input-module_isFocus__R2hS2","extra_component":"Input-module_extra_component__ClBmv","label":"Input-module_label__YtHRq","input":"Input-module_input__rWdpT","info":"Input-module_info__enne1"};
styleInject(css_248z$7);

var css_248z$6 = ".Input-Rgb-module_input_text__VCz4h {\n  width: 16px;\n  height: 16px;\n  box-sizing: border-box;\n  border-radius: 2px;\n  text-align: center;\n  position: relative;\n  top: -1px;\n}\n";
var s$6 = {"input_text":"Input-Rgb-module_input_text__VCz4h"};
styleInject(css_248z$6);

function InputTextInfo(props) {
    const { children } = props;
    return jsxRuntime.jsx("div", { className: s$6.input_text, children: children });
}
// ------------------------------------------------------------------------------------------
function Rgb(props) {
    const { inputProps, info, onChange, value, onInputBlur, ...rest } = props;
    const [valueState, setValueState] = react.useState(value);
    const customInputProps = {
        ...inputProps,
        type: "number",
        min: RGB_VALUE.MIN,
        max: RGB_VALUE.MAX,
    };
    // -----------------------------------------------------------------------
    react.useEffect(() => {
        setValueState(value);
    }, [value]);
    // -----------------------------------------------------------------------
    const _onInternalChange = (e) => {
        let _value = parseInt(e.currentTarget.value);
        if (_value < RGB_VALUE.MIN)
            _value = RGB_VALUE.MIN;
        if (_value > RGB_VALUE.MAX)
            _value = RGB_VALUE.MAX;
        if (isNaN(_value))
            _value = RGB_VALUE.MIN;
        setValueState(_value);
    };
    const _onOutsideChange = () => {
        onChange(valueState);
        setValueState(valueState);
    };
    const _onKeyDown = (e) => {
        e.stopPropagation();
        if (e.key === KEYS.ENTER)
            _onOutsideChange();
    };
    const _onBlur = (e) => {
        _onOutsideChange();
        if (typeof onInputBlur === "function")
            onInputBlur(e);
    };
    // -----------------------------------------------------------------------
    return (jsxRuntime.jsx(Input, { ...rest, onChange: _onInternalChange, onKeyDown: _onKeyDown, value: valueState, onInputBlur: _onBlur, info: jsxRuntime.jsx(InputTextInfo, { children: info }), inputProps: customInputProps }));
}

function Input(props) {
    // ------------------------------------------------------------------------------------------
    const { className, info, label, style, inputWrapperClassName, inputClassName, inputProps, placeholder, onInputFocus, onInputBlur, onChange, onKeyDown, value, inputWidth, extraInput: extra, isExtraComponent, } = props;
    const { style: inputStyle, ...restInputProps } = inputProps || {};
    // -----------------------------------------------------------------------
    const [isFocus, setFocus] = react.useState();
    const containerRef = react.useRef(null);
    react.useEffect(() => {
        if (typeof document === "undefined")
            return () => undefined;
        const handler = (e) => {
            if (containerRef.current?.contains(e.target)) {
                setFocus(true);
            }
            else {
                setFocus(false);
            }
        };
        document.addEventListener("click", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("click", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, []);
    // -----------------------------------------------------------------------
    return (jsxRuntime.jsxs("div", { className: cn(s$7.container, className), style: style, children: [label && jsxRuntime.jsx("div", { className: cn(s$7.label), children: label }), jsxRuntime.jsxs("div", { className: cn(s$7.wrapper, isFocus && s$7.isFocus, isExtraComponent && s$7.extra_component, inputWrapperClassName), ref: containerRef, children: [info && !isExtraComponent && (jsxRuntime.jsx("div", { className: cn(s$7.info), children: info })), jsxRuntime.jsx("input", { ...restInputProps, style: {
                            ...inputStyle,
                            width: inputWidth,
                        }, onFocus: (e) => {
                            if (typeof onInputFocus === "function")
                                onInputFocus(e);
                            setTimeout(() => {
                                e.target.select();
                            }, 100);
                        }, onBlur: onInputBlur, placeholder: placeholder, className: cn(s$7.input, inputClassName), value: value, onChange: onChange, onKeyDown: onKeyDown }), extra] })] }));
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

const InputFields = (props) => {
    const { hex, alpha, rgb, setColor, setAlpha, setColorFromRgb } = props;
    const { red, green, blue } = rgb;
    return (jsxRuntime.jsxs("div", { className: s$5.color_inputs_wrapper, children: [jsxRuntime.jsx(Input.Hex, { label: "HEX", inputWidth: 100, style: { gridArea: "hex" }, value: hex, onChange: (_hex) => {
                    setColor(_hex, hexToHsv(_hex));
                } }), jsxRuntime.jsx(Input.Alpha, { inputWidth: 40, style: { gridArea: "alpha" }, value: alpha, onChange: (_alpha) => {
                    setAlpha(_alpha);
                } }), jsxRuntime.jsx(Input.Rgb, { label: "RGB", info: "R", inputWidth: 26, style: {
                    gridArea: "red",
                    marginLeft: -2,
                }, value: red, onChange: (_red) => {
                    setColorFromRgb({
                        red: _red,
                        green,
                        blue,
                    });
                } }), jsxRuntime.jsx(Input.Rgb, { info: "G", inputWidth: 26, style: { gridArea: "green" }, value: green, onChange: (_green) => {
                    setColorFromRgb({
                        red,
                        green: _green,
                        blue,
                    });
                } }), jsxRuntime.jsx(Input.Rgb, { info: "B", inputWidth: 26, style: { gridArea: "blue" }, value: blue, onChange: (_blue) => {
                    setColorFromRgb({
                        red,
                        green,
                        blue: _blue,
                    });
                } })] }));
};

var css_248z$4 = ".SaturationPicker-module_saturation_value_selector__r-R0H {\n  position: relative;\n  box-sizing: border-box;\n  width: 290px;\n  height: 290px;\n  background-image: linear-gradient(\n      to bottom,\n      rgba(0, 0, 0, 0) 0%,\n      #000000 100%\n    ),\n    linear-gradient(to left, rgba(255, 255, 255, 0) 0%, #ffffff 100%);\n  background-color: #ffffff;\n}\n\n.SaturationPicker-module_saturation_value_picker__wN2fj {\n  position: absolute;\n  top: 0;\n  left: 0;\n\n  width: var(--color-gradient-picker-value-picker-width);\n  height: var(--color-gradient-picker-value-picker-width);\n  box-sizing: border-box;\n\n  border: 2px solid #ffffff;\n  border-radius: 50%;\n  cursor: pointer;\n  transform: translate(-50%, -50%);\n}\n";
var s$4 = {"saturation_value_selector":"SaturationPicker-module_saturation_value_selector__r-R0H","saturation_value_picker":"SaturationPicker-module_saturation_value_picker__wN2fj"};
styleInject(css_248z$4);

const SaturationPicker = (props) => {
    // ------------------------------------------------------------------------------------------
    const { hue, saturation, value, onChange } = props;
    // ------------------------------------------------------------------------------------------
    const [isInteracting, setIsInteracting] = react.useState(false);
    const selectorDivRef = react.useRef(null);
    const hueColor = hsvToHex(hue, 1, 1);
    const hex = hsvToHex(hue, saturation, value);
    const updateSaturationValue = react.useCallback((evt) => {
        if (!selectorDivRef.current) {
            return;
        }
        const svPosition = selectorDivRef.current.getBoundingClientRect();
        const x = evt.clientX - svPosition.left;
        const y = evt.clientY - svPosition.top;
        const updatedSaturationValue = getSaturationValueFromPosition(x, y, selectorDivRef.current.clientWidth, selectorDivRef.current.clientHeight);
        onChange(updatedSaturationValue);
    }, [onChange]);
    const onPointerDown = react.useCallback((evt) => {
        evt.target.setPointerCapture(evt.pointerId);
        setIsInteracting(true);
        updateSaturationValue(evt);
    }, [updateSaturationValue]);
    const onPointerUp = react.useCallback((evt) => {
        evt.target.releasePointerCapture(evt.pointerId);
        setIsInteracting(false);
    }, []);
    const onMouseDown = react.useCallback((evt) => {
        setIsInteracting(true);
        updateSaturationValue(evt);
    }, [updateSaturationValue]);
    const onMove = react.useCallback((evt) => {
        if (isInteracting) {
            updateSaturationValue(evt);
        }
    }, [isInteracting, updateSaturationValue]);
    const onMouseUp = react.useCallback(() => {
        setIsInteracting(false);
    }, []);
    // Setup pointer events for supported browsers for two reasons:
    //   1. It allows for pointer capture which allows for continued
    //      interaction even when the cursor/pointer outside of picker
    //   2. It allows for unified code across devices (mobile and desktop)
    const interactionCallbacks = window.PointerEvent
        ? {
            onPointerDown,
            onPointerMove: onMove,
            onPointerUp,
        }
        : {
            onMouseDown,
            onMouseMove: onMove,
            onMouseUp,
        };
    return (jsxRuntime.jsx("div", { className: cn(s$4.saturation_value_selector), style: {
            backgroundColor: hueColor,
        }, ref: selectorDivRef, title: "Saturation and Value", ...interactionCallbacks, children: jsxRuntime.jsx("div", { className: cn(s$4.saturation_value_picker), style: {
                left: `${saturation * 100}%`,
                top: `${(1 - value) * 100}%`,
                backgroundColor: hex,
            } }) }));
};

const ColorPicker = (props) => {
    // ------------------------------------------------------------------------------------------
    const { hex, alpha, onColorChange, onAlphaChange } = props;
    const [, setHexState] = react.useState(hex);
    // ------------------------------------------------------------------------------------------
    const hsvRef = react.useRef(hexToHsv(hex));
    const hexRef = react.useRef(hex);
    const { hue, saturation, value } = hsvRef.current;
    const rgb = hexToRgb(hexRef.current);
    // ------------------------------------------------------------------------------------------
    react.useEffect(() => {
        hsvRef.current = hexToHsv(hex);
        hexRef.current = hex;
        setHexState(hex);
    }, [hex]);
    // ------------------------------------------------------------------------------------------
    const _onSetColor = (_updatedHex, _updatedHsv) => {
        hexRef.current = _updatedHex;
        hsvRef.current = _updatedHsv;
        onColorChange(_updatedHex);
    };
    const _onSetColorFromRgb = (updatedRgb) => {
        const { red, green, blue } = updatedRgb;
        _onSetColor(rgbToHex(red, green, blue), rgbToHsv(red, green, blue));
    };
    const _onEyeDropperClick = async () => {
        const _hex = await openNativeEyeDropper();
        if (_hex !== null) {
            _onSetColor(_hex, hexToHsv(_hex));
        }
    };
    // Helper to set the color when HSV change
    const _onSetColorFromHsv = (_updatedHsv) => {
        _onSetColor(hsvToHex(_updatedHsv.hue, _updatedHsv.saturation, _updatedHsv.value), _updatedHsv);
    };
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx(SaturationPicker, { hue: hue, saturation: saturation, value: value, onChange: (_saturationValue) => {
                    _onSetColorFromHsv({
                        ...hsvRef.current,
                        ..._saturationValue,
                    });
                } }), jsxRuntime.jsxs("div", { className: cn(s$d.sliders_wrapper), children: [jsxRuntime.jsx(EyeDropper$1, { onClick: _onEyeDropperClick }), jsxRuntime.jsxs("div", { className: cn(s$d.sliders), children: [jsxRuntime.jsx(HueSlider, { hue: hue, onChange: (updatedHue) => _onSetColorFromHsv({
                                    ...hsvRef.current,
                                    hue: updatedHue,
                                }), className: s$d.hue_slider }), jsxRuntime.jsx(AlphaSlider, { alpha: alpha, hex: hex, onChange: onAlphaChange })] })] }), jsxRuntime.jsx(InputFields, { hex: hex, rgb: rgb, alpha: alpha, setAlpha: onAlphaChange, setColor: _onSetColor, setColorFromRgb: _onSetColorFromRgb })] }));
};

var COLOR_TYPE;
(function (COLOR_TYPE) {
    COLOR_TYPE["SOLID"] = "SOLID";
    COLOR_TYPE["LINEAR"] = "LINEAR";
})(COLOR_TYPE || (COLOR_TYPE = {}));

var css_248z$3 = ".ColorTypeSelect-module_select_wrapper__HVYz1 {\n  height: 42px;\n  display: flex;\n  align-items: center;\n  padding-left: 16px;\n  padding-right: 16px;\n}\n\n.ColorTypeSelect-module_select__caD04 {\n  background-color: transparent;\n  outline: none;\n  border: none;\n  color: var(--color-gradient-picker-text-color);\n  font-size: var(--color-gradient-picker-base-font-size);\n  margin-left: 8px;\n}\n";
var s$3 = {"select_wrapper":"ColorTypeSelect-module_select_wrapper__HVYz1","select":"ColorTypeSelect-module_select__caD04"};
styleInject(css_248z$3);

const ColorTypeSelect = ({ value, onChange }) => {
    return (jsxRuntime.jsxs("div", { className: s$3.select_wrapper, children: [jsxRuntime.jsx("svg", { width: "16", height: "14", viewBox: "0 0 16 14", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: jsxRuntime.jsx("path", { d: "M10.4294 0.714828H0.715123C0.636551 0.714828 0.572266 0.779114 0.572266 0.857686V3.1434C0.572266 3.22197 0.636551 3.28626 0.715123 3.28626H1.71512C1.79369 3.28626 1.85798 3.22197 1.85798 3.1434V2.00054H4.85798V12.0005H3.21512C3.13655 12.0005 3.07227 12.0648 3.07227 12.1434V13.1434C3.07227 13.222 3.13655 13.2863 3.21512 13.2863H7.92941C8.00798 13.2863 8.07227 13.222 8.07227 13.1434V12.1434C8.07227 12.0648 8.00798 12.0005 7.92941 12.0005H6.28655V2.00054H9.28655V3.1434C9.28655 3.22197 9.35084 3.28626 9.42941 3.28626H10.4294C10.508 3.28626 10.5723 3.22197 10.5723 3.1434V0.857686C10.5723 0.779114 10.508 0.714828 10.4294 0.714828ZM15.3008 10.4648H14.1437V3.53626H15.3008C15.408 3.53626 15.4687 3.41126 15.4026 3.32733L13.6026 1.04876C13.5907 1.03334 13.5754 1.02085 13.5579 1.01227C13.5404 1.00368 13.5212 0.999211 13.5017 0.999211C13.4822 0.999211 13.463 1.00368 13.4455 1.01227C13.428 1.02085 13.4128 1.03334 13.4008 1.04876L11.6008 3.32733C11.5858 3.34639 11.5765 3.3693 11.5739 3.39341C11.5714 3.41753 11.5756 3.44189 11.5862 3.4637C11.5969 3.4855 11.6134 3.50387 11.634 3.51671C11.6546 3.52954 11.6784 3.53632 11.7026 3.53626H12.858V10.4648H11.7008C11.5937 10.4648 11.533 10.5898 11.5991 10.6738L13.3991 12.9505C13.4508 13.0166 13.5508 13.0166 13.6008 12.9505L15.4008 10.6738C15.416 10.6549 15.4254 10.6321 15.4282 10.6081C15.431 10.584 15.4269 10.5597 15.4164 10.5379C15.406 10.5161 15.3896 10.4976 15.3692 10.4847C15.3487 10.4718 15.325 10.4649 15.3008 10.4648Z", fill: "white", fillOpacity: "0.3" }) }), jsxRuntime.jsxs("select", { className: s$3.select, value: value, onChange: (e) => {
                    onChange(e.target.value);
                }, style: { width: value === COLOR_TYPE.LINEAR ? 65 : 55 }, children: [jsxRuntime.jsx("option", { value: COLOR_TYPE.SOLID, children: "Solid" }), jsxRuntime.jsx("option", { value: COLOR_TYPE.LINEAR, children: "Linear" })] })] }));
};

const STOP_WIDTH = 14;
const HALF_STOP_WIDTH = STOP_WIDTH / 2;
const DEFAULT_STOP_REMOVAL_DROP = 50;
const DEFAULT_PALETTE_WIDTH = 258;
const DEFAULT_PALETTE_HEIGHT = 22;
const DEFAULT_MAX_STOPS = 5;
const DEFAULT_MIN_STOPS = 2;
const DEFAULT_PALETTE = [
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
const DEFAULT_DEGREE = 90;

var css_248z$2 = ".ColorStop-module_cs__E3PN4 {\n  position: absolute;\n  cursor: pointer;\n  height: 14px;\n  width: 14px;\n  top: 8px;\n  border-radius: 2px;\n  border: 2px solid #262626;\n  box-shadow: 0 0 6px #000;\n}\n\n.ColorStop-module_cs__E3PN4:hover {\n  border-color: #434343;\n}\n\n.ColorStop-module_cs__E3PN4::before {\n  content: \"\";\n  width: 0;\n  height: 0;\n  position: absolute;\n  top: -8px;\n  left: 2px;\n  border: 3px solid transparent;\n  border-bottom: 3px solid #262626;\n  box-sizing: border-box;\n}\n\n.ColorStop-module_cs__E3PN4:hover::before {\n  border-bottom-color: #434343;\n}\n\n.ColorStop-module_cs__E3PN4.ColorStop-module_active__jjC6- {\n  border: 2px solid #fafafa;\n}\n\n.ColorStop-module_cs__E3PN4.ColorStop-module_active__jjC6-::before {\n  border-bottom-color: #fafafa;\n}\n\n.ColorStop-module_cs__E3PN4::after {\n  content: \"\";\n  width: 2px;\n  height: 26px;\n  position: absolute;\n  border-radius: 2px;\n  background-color: #fafafa;\n  top: -34px;\n  left: 4px;\n  box-shadow: 0 0 6px #000;\n}\n";
var s$2 = {"cs":"ColorStop-module_cs__E3PN4","active":"ColorStop-module_active__jjC6-"};
styleInject(css_248z$2);

const EVENTS = {
    MOUSEDOWN: 'mousedown',
    MOUSEMOVE: 'mousemove',
    MOUSEUP: 'mouseup',
    TOUCHSTART: 'touchstart',
    TOUCHMOVE: 'touchmove',
    TOUCHEND: 'touchend'
};

// TODO check tsc
const DRAG_HANDLERS = {
    MOUSE: {
        stop: (e) => {
            e.stopPropagation();
        },
        coordinates: ({ clientX, clientY }) => ({
            clientX,
            clientY,
        }),
        dragEvent: { name: EVENTS.MOUSEMOVE },
        dragEndEvent: { name: EVENTS.MOUSEUP },
    },
    TOUCH: {
        stop: noop,
        coordinates: (e) => {
            const [touch] = e.touches;
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
const isTouch = (e) => e.type === EVENTS.TOUCHSTART;
const useDragging = ({ onDragStart, onDrag, onDragEnd }) => {
    const [dragging, setDragging] = react.useState(false);
    const dragContext = react.useRef({});
    // ------------------------------------------------------------------------------------------
    const activateEvent = (e, handler) => {
        setDragging(true);
        dragContext.current.handler = handler;
        onDragStart(handler.coordinates(e));
    };
    const deactivateEvent = () => {
        setDragging(false);
        onDragEnd(dragContext.current.change);
        dragContext.current = {};
    };
    const dragHandler = (e) => {
        const handler = isTouch(e) ? DRAG_HANDLERS.TOUCH : DRAG_HANDLERS.MOUSE;
        handler.stop(e);
        activateEvent(e, handler);
    };
    const handleDrag = (e) => {
        const { handler } = dragContext.current;
        if (!dragging)
            return;
        dragContext.current.change = onDrag(handler.coordinates(e));
    };
    react.useEffect(() => {
        const { handler } = dragContext.current;
        if (!handler)
            return;
        const { dragEvent, dragEndEvent } = handler;
        if (dragging) {
            document.addEventListener(dragEvent.name, handleDrag, dragEndEvent.options);
            document.addEventListener(dragEndEvent.name, deactivateEvent);
        }
        return () => {
            document.removeEventListener(dragEvent.name, handleDrag, dragEndEvent.options);
            document.removeEventListener(dragEndEvent.name, deactivateEvent);
        };
    }, [dragging]);
    return [dragHandler, activateEvent, deactivateEvent];
};

/**
 * Limits a client drag movement within given min / max
 */
const limitPos = (offset, min, max) => Math.max(Math.min(offset, max), min);
const getColorStopRefTop = (ref) => {
    if (!ref.current)
        return 0;
    return ref.current.getBoundingClientRect().top;
};
const useStopDragging = ({ limits, stop, colorStopRef, onPosChange, onDragStart, onDragEnd, onDeleteColor, }) => {
    const [posStart, setPosStart] = react.useState(0);
    const handleDrag = ({ clientX, clientY }) => {
        const { id, offset } = stop;
        const { min, max } = limits;
        // Removing if out of drop limit on Y axis.
        const top = getColorStopRefTop(colorStopRef);
        if (Math.abs(clientY - top) > (limits.drop || DEFAULT_STOP_REMOVAL_DROP)) {
            // deactivateEvent();
            return onDeleteColor(id);
        }
        // Limit movements
        const dragOffset = offset - posStart;
        const limitedPos = limitPos(dragOffset + clientX, min, max);
        onPosChange(id, limitedPos);
    };
    const [drag] = useDragging({
        onDragStart: ({ clientX }) => {
            setPosStart(clientX);
            onDragStart(stop.id);
        },
        onDrag: handleDrag,
        onDragEnd: () => onDragEnd(stop.id),
    });
    return [drag];
};

const ColorStop = (props) => {
    const { stop, limits, onPosChange, onDeleteColor, onDragStart = noop, onDragEnd = noop, } = props;
    const colorStopRef = react.useRef(null);
    const [drag] = useStopDragging({
        stop,
        limits,
        onPosChange,
        onDragStart,
        onDragEnd,
        onDeleteColor,
        colorStopRef,
    });
    const { offset, color, isActive, alpha, id } = stop;
    react.useEffect(() => {
        if (typeof document === "undefined")
            return () => undefined;
        const handler = (e) => {
            if ((e.key === "Delete" || e.key === "Backspace") && isActive) {
                onDeleteColor(id);
            }
        };
        document.addEventListener("keydown", handler);
        return () => {
            document.removeEventListener("keydown", handler);
        };
        // do not check onDelete
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive, id]);
    const rgba = `rgba(${color.red}, ${color.green}, ${color.blue}, ${alpha})`;
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

const ColorStopsHolder = (props) => {
    const { stops, ...rest } = props;
    return (jsxRuntime.jsx("div", { style: {
            width: DEFAULT_PALETTE_WIDTH,
            height: 22,
            position: "relative",
        }, children: stops.map((stop) => (jsxRuntime.jsx(ColorStop, { stop: stop, ...rest }, stop.id))) }));
};

const Palette = (props) => {
    const { palette, degree, onAddColor, disabled } = props;
    // ------------------------------------------------------------------------------------------
    const linearGradientColors = getLinearGradientBackgroundCss({
        palette,
        degree,
    });
    // ------------------------------------------------------------------------------------------
    const handleColorAdd = (e) => {
        e.preventDefault();
        if (e.button)
            return;
        const offset = e.clientX - e.target.getBoundingClientRect().left;
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
const nextColorId = (palette) => Math.max(...palette.map(({ id }) => id)) + 1;
const mapIdToPalette = (palette) => palette.map((color, index) => ({
    ...color,
    id: color.id || index + 1,
}));
const mapPaletteToStops = ({ palette, activeId, }) => palette.map((color) => {
    return {
        ...color,
        id: color.id,
        offset: DEFAULT_PALETTE_WIDTH * Number(color.offset) - HALF_STOP_WIDTH,
        isActive: color.id === activeId,
    };
});
const getPaletteColor = (_palette, _id) => {
    const color = _palette.find((_color) => _color.id === _id) || _palette[0];
    return {
        ...color,
        offset: Number(color.offset),
    };
};
// ------------------------------------------------------------------------------------------
const GradientPicker = (props) => {
    const { gradient, onLinearGradientChange, stopRemovalDrop = DEFAULT_STOP_REMOVAL_DROP, minStops = DEFAULT_MIN_STOPS, maxStops = DEFAULT_MAX_STOPS, } = props;
    const { palette: paletteProp, degree } = gradient;
    const palette = mapIdToPalette(paletteProp);
    // ------------------------------------------------------------------------------------------
    const [defaultActiveColor] = palette;
    const [activeColorId, setActiveColorId] = react.useState(defaultActiveColor.id);
    // ------------------------------------------------------------------------------------------
    const limits = react.useMemo(() => {
        const min = -HALF_STOP_WIDTH;
        const max = DEFAULT_PALETTE_WIDTH - HALF_STOP_WIDTH;
        return {
            min,
            max,
            drop: stopRemovalDrop,
        };
    }, [stopRemovalDrop]);
    // ------------------------------------------------------------------------------------------
    const onStopDragStart = (id) => {
        if (id !== activeColorId) {
            setActiveColorId(id);
        }
    };
    const handleGradientChange = (_palette, _degree) => {
        const sortedPalette = sortPalette(_palette).map(({ offset, id, ...rest }) => ({
            ...rest,
            id,
            offset: offset,
            active: id === activeColorId,
        }));
        onLinearGradientChange({
            degree: _degree,
            palette: sortedPalette,
        });
    };
    const handleColorAdd = (offset) => {
        if (palette.length >= maxStops)
            return;
        const { color } = getPaletteColor(palette, activeColorId);
        const newStop = {
            id: nextColorId(palette),
            offset: offset / DEFAULT_PALETTE_WIDTH,
            color,
            alpha: ALPHA_VALUE.MAX,
        };
        const updatedPalette = [...palette, newStop];
        setActiveColorId(newStop.id);
        handleGradientChange(updatedPalette, degree);
    };
    const handleColorDelete = (id) => {
        if (palette.length <= minStops)
            return;
        const updatedPalette = palette.filter((c) => c.id !== id);
        const activeId = updatedPalette.reduce((a, x) => (x.offset < a.offset ? x : a), updatedPalette[0]).id;
        setActiveColorId(activeId);
        handleGradientChange(updatedPalette, degree);
    };
    const handleStopPosChange = (id, offset) => {
        const updatedPalette = palette.map((_palette) => id === _palette.id
            ? {
                ..._palette,
                offset: (offset + HALF_STOP_WIDTH) / DEFAULT_PALETTE_WIDTH,
            }
            : _palette);
        handleGradientChange(updatedPalette, degree);
    };
    const handleDegreeChange = (_degree) => {
        handleGradientChange(paletteProp, _degree);
    };
    const handleStopAlphaChange = (_alpha) => {
        const updatedPalette = palette.map((_palette) => activeColorId === _palette.id
            ? {
                ..._palette,
                alpha: _alpha,
            }
            : _palette);
        handleGradientChange(updatedPalette, degree);
    };
    const handleStopColorChange = (_updateHex) => {
        const updatedPalette = palette.map((_palette) => activeColorId === _palette.id
            ? {
                ..._palette,
                color: hexToRgb(_updateHex),
            }
            : _palette);
        handleGradientChange(updatedPalette, degree);
    };
    // ------------------------------------------------------------------------------------------
    const stopsHolderDisabled = palette.length >= maxStops;
    const activeColor = palette.find((item) => item.id === activeColorId);
    const alpha = activeColor?.alpha || ALPHA_VALUE.MAX;
    const { red, green, blue } = activeColor?.color || {
        red: 0,
        green: 0,
        blue: 0,
    };
    // ------------------------------------------------------------------------------------------
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsxs("div", { className: s$1.gp_wrap, children: [jsxRuntime.jsx(Input.Degree, { onChange: handleDegreeChange, value: degree }), jsxRuntime.jsxs("div", { children: [jsxRuntime.jsx(Palette, { onAddColor: handleColorAdd, degree: degree, palette: palette, disabled: stopsHolderDisabled }), jsxRuntime.jsx(ColorStopsHolder, { stops: mapPaletteToStops({
                                    palette,
                                    activeId: activeColorId,
                                }), limits: limits, onPosChange: handleStopPosChange, onDeleteColor: handleColorDelete, onDragStart: onStopDragStart, onDragEnd: noop })] })] }), jsxRuntime.jsx(ColorPicker, { hex: rgbToHex(red, green, blue), alpha: alpha, onAlphaChange: handleStopAlphaChange, onColorChange: handleStopColorChange })] }));
};

var css_248z = ".UserInput-module_input_vertical_divider__hDZqV {\n  border-left: 1px solid #262626;\n  width: 1px;\n  height: 100%;\n}\n";
var s = {"input_vertical_divider":"UserInput-module_input_vertical_divider__hDZqV"};
styleInject(css_248z);

const UserInput = (props) => {
    const { color, onSolidColorChange, onAlphaChange, hasAlphaInput, inputWidth = 80, ...rest } = props;
    const { type, solid = DEFAULT_HEX, alpha = ALPHA_VALUE.MAX, gradient, } = color;
    const alphaInput = hasAlphaInput ? (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [jsxRuntime.jsx("div", { className: s.input_vertical_divider }), jsxRuntime.jsx(Input.Alpha, { ...rest, isExtraComponent: true, value: alpha, onChange: onAlphaChange, inputWidth: 45 })] })) : undefined;
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [type === COLOR_TYPE.SOLID && (jsxRuntime.jsx(Input.Hex, { ...rest, inputWidth: inputWidth, value: solid, onChange: onSolidColorChange, extraInput: alphaInput })), type === COLOR_TYPE.LINEAR && (jsxRuntime.jsx(Input.Gradient, { ...rest, inputWidth: inputWidth, value: gradient }))] }));
};

const DEFAULT_CLASS_NAME = "cgp";

const useCloseWhenClickOutside = (containerRef, callback) => {
    react.useEffect(() => {
        if (typeof document === "undefined")
            return () => undefined;
        const handler = (e) => {
            if (!containerRef.current?.contains(e.target)) {
                callback();
            }
        };
        document.addEventListener("click", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            document.removeEventListener("click", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [callback, containerRef]);
};

const useCloseWhenPressEcs = (callback) => {
    react.useEffect(() => {
        if (typeof document === "undefined")
            return () => undefined;
        const handler = (e) => {
            if (e.key === "Escape") {
                callback();
                document.activeElement?.blur();
            }
        };
        document.addEventListener("keydown", handler);
        return () => {
            document.removeEventListener("keydown", handler);
        };
    }, [callback]);
};

function ColorGradientPicker(props) {
    // ------------------------------------------------------------------------------------------
    const { classNamePrefix = DEFAULT_CLASS_NAME, className, color, onChange, onInputFocus, ...rest } = props;
    // ------------------------------------------------------------------------------------------
    const solidColor = sanitizeHex(color?.solid || DEFAULT_HEX);
    const totalAlpha = color?.alpha || ALPHA_VALUE.MAX;
    const linearGradient = color?.gradient || {
        degree: DEFAULT_DEGREE,
        palette: DEFAULT_PALETTE,
    };
    const propColorType = color?.type || COLOR_TYPE.SOLID;
    // ------------------------------------------------------------------------------------------
    const [isOpenPicker, setOpenPicker] = react.useState(false);
    const containerRef = react.useRef(null);
    // ------------------------------------------------------------------------------------------
    const handleInputFocus = (e) => {
        setOpenPicker(true);
        if (typeof onInputFocus === "function")
            onInputFocus(e);
    };
    const onHidePicker = react.useCallback(() => {
        setOpenPicker(false);
    }, []);
    // ------------------------------------------------------------------------------------------
    useCloseWhenClickOutside(containerRef, onHidePicker);
    useCloseWhenPressEcs(onHidePicker);
    // ------------------------------------------------------------------------------------------
    const handleSolidColorChange = (_updatedHex) => {
        onChange({
            ...color,
            solid: _updatedHex,
        });
    };
    const handleTotalAlphaChange = (_alpha) => {
        onChange({
            ...color,
            alpha: _alpha,
        });
    };
    const handleSetColorType = (_type) => {
        onChange({
            ...color,
            type: _type,
        });
    };
    const handleLinearGradientChange = (_gradient) => {
        onChange({
            ...color,
            gradient: _gradient,
        });
    };
    // ------------------------------------------------------------------------------------------
    return (jsxRuntime.jsxs("div", { ref: containerRef, className: cn(s$e.wrapper, classNamePrefix, className), children: [jsxRuntime.jsx(UserInput, { ...rest, onSolidColorChange: handleSolidColorChange, onAlphaChange: handleTotalAlphaChange, color: color, onInputFocus: handleInputFocus }), isOpenPicker && (jsxRuntime.jsxs("div", { className: s$e.picking_panel, children: [jsxRuntime.jsx(ColorTypeSelect, { value: propColorType, onChange: handleSetColorType }), propColorType === COLOR_TYPE.LINEAR && (jsxRuntime.jsx(GradientPicker, { gradient: linearGradient, onLinearGradientChange: handleLinearGradientChange })), propColorType === COLOR_TYPE.SOLID && (jsxRuntime.jsx(ColorPicker, { hex: solidColor, alpha: totalAlpha, onAlphaChange: handleTotalAlphaChange, onColorChange: handleSolidColorChange }))] }))] }));
}

exports.ColorGradientPicker = ColorGradientPicker;
exports.ColorPicker = ColorPicker;
exports.GradientPicker = GradientPicker;
exports["default"] = ColorGradientPicker;

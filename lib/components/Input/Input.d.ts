import { GradientInput } from "./Input.Gradient";
import { InputProps } from "./types";
export declare function Input(props: InputProps): JSX.Element;
export declare namespace Input {
    var Alpha: typeof import("./Input.Alpha").Alpha;
    var Rgb: typeof import("./Input.Rgb").Rgb;
    var Hex: typeof import("./Input.Hex").Hex;
    var Degree: typeof import("./Input.Degree").Degree;
    var Gradient: typeof GradientInput;
}
export default Input;

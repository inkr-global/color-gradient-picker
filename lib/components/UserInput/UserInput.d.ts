import { ColorValue } from "../../ColorGradientPicker.types";
import { Alpha, Hex } from "../../colorTypes";
import { InputProps } from "../Input/types";
interface UserInputProps extends InputProps {
    color: ColorValue;
    onSolidColorChange: (hex: Hex) => void;
    onAlphaChange: (alpha: Alpha) => void;
    hasAlphaInput?: boolean;
}
declare const UserInput: (props: UserInputProps) => JSX.Element;
export default UserInput;

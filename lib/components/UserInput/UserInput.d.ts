/// <reference types="react" />
import { ColorValue } from "../../types";
import { Hex } from "../../utils/colorTypes";
import { InputProps } from "../Input/types";
interface UserInputProps extends InputProps {
    color: ColorValue;
    onSolidColorChange: (hex: Hex) => void;
    onAlphaChange: (alpha: number) => void;
    hasAlphaInput?: boolean;
}
declare const UserInput: (props: UserInputProps) => JSX.Element;
export default UserInput;

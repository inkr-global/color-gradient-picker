/// <reference types="react" />
import { COLOR_TYPE } from "../../types";
interface ColorTypeSelectProps {
    value: COLOR_TYPE;
    onChange: (value: COLOR_TYPE) => void;
}
declare const ColorTypeSelect: ({ value, onChange }: ColorTypeSelectProps) => JSX.Element;
export default ColorTypeSelect;

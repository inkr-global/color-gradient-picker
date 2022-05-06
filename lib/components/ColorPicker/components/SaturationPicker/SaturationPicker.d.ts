import { SaturationValue } from "../../../../colorTypes";
declare type SaturationPickerProps = {
    hue: number;
    saturation: number;
    value: number;
    onChange: (saturationValue: SaturationValue) => void;
};
declare const SaturationPicker: (props: SaturationPickerProps) => JSX.Element;
export default SaturationPicker;

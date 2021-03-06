/// <reference types="react" />
import { Alpha } from "../../../types/color";
declare type AlphaSliderProps = {
    alpha: Alpha;
    hex: string;
    onChange: (alpha: Alpha) => void;
    className?: string;
};
declare const AlphaSlider: (props: AlphaSliderProps) => JSX.Element;
export default AlphaSlider;

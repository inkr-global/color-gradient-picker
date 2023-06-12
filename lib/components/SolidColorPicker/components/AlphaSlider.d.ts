/// <reference types="react" />
import { Alpha } from "../../../types/color";
declare type AlphaSliderProps = {
    alpha: Alpha;
    hex: string;
    onChange: (alpha: Alpha) => void;
    className?: string;
};
export declare const AlphaSlider: (props: AlphaSliderProps) => JSX.Element;
export {};

/// <reference types="react" />
declare type HueSliderProps = {
    hue: number;
    onChange: (hue: number) => void;
    className?: string;
};
export declare const HueSlider: (props: HueSliderProps) => JSX.Element;
export {};

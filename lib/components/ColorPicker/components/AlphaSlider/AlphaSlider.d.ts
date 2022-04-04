/// <reference types="react" />
declare type AlphaSliderProps = {
    alpha: number;
    hex: string;
    onChange: (alpha: number) => void;
    className?: string;
};
declare const AlphaSlider: (props: AlphaSliderProps) => JSX.Element;
export default AlphaSlider;

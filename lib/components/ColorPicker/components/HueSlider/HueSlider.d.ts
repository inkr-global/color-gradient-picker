declare type HueSliderProps = {
    hue: number;
    onChange: (hue: number) => void;
    className?: string;
};
declare const HueSlider: (props: HueSliderProps) => JSX.Element;
export default HueSlider;

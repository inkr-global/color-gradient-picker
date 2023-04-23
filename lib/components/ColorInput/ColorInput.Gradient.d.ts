/// <reference types="react" />
import { Gradient } from "../../types/color";
import { ColorInputCoreProps } from "../../types/colorInput";
export declare function ColorInputGradient(props: Omit<ColorInputCoreProps, "onChange" | "info" | "value"> & {
    value?: Gradient;
    onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
}): JSX.Element;

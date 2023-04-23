import React from "react";
import { ColorInputCoreProps } from "../../types/colorInput";
export declare function ColorInputHex(props: Omit<ColorInputCoreProps, "onChange" | "info" | "value"> & {
    onChange: (value: string) => void;
    value: string;
    onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
    shouldUpdateColorValue?: boolean;
}): JSX.Element;

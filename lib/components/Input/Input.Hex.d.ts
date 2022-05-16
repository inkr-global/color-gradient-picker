import React from "react";
import { BaseInputProps } from "./types";
export declare function InputHex(props: Omit<BaseInputProps, "onChange" | "info" | "value"> & {
    onChange: (value: string) => void;
    value: string;
    onColorPreviewClick?: React.MouseEventHandler<HTMLDivElement>;
}): JSX.Element;

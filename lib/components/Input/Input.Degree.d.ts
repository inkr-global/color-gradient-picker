import { BaseInputProps } from "./types";
export declare function InputDegree(props: Omit<BaseInputProps, "onChange" | "info" | "value"> & {
    onChange: (value: number) => void;
    value: number;
}): JSX.Element;

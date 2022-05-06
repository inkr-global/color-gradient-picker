import { InputProps } from "./types";
export declare function Alpha(props: Omit<InputProps, "onChange" | "info" | "value"> & {
    onChange: (value: number) => void;
    value: number;
}): JSX.Element;

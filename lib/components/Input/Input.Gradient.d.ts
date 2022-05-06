import { Gradient } from "../../colorTypes";
import { InputProps } from "./types";
export declare function GradientInput(props: Omit<InputProps, "onChange" | "info" | "value"> & {
    value?: Gradient;
}): JSX.Element;

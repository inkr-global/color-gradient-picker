import React from "react";

import { Gradient } from "../GradientPicker/types";
import { getLinearGradientBackgroundCss, noop } from "../GradientPicker/utils";
import { DEFAULT_HEX } from "./constants";
import { Input } from "./Input";
import s from "./Input.Gradient.module.css";
import { InputProps } from "./types";

function GradientPreview(props: { value?: Gradient }) {
  const { value } = props;

  let color = DEFAULT_HEX;
  if (typeof value !== "undefined") {
    color = getLinearGradientBackgroundCss(value);
  }

  return (
    <div
      style={{
        background: color,
      }}
      className={s.gradient_preview}
    />
  );
}

// ------------------------------------------------------------------------------------------
export function GradientInput(
  props: Omit<InputProps, "onChange" | "info" | "value"> & {
    value?: Gradient;
  },
) {
  const { value, ...rest } = props;

  // -----------------------------------------------------------------------
  return (
    <Input
      {...rest}
      value="Gradient"
      onChange={noop}
      info={<GradientPreview value={value} />}
    />
  );
}

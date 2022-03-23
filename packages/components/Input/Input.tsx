import clsx from "clsx";

import { InputProps } from "../../types";
import { applyPrefixToName } from "../../utils";
import s from "./Input.module.css";

function Input(props: InputProps) {
  const {
    classNamePrefix,
    className,
    info,
    label,
    style,
    hasExtraInput,
    inputWrapperClassName,
  } = props;

  const getPrefixClassName = applyPrefixToName(classNamePrefix);

  return (
    <div
      className={clsx(
        s.container,
        getPrefixClassName("input-container"),
        className,
      )}
      style={style}
    >
      {label && (
        <div className={clsx(s.label, getPrefixClassName("input-label"))}>
          {label}
        </div>
      )}

      <div
        className={clsx(
          s.wrapper,
          inputWrapperClassName,
          getPrefixClassName("input-wrapper"),
        )}
      >
        <div className={clsx(s.info, getPrefixClassName("input-icon"))}>
          {info}
        </div>

        <input className={clsx(s.input, getPrefixClassName("input"))} />

        {hasExtraInput && (
          <input
            className={clsx(s.input_extra, getPrefixClassName("input-extra"))}
          />
        )}
      </div>
    </div>
  );
}

export default Input;

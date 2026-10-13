import { useState, useEffect } from "react";
import chroma from "chroma-js";
import Control, { ControlProps } from './Control';
import ColorControl from './ColorControl';

const TextColorControl = ({
  preview = "right",
  ...props
}: {
  preview?: "left" | "right" | "none"
} & ControlProps) => {
  const [inputValue, setInputValue] = useState(props.value);
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      const value = e.target.value;
      setInputValue(value);
      const isValid = chroma.valid(value);
      if (isValid) {
        const hex = chroma(value).hex("rgb");
        e.target.value = hex;
        props.onChange(e);
      }
    }
  }

  const handleBlur = () => {
    if (!chroma.valid(inputValue)) {
      setInputValue(props.value);
    } else {
      setInputValue(chroma(inputValue as string).hex("rgb"));
    }
    setFocused(false);
  }

  const handleFocus = () => {
    setFocused(true);
  }

  useEffect(() => {
    if (!focused) {
      setInputValue(props.value);
    }
  }, [props.value]);

  const colorControl = (
    <ColorControl
      value={props.value}
      onChange={props.onChange} />
  );

  return (
    <Control
      {...props} // initial for correct overrides
      as="input"
      type="text"
      {...(
        preview !== "none"
        ? preview === "right"
          ? { right: colorControl, rightReadOnly: false }
          : { left: colorControl, leftReadOnly: false }
        : {}
      )}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      value={inputValue}
    />
  )
}

export default TextColorControl;
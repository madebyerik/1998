import { useState, useEffect } from "react";
import { ControlProps } from './Control';
import Select from "./Select";
import { Action, Model } from "./reducer";
import PRESETS from "./presets";

const PresetSelector = ({
  state,
  dispatch,
  ...props
}: {
  state: Model,
  dispatch: (action: Action) => void;
} & ControlProps) => {
  const [preset, setPreset] = useState("chicagos");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPreset = PRESETS.find((p) => p.value === e.target.value);
    if (selectedPreset) {
      dispatch({
        type: "SET_MODEL", 
        model: selectedPreset.model
      });
      setPreset(selectedPreset.value);
    }
  }

  // Robust partial deep equality check
  const matchesPreset = (
    presetState: any,
    externalState: any,
    omit: string[] = []
  ): boolean => {
    if (!presetState || !externalState) return false;

    return Object.keys(presetState).every(key => {
      if (omit.includes(key)) {
        return true; // explicitly skip omitted keys
      }

      const presetVal = presetState[key];
      const externalVal = externalState[key];

      if (externalVal === undefined) return false;

      if (Array.isArray(presetVal)) {
        if (!Array.isArray(externalVal)) return false;
        if (presetVal.length !== externalVal.length) return false;
        return presetVal.every((v, i) =>
          v && typeof v === "object"
            ? matchesPreset(v, externalVal[i], omit)
            : v === externalVal[i]
        );
      }

      if (presetVal && typeof presetVal === "object") {
        return matchesPreset(presetVal, externalVal, omit);
      }

      return presetVal === externalVal;
    });
  };

  useEffect(() => {
    // Find the first preset that matches the current state
    const matchedPreset = PRESETS.find(p => matchesPreset(p.model, state, ["position"]));

    if (matchedPreset) {
      // If it matches a preset, select it
      setPreset(matchedPreset.value);
    } else {
      // Otherwise, mark as custom
      if (preset !== "custom") setPreset("custom");
    }
  }, [state]);

  return (
    <Select
      label="Colorway"
      onChange={handleChange}
      value={preset}
      {...props}>
      {
        preset === "custom"
        ? <option value="custom">Custom</option>
        : null
      }
      {PRESETS.map((p) => (
        <option key={p.value} value={p.value}>{p.name}</option>
      ))}
    </Select>
  )
}

export default PresetSelector;
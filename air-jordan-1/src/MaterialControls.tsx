import { Action, Material, Model } from "./reducer";
import FieldSet from "./FieldSet";
import TextColorControl from "./TextColorControl";
import { camelCaseToTitleCase } from "./helpers";

const MaterialControls = ({
  selection,
  state,
  dispatch
}: {
  selection: string[];
  state: Model;
  dispatch: (action: Action) => void;
}) => {
  const colors = selection.map(key => state[key as keyof Omit<Model, "display">]?.color).filter(Boolean);
  const allSameColor = colors.every(c => c === colors[0]);
  const displayColor = allSameColor ? colors[0] : "";

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    const modelUpdate: Record<string, Material> = {};

    selection.forEach(key => {
      modelUpdate[key] = {
        ...state[key as keyof Omit<Model, "display">],
        color: newColor
      };
    });

    dispatch({
      type: "SET_MODEL",
      model: modelUpdate
    });
  };

  return (
    <FieldSet 
      label={selection.length === 1 
        ? camelCaseToTitleCase(selection[0]) 
        : `Selection (${selection.length})`
      }
      modifier={"filled"}>
      <TextColorControl
        key={selection.join(",")}
        label="Color"
        value={displayColor}
        placeholder={allSameColor ? undefined : "Multi"}
        onChange={handleColorChange}
      />
    </FieldSet>
  );
};

export default MaterialControls;
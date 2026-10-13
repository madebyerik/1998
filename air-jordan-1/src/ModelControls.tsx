import { State, Action, ModelPosition } from "./reducer";
import { capitalize } from "./helpers";
import FieldSet from "./FieldSet";
import PresetSelector from "./PresetSelector";
import Select from "./Select";
import Control from "./Control";

const ModelControls = ({
  state,
  dispatch
}: {
  state: State,
  dispatch: (action: Action) => void;
}) => {
  return (
    <FieldSet
      label="Model"
      modifier={"filled"}>
      <PresetSelector
        state={state.model}
        dispatch={dispatch} />
      <Select
        label="Position"
        value={state.model.display.position}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          dispatch({
            type: "SET_MODEL",
            model: {
              display: {
                ...state.model.display,
                position: e.target.value as ModelPosition
              }
            }
          })
        }}>
        {
          ["flat", "hover"].map((pos) => (
            <option
              key={pos}
              value={pos}>
              { capitalize(pos) }
            </option>
          ))
        }
      </Select>
    </FieldSet>
  )
}

export default ModelControls;
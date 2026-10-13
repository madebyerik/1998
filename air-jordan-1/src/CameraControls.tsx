import { Action, State } from "./reducer";
import FieldSet from "./FieldSet";
import Control from "./Control";
import TextSliderControl from "./TextSliderControl";

const CameraControls = ({
  state,
  dispatch
}: {
  state: State;
  dispatch: (action: Action) => void;
}) => {
  return (
    <FieldSet 
      label="Camera"
      modifier={"filled"}>
      <TextSliderControl
        label="Field of View"
        type="range"
        min={40}
        max={100}
        step={1}
        value={state.camera.fov}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({
            type: "SET_CAMERA",
            camera: {
              fov: e.target.valueAsNumber
            }
          })
        }} />
      <TextSliderControl
        label="Rotation Speed"
        type="range"
        min={0}
        max={2}
        step={0.1}
        value={state.controls.autoRotateSpeed}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({
            type: "SET_CONTROLS",
            controls: {
              autoRotateSpeed: e.target.valueAsNumber
            }
          })
        }} />
    </FieldSet>
  );
};

export default CameraControls;
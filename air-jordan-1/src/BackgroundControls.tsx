import chroma from "chroma-js";
import { Action, Background, Camera } from "./reducer";
import FieldSet from "./FieldSet";
import TextColorControl from "./TextColorControl";
import Control from "./Control";

const BackgroundControls = ({
  state,
  dispatch
}: {
  state: Background;
  dispatch: (action: Action) => void;
}) => {

  const getBackgroundMode = (color: string) => {
    const black = "#000000";
    const white = "#ffffff";

    const whiteOnColor = chroma.contrastAPCA(white, color);
    const blackOnColor = chroma.contrastAPCA(black, color);

    return Math.abs(whiteOnColor) > Math.abs(blackOnColor) 
      ? "dark" 
      : "light";
  }

  return (
    <FieldSet 
      label="Background"
      modifier={"filled"}>
      <TextColorControl
        label="Color"
        value={state.color}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({
            type: "SET_BACKGROUND",
            background: {
              color: e.target.value,
              mode: getBackgroundMode(e.target.value)
            }
          })
        }}
      />
    </FieldSet>
  );
};

export default BackgroundControls;
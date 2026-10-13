import { State, Action } from "./reducer";
import { Recorder } from './useRecorder';
import CameraControls from "./CameraControls";
import MaterialControls from "./MaterialControls";
import PlayerControls from './PlayerControls';
import BackgroundControls from "./BackgroundControls";
import ModelControls from "./ModelControls";
import Sidebar from "./Sidebar";

const RightControls = ({
  state,
  dispatch,
  recorderRef
}: {
  state: State;
  dispatch: (action: Action) => void;
  recorderRef: Recorder;
}) => {
  return (
    <Sidebar
      modifier={["right", "bare"]}
      style={{
        background: state.background.color
      }}>
      <div className="c-sidebar__scroll">
        <div className="c-sidebar__group">
          {/* <BackgroundControls
            state={state.background}
            dispatch={dispatch} /> */}
          <ModelControls
            state={state}
            dispatch={dispatch} />
          {
            state.selection.length > 0
            ? <MaterialControls
                selection={state.selection}
                state={state.model}
                dispatch={dispatch} />
            : null
          }
          <CameraControls
            state={state}
            dispatch={dispatch} />
        </div>
      </div>
      {/* <div className="c-sidebar__bottom">
        <div className="c-sidebar__group c-sidebar__group--row">
          <PlayerControls
            playing={state.playing}
            setPlaying={(playing: boolean) => {
              dispatch({
                type: "SET_PLAYING",
                playing
              })
            }}
            recorderRef={recorderRef} />
        </div>
      </div> */}
    </Sidebar>
  );
};

export default RightControls;
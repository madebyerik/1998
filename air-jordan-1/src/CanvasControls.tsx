import chroma from "chroma-js";
import { State, Action } from "./reducer";
import { Recorder } from "./useRecorder";
import Button from "./Button";
import './Canvas.css';
import TextColorControl from "./TextColorControl";
import ColorControl from "./ColorControl";

const CanvasControls = ({
  state, 
  dispatch,
  viewerRef,
  recorderRef
}: {
  viewerRef: React.RefObject<{ resetView: () => void } | null>;
  recorderRef: Recorder;
  state: State;
  dispatch: (action: Action) => void;
}) => {

  const handleRecorder = () => {
    if (state.playing) recorderRef.recording ? recorderRef.stop() : recorderRef.start();
    else recorderRef.snapshot();
  };

  const getBackgroundMode = (color: string) => {
    const black = "#000000";
    const white = "#ffffff";

    const whiteOnColor = chroma.contrastAPCA(white, color);
    const blackOnColor = chroma.contrastAPCA(black, color);

    return Math.abs(whiteOnColor) > Math.abs(blackOnColor) 
      ? "dark" 
      : "light";
  };

  const handleDisplayToggle = () => {
    dispatch({
      type: "SET_MODEL",
      model: {
        display: {
          ...state.model.display,
          position: state.model.display.position === "flat" ? "hover" : "flat"
        }
      }
    })
  };

  const colors = state.selection.map(key => state.model[key as keyof Omit<Model, "display">]?.color).filter(Boolean);
  const allSameColor = colors.every(c => c === colors[0]);
  const displayColor = allSameColor ? colors[0] : "";

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    const modelUpdate: Record<string, Material> = {};

    state.selection.forEach(key => {
      modelUpdate[key] = {
        ...state.model[key as keyof Omit<Model, "display">],
        color: newColor
      };
    });

    dispatch({
      type: "SET_MODEL",
      model: modelUpdate
    });
  };

  return (
    <>
      <div className="c-canvas__controls c-canvas__controls--top c-canvas__controls--left">
        <ColorControl
          value={state.background.color}
          onChange={(e) => {
            dispatch({
              type: "SET_BACKGROUND",
              background: {
                color: e.target.value,
                mode: getBackgroundMode(e.target.value)
              }
            })
          }} />
        <TextColorControl
          preview="none"
          modifier={["bare"]}
          value={state.background.color}
          style={{
            fontSize: 16
          }}
          onChange={(e) => {
            dispatch({
              type: "SET_BACKGROUND",
              background: {
                color: e.target.value,
                mode: getBackgroundMode(e.target.value)
              }
            })
          }} />
      </div>
      <div className="c-canvas__controls c-canvas__controls--top c-canvas__controls--right">
        {
          state.selection.length > 0
          ? <>
              <TextColorControl
                key={state.selection.join(",")}
                preview="none"
                modifier={["bare"]}
                value={displayColor}
                style={{
                  fontSize: 16,
                  textAlign: "right"
                }}
                placeholder={allSameColor ? undefined : "Multi"}
                onChange={handleColorChange} />
              <ColorControl
                value={displayColor}
                onChange={handleColorChange} />
            </>
          : null
        }
      </div>
      <div className="c-canvas__controls c-canvas__controls--bottom c-canvas__controls--left">
        <Button 
          modifier={["circle", "icon"]}
          onClick={() => {
            if (!viewerRef.current) return;
            viewerRef.current.resetView();
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M480-100q-78.85 0-148.2-29.93-69.35-29.92-120.65-81.22-51.3-51.3-81.22-120.65Q100-401.15 100-480h54q0 125 81 215t202 106l-62-62 41-35 146 146q-19 6-40.28 8T480-100Zm38-266v-228h128q17 0 28.5 11.5T686-554v148q0 17-11.5 28.5T646-366H518Zm-244 0v-44h122v-52h-80v-36h80v-52H274v-44h144q10.2 0 17.1 6.9 6.9 6.9 6.9 17.1v180q0 10.2-6.9 17.1-6.9 6.9-17.1 6.9H274Zm290-44h64q6 0 9-3t3-9v-116q0-6-3-9t-9-3h-64v140Zm242-70q0-125-81-215T523-801l62 62-41 35-146-146q19-6 40.28-8t41.72-2q78.85 0 148.2 29.92 69.35 29.93 120.65 81.23 51.3 51.3 81.23 120.65Q860-558.85 860-480h-54Z"/></svg>
        </Button>
      </div>
      <div className="c-canvas__controls c-canvas__controls--bottom c-canvas__controls--center">
        <Button 
          modifier={["circle", "icon", state.model.display.position === "hover" ? "primary" : '']}
          onClick={() => {
            if (!viewerRef.current) return;
            handleDisplayToggle();
          }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M216-570q36.69 0 70.15 13.42 33.46 13.43 60.93 38.89L721.38-160H760q17 0 28.5-11.5T800-200q0-8-1.5-17T788-235L605-418l-71-214-98.23 24.15q-28.77 7.7-52.27-10.73Q360-637 360-666.38V-775l-28-14-153.62 205.62q-2.53 3.3-4.07 6.5-1.54 3.19-2.93 6.88H216Zm0 60h-49.08q2.62 9.69 7.5 18 4.89 8.31 12.81 15.23L512-181q11 11 25 16t29 5h68.23L305.92-474.31q-18.15-18.15-41.57-26.92Q240.92-510 216-510Zm350 410q-26.15 0-49.88-9.46-23.73-9.46-43.66-27.16l-325-295q-40.23-37-45.15-90.3-4.92-53.31 27.46-97.16l154.39-206q12.76-17.23 33.96-22.8 21.19-5.58 40.65 4.96l28.38 14q16 8.31 24.43 22.5Q420-792.23 420-775v109.77l99-25.54q22.69-6.07 43.38 5.58 20.7 11.65 28.39 33.73l66.54 200.23 173.46 173.46q16.92 16.92 23.07 36.46Q860-221.77 860-200q0 41.54-29.04 70.77Q801.92-100 760-100H566Z"/></svg>
        </Button>
      </div>
      <div className="c-canvas__controls c-canvas__controls--bottom c-canvas__controls--right">
        <Button
          modifier={["icon", "circle"]}
          onClick={() => {
            dispatch({
              type: "SET_PLAYING",
              playing: !state.playing
            })
          }}>
          {
            state.playing
            ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z"/></svg>
            : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M320-200v-560l440 280-440 280Z"/></svg>
          }
        </Button>
        {/* <Button
          modifier={["icon", "circle", ...[recorderRef.recording ? "text-red" : []] as string[]]}
          onClick={handleRecorder}>
          {
            recorderRef.recording
            ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M333-333h294v-294H333v294Zm147.17 233q-78.81 0-148.21-29.91T211.23-211.1q-51.34-51.28-81.28-120.59Q100-401.01 100-479.83q0-79.07 29.97-148.69t81.35-121.13q51.38-51.5 120.59-80.92Q401.13-860 479.83-860q79.06 0 148.67 29.39 69.62 29.39 121.13 80.85 51.52 51.46 80.94 121.02Q860-559.18 860-480.09t-29.39 148.15q-29.39 69.06-80.84 120.49-51.44 51.44-120.98 81.45-69.55 30-148.62 30Zm-.17-54q136.51 0 231.26-94.74Q806-343.49 806-480t-94.74-231.26Q616.51-806 480-806t-231.26 94.74Q154-616.51 154-480t94.74 231.26Q343.49-154 480-154Zm0-326Z"/></svg>
            : !state.playing
              ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M480-294q61.5 0 103.75-42.25T626-440q0-61.5-42.25-103.75T480-586q-61.5 0-103.75 42.25T334-440q0 61.5 42.25 103.75T480-294Zm-.28-54Q440-348 414-374.08q-26-26.07-26-65.5 0-39.42 26.08-65.92 26.07-26.5 65.5-26.5 39.42 0 65.92 26.28t26.5 66Q572-400 545.72-374t-66 26ZM186-140q-36.73 0-61.36-24.64Q100-189.27 100-226v-428q0-36.72 24.64-61.36Q149.27-740 186-740h111l82-80h202l82 80h111q36.72 0 61.36 24.64T860-654v428q0 36.73-24.64 61.36Q810.72-140 774-140H186Zm0-54h588q14 0 23-9t9-23v-428q0-14-9-23t-23-9H642l-82-80H399l-80 80H186q-14 0-23 9t-9 23v428q0 14 9 23t23 9Zm294-246Z"/></svg>
              : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M199-182q-36.73 0-61.36-24.64Q113-231.27 113-268v-424q0-36.72 24.64-61.36Q162.27-778 199-778h424q36.72 0 61.36 24.64T709-692v174l138-138v352L709-442v174q0 36.73-24.64 61.36Q659.72-182 623-182H199Zm0-54h424q14 0 23-9t9-23v-424q0-14-9-23t-23-9H199q-14 0-23 9t-9 23v424q0 14 9 23t23 9Zm-32 0v-488 488Z"/></svg>
          }
        </Button> */}
      </div>
    </>
  );
};

export default CanvasControls;
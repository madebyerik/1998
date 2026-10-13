import { useRef, useReducer } from "react";
import reducer from "./reducer";
import { ViewerHandle } from "./viewer/Viewer";
import useRecorder from "./useRecorder";
import useLocalStorage from "./useLocalStorage";
import Canvas from "./Canvas";
import RightControls from "./RightControls";
import "./App.css";

import PRESETS from "./presets";

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    playing: true,
    background: {
      mode: "light",
      color: "#f2f2f2"
    },
    model: {
      display: {
        position: "flat"
      },
      ...PRESETS[0].model
    },
    selection: [],
    hovered: null,
    camera: {
      fov: 40,
      position: [0, 0, 8]
    },
    controls: {
      target: [0, 0, 0],
      autoRotateSpeed: 1
    },
    lighting: {
      key: { color: "#ffffff", intensity: 2 },
      fill: { color: "#ffffff", intensity: 1 },
      rim: { color: "#ffffff", intensity: 0.75 }
    },
    hydrated: false,
    loading: false
  });

  const viewerRef = useRef<ViewerHandle>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const recorderRef = useRecorder(canvasRef);

  useLocalStorage(
    state, 
    dispatch
  );

  return (
    <main className={`c-app figma-${state.background.mode}`}>
      <section className="c-app__body">
        <Canvas
          state={state}
          dispatch={dispatch}
          viewerRef={viewerRef}
          canvasRef={canvasRef}
          recorderRef={recorderRef} />
        <RightControls
          state={state}
          dispatch={dispatch}
          recorderRef={recorderRef} />
      </section>
    </main>
  );
};

export default App;
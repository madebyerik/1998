import { State, Action } from "./reducer";
import { Recorder } from "./useRecorder";
import Viewer, { ViewerHandle } from "./viewer/Viewer";
import CanvasControls from "./CanvasControls";
import './Canvas.css';

const Canvas = ({
  state, 
  dispatch,
  viewerRef,
  canvasRef,
  recorderRef
}: {
  viewerRef: React.RefObject<ViewerHandle | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  recorderRef: Recorder;
  state: State;
  dispatch: (action: Action) => void;
}) => {
  return (
    <div 
      className={`c-canvas`}
      style={{
        background: state.background.color
      }}>
      <CanvasControls
        state={state}
        dispatch={dispatch}
        recorderRef={recorderRef}
        viewerRef={viewerRef} />
      {
        recorderRef.videoUrl
        ? <div className="c-canvas__overlay">
            <video 
            className="c-app__video-preview"
            style={{
              width: "100%",
              height: "100%"
            }}
            src={recorderRef.videoUrl} 
            controls 
            autoPlay 
            loop />
          </div>
        : null
      }
      {
        recorderRef.recording
        ? <div className="c-canvas__overlay c-canvas__overlay--recording">
            <div className="c-canvas__rec-indicator">
              <span>{recorderRef.time}s</span>
            </div>
          </div>
        : null
      }
      {
        state.loading
        ? <div className="c-canvas__overlay c-canvas__overlay--loading">
            <div className="loader">
              <div className="loader__top" />
              <div className="loader__middle" />
              <div className="loader__bottom" />
            </div>
          </div>
        : null
      }
      <Viewer
        ref={viewerRef}
        canvasRef={canvasRef}
        state={state}
        dispatch={dispatch} />
    </div>
  );
};

export default Canvas;
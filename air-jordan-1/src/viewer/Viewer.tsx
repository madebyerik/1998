import * as THREE from "three";
import { Canvas, ThreeEvent } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Center } from "@react-three/drei";
import { Suspense, useMemo, useRef, forwardRef, useCallback, useImperativeHandle } from "react";
import { Action, State } from "../reducer";

import Lights from "./Lights";
import ShoeModel from "./ShoeModel";
import ToolTip from "./Tooltip";
import Effects from "./Effects";
import Shadows from "./Shadows";
import usePointer from "./usePointer";

const DEFAULT_CAMERA_POS: [number, number, number] = [0, 0, 8];
const DEFAULT_CONTROLS_TAR: [number, number, number] = [0, 0, 0];

export type ViewerHandle = {
  resetView: () => void;
};

interface ViewerProps {
  state: State;
  dispatch: (action: Action) => void;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

const Viewer = forwardRef<ViewerHandle, ViewerProps>(({ 
  state,
  dispatch,
  canvasRef
}, ref) => {
  const { cursor, pointerHandlers } = usePointer(state, dispatch);
  const controlsRef = useRef<any>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  const initialCameraPos = useMemo(
    () => state.camera.position as [number, number, number],
    [state.hydrated]
  );
  const initialControlsTar = useMemo(
    () => state.controls.target as [number, number, number],
    [state.hydrated]
  );

  const resetView = useCallback(() => {
    if (!controlsRef.current || !cameraRef.current) return;

    cameraRef.current.position.set(...DEFAULT_CAMERA_POS);
    cameraRef.current.quaternion.identity();
    cameraRef.current.updateProjectionMatrix();

    controlsRef.current.target.set(...DEFAULT_CONTROLS_TAR);
    controlsRef.current.update();

    dispatch({ 
      type: "SET_VIEW", 
      camera: { position: DEFAULT_CAMERA_POS },
      controls: { target: DEFAULT_CONTROLS_TAR }
    });
  }, [dispatch]);

  const handleControlsChange = useCallback(() => {
    if (!cameraRef.current || !controlsRef.current) return;
    const { x, y, z } = cameraRef.current.position;
    const { x: tx, y: ty, z: tz } = controlsRef.current.target;
    dispatch({
      type: "SET_VIEW",
      camera: { position: [x, y, z] },
      controls: { target: [tx, ty, tz] }
    });
  }, [dispatch]);

  useImperativeHandle(ref, () => ({
    resetView
  }));

  return (
    <>
      <Canvas
        ref={canvasRef}
        shadows
        gl={{ preserveDrawingBuffer: true }}
        onPointerMissed={pointerHandlers.missed}>
        <color attach="background" args={[state.background.color]} />
        <PerspectiveCamera 
          ref={cameraRef}
          makeDefault 
          fov={state.camera.fov}
          near={0.01}
          far={1000}
          position={initialCameraPos} />
        <Lights 
          state={state}
          helpers={false}
          outsole={true} />
        <Suspense fallback={null}>
          <Center>
            <ShoeModel 
              state={state}
              meshProps={{
                onPointerDown: (e: ThreeEvent<PointerEvent>) => pointerHandlers.down(e.object.name, e),
                onPointerMove: pointerHandlers.move,
                onPointerUp: pointerHandlers.up,
                onPointerOver: pointerHandlers.over,
                onPointerOut: pointerHandlers.out
              }} />
            <Shadows 
              state={state} />
          </Center>
        </Suspense>
        <OrbitControls 
          ref={controlsRef}
          enablePan 
          enableZoom
          autoRotate={state.playing}
          autoRotateSpeed={state.controls.autoRotateSpeed}
          onChange={handleControlsChange}
          target={initialControlsTar} />
        <Effects 
          state={state} />
      </Canvas>
      <ToolTip
        state={state}
        cursor={cursor} />
    </>
  );
});

export default Viewer;
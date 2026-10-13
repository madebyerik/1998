import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { EffectComposer, Outline} from "@react-three/postprocessing";
import { State } from "../reducer";
import { BlendFunction } from "postprocessing";
import { useMemo } from "react";

const Effects = ({ 
  state,
}: { 
  state: State;
}) => {
  const { scene } = useThree();
  
  const outlineSelection = useMemo(() => {
    const selectedObjects = state.selection
      .map((name) => scene.getObjectByName(name))
      .filter((obj): obj is THREE.Object3D => obj !== undefined);

    if (state.hovered) {
      const hoveredObj = scene.getObjectByName(state.hovered);
      if (hoveredObj && !selectedObjects.includes(hoveredObj)) {
        selectedObjects.push(hoveredObj);
      }
    }

    return selectedObjects;
  }, [scene, state.selection, state.hovered]);

  // const outlineColor = state.background.mode === "dark" ? 0xffffff : 0x000000;
  // const outlineBlend = state.background.mode === "dark" ? BlendFunction.SCREEN : BlendFunction.ALPHA;

  return (
    <EffectComposer autoClear={false}>
      <Outline
        selection={outlineSelection}
        blendFunction={BlendFunction.SCREEN}
        edgeStrength={10}
        visibleEdgeColor={0xffffff}
        hiddenEdgeColor={0xffffff}
        blur={false}
        xRay />
    </EffectComposer>
  );
};

export default Effects;
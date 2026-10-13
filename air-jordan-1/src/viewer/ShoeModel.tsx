import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useMemo, JSX } from "react";
import { Model, State } from "../reducer";
import { titleCaseToCamelCase } from "./utils";

import MODEL_PATH from "./ShoeModel.glb";

interface ShoeModelProps {
  state: State;
  meshProps?: JSX.IntrinsicElements["mesh"];
}

const ShoeModel = ({ state, meshProps }: ShoeModelProps) => {
  const { nodes } = useGLTF(MODEL_PATH);
  const shoeRef = useRef<THREE.Group>(null);

  const isHovering = state.model.display.position === "hover";

  // Precompute base position and rotation
  const baseTransform = useMemo((): { 
    position: [number, number, number], 
    rotation: [number, number, number]  
  } => {
    if (isHovering) return { 
      position: [0, 0.75, 0], 
      rotation: [0, 0, Math.PI / 12] as [number, number, number] 
    };
    return { 
      position: [0, 0, 0] as [number, number, number], 
      rotation: [0, 0, 0] as [number, number, number] 
    };
  }, [isHovering]);

  // Animate hover motion
  useFrame(({ clock }) => {
    if (!shoeRef.current || !isHovering || !state.playing) return;

    const t = clock.getElapsedTime();
    shoeRef.current.rotation.set(
      Math.cos(t / 4) / 8,
      Math.sin(t / 4) / 8,
      0.2 + (1 + Math.sin(t / 1.5)) / 20
    );
    shoeRef.current.position.y = 0.75 + (1 + Math.sin(t / 1.5)) / 10;
  });

  // Reset position when not playing
  useEffect(() => {
    if (!shoeRef.current || !isHovering || state.playing) return;
    shoeRef.current.position.set(...baseTransform.position);
    shoeRef.current.rotation.set(...baseTransform.rotation);
  }, [state.playing, isHovering, baseTransform]);

  return (
    <group
      ref={shoeRef}
      dispose={null}
      position={baseTransform.position}
      rotation={baseTransform.rotation}>
      {
        Object.values(nodes).map((node) => {
          if (!("isMesh" in node) || !node.isMesh) return null;
          const name = titleCaseToCamelCase(node.name);
          const materialProps = state.model[name as keyof Omit<Model, "display">] ?? { color: "#00FFFF" };

          return (
            <mesh
              key={node.uuid}
              name={name}
              geometry={(node as any).geometry}
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
              castShadow
              receiveShadow
              {...meshProps}>
              <meshStandardMaterial attach="material" {...materialProps} />
            </mesh>
          );
        })
      }
    </group>
  );
};

useGLTF.preload(MODEL_PATH);

export default ShoeModel;
import * as THREE from "three";
import { useRef } from "react";
import { State } from "../reducer";
import { useHelper } from '@react-three/drei';
import { DirectionalLightHelper, SpotLightHelper } from 'three';
import { useThree } from "@react-three/fiber";

const Lights = ({ 
  state, 
  helpers = false,
  outsole = false,
}: { 
  state: State; 
  helpers?: boolean;
  outsole?: boolean;
}) => {
  const { scene } = useThree();
  const { key, fill, rim } = state.lighting;
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const rimRefL = useRef<THREE.DirectionalLight>(null);
  const rimRefR = useRef<THREE.DirectionalLight>(null);
  const outsoleRef = useRef<THREE.SpotLight>(null);

  if (helpers) {
    useHelper(keyRef as React.RefObject<THREE.DirectionalLight>, DirectionalLightHelper);
    useHelper(fillRef as React.RefObject<THREE.DirectionalLight>, DirectionalLightHelper);
    useHelper(rimRefL as React.RefObject<THREE.DirectionalLight>, DirectionalLightHelper);
    useHelper(rimRefR as React.RefObject<THREE.DirectionalLight>, DirectionalLightHelper);
    if (outsole) 
      useHelper(outsoleRef as React.RefObject<THREE.SpotLight>, SpotLightHelper);
  }

  return (
    <group>
      <directionalLight
        name="key" 
        ref={keyRef}
        color={key.color} 
        intensity={key.intensity}
        position={[3.45, 3.17, 4.66]} />
      <directionalLight
        name="fill" 
        ref={fillRef}
        color={fill.color} 
        intensity={fill.intensity}
        position={[-3.45, 3.17, 4.66]} />
      <directionalLight
        name="rim" 
        ref={rimRefL}
        color={rim.color} 
        intensity={rim.intensity}
        position={[-3.45, 3.17, -4.84]} />
      <directionalLight
        name="rim" 
        ref={rimRefR}
        color={rim.color} 
        intensity={rim.intensity}
        position={[3.45, 3.17, -4.84]} />
      {
        outsole
        ? <spotLight 
            ref={outsoleRef}
            position={[0, -8, 0]} 
            decay={0}
            penumbra={0}
            angle={Math.PI/2}
            target={scene.getObjectByName("outsole")} 
            intensity={1.5}
          />
        : null
      }
    </group>
  );
};

export default Lights;
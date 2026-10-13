import { AccumulativeShadows, RandomizedLight, ContactShadows } from "@react-three/drei";
import { useMemo } from "react";
import { State } from "../reducer";

const Shadows = ({
  state
}: {
  state: State;
}) => {
  return useMemo(() => (
    state.model.display.position === "hover"
    ? <ContactShadows
        position={[0, -0.09, 0]}
        scale={15}
        far={2.5}
        blur={1}
        opacity={0.75}
        frames={20} />
    : <AccumulativeShadows 
        position={[0, -0.09, 0]} 
        temporal={false} 
        frames={100}
        scale={15}>
        <RandomizedLight 
          amount={4} 
          radius={3} 
          ambient={0.5}
          position={[5, 6, 5]} 
          bias={0.001} 
        />
      </AccumulativeShadows>
  ), [state.model.display.position]);
};

export default Shadows;
import { ThreeEvent } from "@react-three/fiber";
import { useRef,useCallback, useState } from "react";
import { Action, State } from "../reducer";

const usePointer = (state: State, dispatch: (a: Action) => void) => {
  const [cursor, setCursor] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const pointer = useRef({ 
    isDragging: false, 
    startX: 0, 
    startY: 0, 
    meshName: null as string | null 
  });

  const handlePointerDown = useCallback((meshName: string, e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    pointer.current = { 
      isDragging: false, 
      startX: e.clientX, 
      startY: e.clientY, 
      meshName 
    };
  }, []);

  const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    const dx = Math.abs(e.clientX - pointer.current.startX);
    const dy = Math.abs(e.clientY - pointer.current.startY);
    if (dx > 2 || dy > 2) pointer.current.isDragging = true;
    setCursor({ x: e.clientX, y: e.clientY });
  }, []);

  const handlePointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
    const meshName = pointer.current.meshName;
    if (!meshName) return;

    if (state.selection.includes(meshName) && pointer.current.isDragging) return;

    const isMulti = e.shiftKey;
    const newSelection = isMulti
      ? state.selection.includes(meshName)
        ? state.selection.filter(n => n !== meshName)
        : [...state.selection, meshName]
      : [meshName];

    dispatch({ type: "SET_SELECTION", selection: newSelection });
    pointer.current.meshName = null;
  }, [state.selection, dispatch]);

  const handlePointerOver = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    dispatch({ type: "SET_HOVERED", hovered: e.object.name });
  }, [dispatch]);

  const handlePointerOut = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    dispatch({ type: "SET_HOVERED", hovered: null });
  }, [dispatch]);

  const handlePointerMissed = useCallback((e: MouseEvent) => {
    if (state.selection.length === 0 || e.shiftKey) return;
    dispatch({
      type: "SET_SELECTION",
      selection: []
    });
  }, [state.selection, dispatch]);

  return { 
    cursor,
    pointerHandlers: {
      down: handlePointerDown, 
      move: handlePointerMove, 
      up: handlePointerUp,
      over: handlePointerOver,
      out: handlePointerOut,
      missed: handlePointerMissed
    }
  };
};

export default usePointer;
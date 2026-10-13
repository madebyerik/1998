export type BackgroundMode = "light" | "dark";

export type Background = {
  mode: BackgroundMode;
  color: string;
};

export type Camera = {
  fov: number;
  position: [number, number, number];
};

export type Controls = {
  target: [number, number, number];
  autoRotateSpeed: number;
};

export type Material = {
  color: string;
  metalness: number;
  roughness: number;
};

export type Light = {
  color: string;
  intensity: number;
};

export type Lighting = {
  key: Light;
  fill: Light;
  rim: Light;
};

export type ModelPosition = "flat" | "hover";

export type Model = {
  display: {
    position: ModelPosition;
  };
  collar: Material;
  collarLining: Material;
  collarLogo: Material;
  collarOverlay: Material;
  eyestay: Material;
  heel: Material;
  heelTab: Material;
  lace: Material;
  midsole: Material;
  midsoleStitch: Material;
  outsole: Material;
  quarter: Material;
  quarterOverlay: Material;
  swoosh: Material;
  toe: Material;
  tongue: Material
  tongueLabel: Material;
  vamp: Material;
};

export type State = {
  playing: boolean;
  background: Background;
  model: Model;
  selection: string[];
  hovered: string | null;
  camera: Camera;
  controls: Controls;
  lighting: Lighting;
  hydrated: boolean;
  loading: boolean;
};

export type Action = 
  | { type: "HYDRATE_STATE"; state: State } 
  | { type: "SET_PLAYING", playing: boolean } 
  | { type: "SET_BACKGROUND", background: Background } 
  | { type: "SET_MODEL"; model: Partial<Model> }
  | { type: "SET_SELECTION"; selection: string[] }
  | { type: "SET_HOVERED"; hovered: string | null }
  | { type: "SET_CAMERA"; camera: Partial<Camera> }
  | { type: "SET_CONTROLS"; controls: Partial<Controls> }
  | { type: "SET_VIEW"; camera: Partial<Camera>, controls: Partial<Controls> }
  | { type: "SET_MATERIAL"; material: Partial<Material> }
  | { type: "SET_LIGHT"; key: "key" | "fill" | "rim", light: Partial<Light> }
  | { type: "SET_LOADING", loading: boolean } 
  

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "HYDRATE_STATE": return { ...state, ...action.state, hydrated: true };
    case "SET_PLAYING": return { ...state, playing: action.playing };
    case "SET_BACKGROUND": return { 
      ...state, 
      background: action.background
    };
    case "SET_MODEL": return { 
      ...state, 
      model: { ...state.model, ...action.model }
    };
    case "SET_SELECTION": return { 
      ...state, 
      selection: action.selection
    };
    case "SET_HOVERED": return { 
      ...state, 
      hovered: action.hovered
    };
    case "SET_CAMERA": return { 
      ...state, 
      camera: { ...state.camera, ...action.camera }
    };
    case "SET_CONTROLS": return { 
      ...state, 
      controls: { ...state.controls, ...action.controls }
    };
    case "SET_VIEW": return { 
      ...state, 
      camera: { ...state.camera, ...action.camera },
      controls: { ...state.controls, ...action.controls }
    };
    case "SET_LIGHT": return { 
      ...state, 
      lighting: {
        ...state.lighting,
        [action.key]: {
          ...state.lighting[action.key],
          ...action.light
        }
      }
    };
    case "SET_LOADING": return { ...state, loading: action.loading };
    default: return state;
  }
};

export default reducer;
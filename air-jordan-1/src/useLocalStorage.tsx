import { useEffect } from "react";
import { State, Action } from "./reducer";

const STORAGE_KEY = "air-jordan-1";

const useLocalStorage = (
  state: State,
  dispatch: (action: Action) => void
) => {
  // Load on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);

        // Ensure collection exists
        const model = parsed.model ?? state.model;

        dispatch({
          type: "HYDRATE_STATE",
          state: {
            ...state,
            model
          }
        });
      }
    } catch (e) {
      console.error("Failed to parse localStorage cache", e);
    }
  }, []);

  // Save whenever collection changes
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ model: state.model })
      );
    } catch (e) {
      console.error("Failed to save localStorage cache", e);
    }
  }, [state.model]);
};

export default useLocalStorage;
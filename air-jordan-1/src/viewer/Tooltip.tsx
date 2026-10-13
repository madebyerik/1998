import { Model, State } from "../reducer";
import { camelCaseToTitleCase } from "../helpers";

const ToolTip = ({ 
  state,
  cursor
}: { 
  state: State;
  cursor: { x: number, y: number }
}) => {
  return (
    state.hovered
    ? <div
        className="c-canvas__tooltip"
        style={{
          position: "fixed",
          left: cursor.x + 12,
          top: cursor.y + 12
        }}>
        <span
          style={{
            width: 8,
            height: 8,
            background: state.model[state.hovered as keyof Omit<Model, "display">].color,
            borderRadius: 8,
            boxShadow: `0 0 0 1px inset ${state.background.mode === "dark" ? `rgba(0,0,0,0.5)` : `rgba(255,255,255,0.5)`}`
          }} />
        <span>{camelCaseToTitleCase(state.hovered)}</span>
        {
          state.selection.includes(state.hovered)
          ? <>
              <span>(Selected)</span>
              {
                state.selection.length > 1
                ? <span style={{opacity: 0.5}}>{`+${state.selection.length - 1}`}</span>
                : null
              }
            </>
          : null
        }

      </div>
    : null
  );
};

export default ToolTip;
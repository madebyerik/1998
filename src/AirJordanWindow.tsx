import IFrameWindow from "./IframeWindow";

import "./AirJordanWindow.css";

const AirJordanWindow = () => {
  return (
    <IFrameWindow
      windowType="air-jordan-1"
      iframeSrc="./air-jordan-1/index.html"
      className="c-air-jordan-window" />
  );
};

export default AirJordanWindow;

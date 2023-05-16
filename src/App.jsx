/* eslint-disable no-unused-vars */

import { useRef } from "react";
import "./App.css";
import { Stage, Layer, Arrow, Text } from "react-konva";

import FakeCard from "./FakeCard";
import Zoom from "./Zoom";

import { getCenter, getDistance } from "./utils";

const SCALE_SPEED = 1.05;

const App = () => {
  const stageRef = useRef(null);

  const zoomStage = (e) => {
    e.evt.preventDefault();
    if (stageRef.current !== null) {
      const stage = stageRef.current;
      const oldScale = stage.scaleX();
      const { x: pointerX, y: pointerY } = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointerX - stage.x()) / oldScale,
        y: (pointerY - stage.y()) / oldScale,
      };
      const newScale =
        e.evt.deltaY > 0 ? oldScale * SCALE_SPEED : oldScale / SCALE_SPEED;
      stage.scale({ x: newScale, y: newScale });
      const newPos = {
        x: pointerX - mousePointTo.x * newScale,
        y: pointerY - mousePointTo.y * newScale,
      };
      stage.position(newPos);
      stage.batchDraw();
    }
  };

  // TODO: test with https://www.npmjs.com/package/json-server to get/save data from/in a json file

  return (
    <>
      <Zoom stage={stageRef} />
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onWheel={zoomStage}
        // TODO: find a better solution to change cursor on drag cuz this is affect to all the stage
        onMouseDown={(e) => {
          const container = e.target.getStage().container();
          const content = container.querySelector(".konvajs-content");
          content.style.cursor = "grabbing";
        }}
        onMouseUp={(e) => {
          const container = e.target.getStage().container();
          const content = container.querySelector(".konvajs-content");
          content.style.cursor = "grab";
        }}
        // TODO: enable panning only on space key press like figma
        draggable
      >
        <Layer>
          <Text
            text="TODO: Enable panning only on space key press like figma? + move arrows on Cards drag"
            fontSize={15}
            x={800}
            y={32}
          />
          {/* <Rect draggable width={120} height={120} fill="red" x={200} y={360} /> */}

          <FakeCard x={100} y={100} title="Card 1" />
          {
            // TODO: update arrow coordinates on FakeCards drag + calculate arrow start and end
            //
          }
          <Arrow points={[100, 100, 500, 180]} stroke="black" />
          <FakeCard x={500} y={180} title="Card 2" />
        </Layer>
      </Stage>
    </>
  );
};

export default App;

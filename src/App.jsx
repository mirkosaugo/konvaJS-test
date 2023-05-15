/* eslint-disable no-unused-vars */

import { useRef } from "react";
import "./App.css";
import { Stage, Layer, Arrow, Group } from "react-konva";

import FakeCard from "./FakeCard";

import { getCenter, getDistance } from "./utils";

const SCALE_SPEED = 1.05;

const App = () => {
  const stageRef = useRef(null);
  let lastCenter = null;
  let lastDist = 0;

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

  const handleTouch = (e) => {
    e.evt.preventDefault();
    var touch1 = e.evt.touches[0];
    var touch2 = e.evt.touches[1];
    const stage = stageRef.current;
    if (stage !== null) {
      if (touch1 && touch2) {
        if (stage.isDragging()) {
          stage.stopDrag();
        }

        var p1 = {
          x: touch1.clientX,
          y: touch1.clientY,
        };
        var p2 = {
          x: touch2.clientX,
          y: touch2.clientY,
        };

        if (!lastCenter) {
          lastCenter = getCenter(p1, p2);
          return;
        }
        var newCenter = getCenter(p1, p2);

        var dist = getDistance(p1, p2);

        if (!lastDist) {
          lastDist = dist;
        }

        // local coordinates of center point
        var pointTo = {
          x: (newCenter.x - stage.x()) / stage.scaleX(),
          y: (newCenter.y - stage.y()) / stage.scaleX(),
        };

        var scale = stage.scaleX() * (dist / lastDist);

        stage.scaleX(scale);
        stage.scaleY(scale);

        // calculate new position of the stage
        var dx = newCenter.x - lastCenter.x;
        var dy = newCenter.y - lastCenter.y;

        var newPos = {
          x: newCenter.x - pointTo.x * scale + dx,
          y: newCenter.y - pointTo.y * scale + dy,
        };

        stage.position(newPos);
        stage.batchDraw();

        lastDist = dist;
        lastCenter = newCenter;
      }
    }
  };

  const handleTouchEnd = () => {
    lastCenter = null;
    lastDist = 0;
  };

  const handleRecenter = () => {
    const stage = stageRef.current;
    if (stage !== null) {
      stage.position({ x: 0, y: 0 });
      stage.scale({ x: 1, y: 1 });
    }
  };

  const handleZoom = (zoom) => {
    const stage = stageRef.current;
    if (stage !== null) {
      const oldScale = stage.scaleX();
      console.log(oldScale);
      const newScale = oldScale + zoom;
      console.log(newScale);
      stage.scale({ x: newScale, y: newScale });
      stage.batchDraw();
    }
  };

  console.log(stageRef);

  return (
    <>
      <div
        style={{
          zIndex: 100,
          position: "absolute",
          bottom: "42px",
          top: "initial",
          left: "initial",
          right: "50px",
          display: "flex",
          gap: "10px",
        }}
      >
        <button
          onClick={() => handleZoom(0.1)}
          style={{
            color: "white",
            backgroundColor: "blue",
          }}
        >
          +
        </button>
        <button
          onClick={handleRecenter}
          style={{
            backgroundColor: "red",
          }}
        >
          Recenter
        </button>
        <button
          onClick={() => handleZoom(-0.1)}
          style={{
            color: "white",
            backgroundColor: "blue",
          }}
        >
          -
        </button>
      </div>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        // enable the following to make the stage zoomable with wheel
        onWheel={zoomStage}
        onTouchMove={handleTouch}
        onTouchEnd={handleTouchEnd}
        // enable the previews lines to make the stage zoomable
        draggable
      >
        <Layer>
          {/* <Text text="Some text on canvas" fontSize={15} x={800} y={32} /> */}
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

/* eslint-disable react/prop-types */
import { Rect, Group } from "react-konva";

import { Html } from "react-konva-utils";

import DragIcon from "./DragIcon";

// add this to shape props to force a different cursor
const dragStuff = () => {
  return {
    onMouseEnter: (e) => {
      const container = e.target.getStage().container();
      container.style.cursor = "move";
    },
    onMouseLeave: (e) => {
      const container = e.target.getStage().container();
      container.style.cursor = "default";
    },
  };
};

function FakeCard({ x = 0, y = 0, title = "Title" }) {
  return (
    <Group draggable x={x} y={y}>
      <Html
        divProps={{
          className: "some-css-class",
          position: "relative",
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            backgroundColor: "lightgrey",
            padding: "20px",
          },
        }}
      >
        <h4 style={{ margin: 0 }}>{title}</h4>
        <input placeholder="DOM input from Konva nodes" />
        <textarea placeholder="write something..." />
        <DragIcon />
      </Html>
      <Rect x={0} y={-32} width={32} height={32} {...dragStuff()} />
    </Group>
  );
}

export default FakeCard;

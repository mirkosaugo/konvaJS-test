/* eslint-disable react/prop-types */

function Zoom({ stage: stageRef }) {
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
  return (
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
  );
}

export default Zoom;

import React, { useState } from 'react';

const DrawingBoard = () => {
  const [drawing, setDrawing] = useState(false);
  const [shape, setShape] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setDrawing(true);
    setCoords({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    if (shape === 'pencil') {
      ctx.moveTo(coords.x, coords.y);
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
      setCoords({ x: e.clientX, y: e.clientY });
    } else if (shape === 'rectangle') {
      ctx.rect(coords.x, coords.y, e.clientX - coords.x, e.clientY - coords.y);
      ctx.stroke();
    } else if (shape === 'circle') {
      ctx.arc(coords.x, coords.y, Math.sqrt(Math.pow(e.clientX - coords.x, 2) + Math.pow(e.clientY - coords.y, 2)), 0, 2 * Math.PI);
      ctx.stroke();
    }
  };

  const handleMouseUp = (e) => {
    setDrawing(false);
  };

  const handleSelectShape = (e) => {
    setShape(e.target.value);
  };

  return (
    <div>
      <canvas
        id={"drawing-canvas"}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={(canvas) => {
          canvas = canvas;
        }}
      />
      <div>
        <label>
          <input type="radio" name="shape" value="pencil" onClick={handleSelectShape} /> Pencil
        </label>
        <label>
          <input type="radio" name="shape" value="rectangle" onClick={handleSelectShape} /> Rectangle
        </label>
        <label>
          <input type="radio" name="shape" value="circle" onClick={handleSelectShape} /> Circle
        </label>
      </div>
    </div>
  );
};
export default DrawingBoard

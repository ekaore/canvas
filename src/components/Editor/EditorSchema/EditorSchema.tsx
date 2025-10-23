import React, { useState } from "react";
import { CouplingSchemaProps } from "../EditorSchema/EditorSchema.types";
import {
  EditorSchemaBoxContainer,
} from "./EditorSchema.styles";

export const EditorSchema: React.FC<CouplingSchemaProps> = ({
  couplings,
  setCouplings,
  scale,
  setScale,
  offset,
}) => {
  const [dragged, setDragged] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.1), 5));
  };

  const handleMouseDown = (id: string, e: React.MouseEvent<SVGElement>) => {
    const c = couplings.find((c) => c.id === id);
    if (!c) return;

    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const scaleX = 4350 / rect.width;
    const scaleY = 4350 / rect.height;

    setDragged(id);
    setDragOffset({
      x: (e.clientX - rect.left) * scaleX - c.position.x,
      y: (e.clientY - rect.top) * scaleY - c.position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragged) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = 4350 / rect.width;
    const scaleY = 4350 / rect.height;

    const newPos = {
      x: (e.clientX - rect.left) * scaleX - dragOffset.x,
      y: (e.clientY - rect.top) * scaleY - dragOffset.y,
    };

    const dragData = couplings.find((c) => c.id === dragged);
    if (!dragData) return;

    const deltaX = newPos.x - dragData.position.x;
    const deltaY = newPos.y - dragData.position.y;

    setCouplings((prev) =>
      prev.map((c) => ({
        ...c,
        position: {
          x: c.position.x + deltaX,
          y: c.position.y + deltaY,
        },
      }))
    );
  };

  const handleMouseUp = () => setDragged(null);

  return (
    <EditorSchemaBoxContainer>
      <svg
        width="1000"
        height="600"
        viewBox="0 0 4350 4350"
        style={{ border: "2px solid #9e9e9e" }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        <g transform={`scale(${scale}) translate(${offset.x}, ${offset.y})`}>
          <circle
            cx="2167"
            cy="2180"
            r="2175"
            fill="#FFFF00"
            stroke="#ff0000"
            strokeWidth="2"
          />
          {couplings.map((c, i) => {
            const isDragging = dragged === c.id;
            return (
              <g key={c.id}>
                <rect
                  x={c.position.x - 15}
                  y={c.position.y - 25}
                  width={150}
                  height={200}
                  fill={isDragging ? "#333" : "#000"}
                  stroke={isDragging ? "#fff" : "none"}
                  strokeWidth={isDragging ? 2 : 0}
                  onMouseDown={(e) => handleMouseDown(c.id, e)}
                  style={{ cursor: "move" }}
                />
                <text
                  x={c.position.x + 60}
                  y={c.position.y + 75}
                  fontSize="50"
                  fill="#fff"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontWeight="bold"
                  transform={`rotate(-90 ${c.position.x + 60} ${c.position.y + 75})`}
                  onMouseDown={(e) => handleMouseDown(c.id, e)}
                  style={{ cursor: "move" }}
                >
                  {(i + 1).toString().padStart(2, "0")}-
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </EditorSchemaBoxContainer>
  );
};

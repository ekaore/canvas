import React, { useState } from "react";
import { CouplingSchemaProps } from "../EditorSchema/EditorSchema.types";
import { EditorSchemaBoxContainer } from "./EditorSchema.styles";
import { useAppDispatch } from "../../../app/hook";
import {
  updateCouplingPosition,
  setCouplings,
} from "../../../entities/canvas/couplingSlice";

export const EditorSchema = ({
  couplings,
  scale,
  setScale,
  offset,
  setOffset,
}: CouplingSchemaProps) => {
  const [dragged, setDragged] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [prevMouse, setPrevMouse] = useState<{ x: number; y: number } | null>(
    null
  );

  const dispatch = useAppDispatch();

  // --- Зум ---
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Нормализуем координаты мыши относительно SVG
    const normalizedX = (mouseX / rect.width) * 4350;
    const normalizedY = (mouseY / rect.height) * 4350;
    
    // Определяем направление зума
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.min(Math.max(scale * zoomFactor, 0.1), 5);
    
    if (newScale !== scale) {
      // Вычисляем новый offset для центрирования зума относительно позиции мыши
      const newOffsetX = normalizedX - (normalizedX - offset.x) * (newScale / scale);
      const newOffsetY = normalizedY - (normalizedY - offset.y) * (newScale / scale);
      
      setScale(newScale);
      setOffset({ x: newOffsetX, y: newOffsetY });
    }
  };

  // --- Начало перетаскивания ---
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

    setPrevMouse({ x: e.clientX, y: e.clientY });
  };

  // --- Движение мыши ---
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragged || !prevMouse) return;

    const dx = e.clientX - prevMouse.x;
    const dy = e.clientY - prevMouse.y;

    if (dx === 0 && dy === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = 4350 / rect.width;
    const scaleY = 4350 / rect.height;

    const deltaX = dx * scaleX;
    const deltaY = dy * scaleY;

    // Двигаем ВСЕ муфты
    const movedCouplings = couplings.map((c) => ({
      ...c,
      position: {
        x: c.position.x + deltaX,
        y: c.position.y + deltaY,
      },
    }));

    dispatch(setCouplings(movedCouplings));

    setPrevMouse({ x: e.clientX, y: e.clientY });
  };

  // --- Отпускание мыши ---
  const handleMouseUp = () => {
    setDragged(null);
    setPrevMouse(null);
  };

  // --- Рендер ---
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
                  {(i + 1).toString().padStart(2, "0") + "-"}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </EditorSchemaBoxContainer>
  );
};

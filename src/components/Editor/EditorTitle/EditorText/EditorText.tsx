import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { selectText, updateText } from "./EditorTextSlice";

interface EditorTextProps {
  id: string;
  x: number;
  y: number;
  text: string;
}

export const EditorText: React.FC<EditorTextProps> = ({ id, x, y, text }) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.text.items.find((t) => t.id === id));

  const [value, setValue] = useState(text);
  const [editing, setEditing] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const gridSize = 10;

  useEffect(() => {
    const svg = document.querySelector("svg");
    if (svg instanceof SVGSVGElement) svgRef.current = svg;
  }, []);

  const toSvgCoords = (clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: clientX, y: clientY };
    const pt = svgRef.current.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const svgP = pt.matrixTransform(svgRef.current.getScreenCTM()?.inverse());
    return { x: svgP.x, y: svgP.y };
  };

  const snapToGrid = (value: number) => Math.round(value / gridSize) * gridSize;

  const handleMouseDown = (e: React.MouseEvent<SVGTextElement>) => {
    if (e.button !== 0 || editing) return;
    setDragging(true);
    dispatch(selectText(id));
    const svgPos = toSvgCoords(e.clientX, e.clientY);
    dragOffset.current = {
      x: svgPos.x - position.x,
      y: svgPos.y - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const svgPos = toSvgCoords(e.clientX, e.clientY);
    const newX = snapToGrid(svgPos.x - dragOffset.current.x);
    const newY = snapToGrid(svgPos.y - dragOffset.current.y);
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    if (dragging) {
      dispatch(updateText({ id, text: value, x: position.x, y: position.y }));
      setDragging(false);
    }
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleDoubleClick = () => setEditing(true);

  const handleBlur = () => {
    setEditing(false);
    dispatch(updateText({ id, text: value }));
  };

  if (!item) return null;

  return (
    <>
      {editing ? (
        <foreignObject x={position.x} y={position.y - 20} width={200} height={40}>
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            style={{
              width: "100%",
              height: "100%",
              fontSize: `${item.fontSize}px`,
              fontWeight: item.fontWeight,
              border: "1px solid #ccc",
              borderRadius: 4,
              padding: "2px 4px",
            }}
          />
        </foreignObject>
      ) : (
        <text
          x={position.x}
          y={position.y}
          fontSize={item.fontSize}
          fontWeight={item.fontWeight}
          onDoubleClick={handleDoubleClick}
          onMouseDown={handleMouseDown}
          style={{
            cursor: "move",
            userSelect: "none",
            fill: item.selected ? "#007bff" : "#000", // Подсветка для выделенного текста
          }}
        >
          {value}
        </text>
      )}
    </>
  );
};
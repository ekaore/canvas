import React, { useRef, useState } from "react";
import { EditorSchemaBoxContainer } from "./EditorSchema.styles";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { setCouplings } from "../../../entities/canvas/couplingSlice";
import { setOffset, setScale, setZoom } from "../../../entities/canvas/schemaSlice"; 
import { Box, Button } from "@mui/material";
import { setCursor } from "../../../entities/canvas/schemaSlice";

export const EditorSchema = () => {
  const [dragged, setDragged] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [prevMouse, setPrevMouse] = useState<{ x: number; y: number } | null>(
    null
  );
  const [gridStep, setGridStep] = useState(10);
  const [snapToGrid, setSnapToGrid] = useState(true);

  const couplings = useAppSelector((state) => state.coupling.couplings);
  const { scale, offset } = useAppSelector((state) => state.editorSchema);
  const dispatch = useAppDispatch();
  const svgRef = useRef<SVGSVGElement>(null);
  // const svgRef = useRef<SVGSVGElement>(null); // 👈 ссылка на SVG

  // --- Snap to Grid ---
  const snapToGridPosition = (x: number, y: number) => {
    if (!snapToGrid) return { x, y };
    
    const snappedX = Math.round(x / gridStep) * gridStep;
    const snappedY = Math.round(y / gridStep) * gridStep;
    
    return { x: snappedX, y: snappedY };
  };

  // --- Зум ---
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
  
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const normalizedX = (mouseX / rect.width) * 2000;
    const normalizedY = (mouseY / rect.height) * 2000;
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    const newScale = Math.min(Math.max(scale * zoomFactor, 0.1), 5);
  
    if (newScale !== scale) {
      const newOffsetX =
        normalizedX - (normalizedX - offset.x) * (newScale / scale);
      const newOffsetY =
        normalizedY - (normalizedY - offset.y) * (newScale / scale);
  
      // --- Обновляем масштаб ---
      dispatch(setScale(newScale));
  
      // --- Обновляем зум (чтобы показывался в статусной строке) ---
      dispatch(setZoom(newScale));
  
      // --- Обновляем смещение ---
      dispatch(setOffset({ x: newOffsetX, y: newOffsetY }));
    }
  };

  const hendl = () => {

  }
  

  // --- Драг ---
  const handleMouseDown = (id: string, e: React.MouseEvent<SVGElement>) => {
    const c = couplings.find((c) => c.id === id);
    if (!c) return;
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = 2000 / rect.width;
    const scaleY = 2000 / rect.height;
    setDragged(id);
    setDragOffset({
      x: (e.clientX - rect.left) * scaleX - c.position.x,
      y: (e.clientY - rect.top) * scaleY - c.position.y,
    });
    setPrevMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!dragged || !prevMouse) return;
    const dx = e.clientX - prevMouse.x;
    const dy = e.clientY - prevMouse.y;
    if (dx === 0 && dy === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = 2000 / rect.width;
    const scaleY = 2000 / rect.height;
    const deltaX = dx * scaleX;
    const deltaY = dy * scaleY;
    
    // Перемещаем все муфты вместе с прилипанием к сетке
    const movedCouplings = couplings.map((c) => {
      const newX = c.position.x + deltaX;
      const newY = c.position.y + deltaY;
      const snappedPosition = snapToGridPosition(newX, newY);
      
      return {
        ...c,
        position: snappedPosition,
      };
    });
    
    dispatch(setCouplings(movedCouplings));
    setPrevMouse({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setDragged(null);
    setPrevMouse(null);
  };

  // --- Сохранить SVG ---
  const handleSaveSVG = () => {
    if (!svgRef.current) return;
    
    // Создаем копию SVG без сетки
    const svgClone = svgRef.current.cloneNode(true) as SVGSVGElement;
    
    // Удаляем все элементы сетки из клона
    const gridElements = svgClone.querySelectorAll('defs, rect[fill="url(#grid)"]');
    gridElements.forEach(element => element.remove());
    
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgClone);

    const blob = new Blob(
      ['<?xml version="1.0" encoding="UTF-8"?>\n', source],
      { type: "image/svg+xml;charset=utf-8" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "schema.svg";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.couplings) dispatch(setCouplings(json.couplings));
        if (json.scale) dispatch(setScale(json.scale));
        if (json.offset) dispatch(setOffset(json.offset));
      } catch (err) {
        console.error("Ошибка при импорте JSON:", err);
        alert("Невозможно импортировать файл. Проверьте формат JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <EditorSchemaBoxContainer>
      <Box display="flex" gap={2} mb={2}>
        <select
          value={gridStep}
          onChange={(e) => setGridStep(Number(e.target.value))}
          style={{ padding: "4px", borderRadius: "4px" }}
        >
          <option value={8}>8px</option>
          <option value={10}>10px</option>
          <option value={20}>20px</option>
        </select>
      </Box>

      <Box>
        <svg
          ref={svgRef}
          width="1100"
          height="800"
          viewBox="0 0 2000 2000"
          style={{ border: "2px solid #9e9e9e" }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
        >
          <g transform={`scale(${scale}) translate(${offset.x}, ${offset.y})`}>
            <circle
              cx="1000"
              cy="1000"
              r="950"
              fill="#FFFF00"
              stroke="#ff0000"
              strokeWidth="2"
            />
            <>
              <defs>
                <pattern
                  id="smallGrid"
                  width={gridStep}
                  height={gridStep}
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d={`M ${gridStep} 0 L 0 0 0 ${gridStep}`}
                    fill="none"
                    stroke="#ccc"
                    strokeWidth="1"
                  />
                </pattern>

                <pattern
                  id="grid"
                  width={gridStep * 10}
                  height={gridStep * 10}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    width={gridStep * 10}
                    height={gridStep * 10}
                    fill="url(#smallGrid)"
                  />
                  <path
                    d={`M ${gridStep * 10} 0 L 0 0 0 ${gridStep * 10}`}
                    fill="none"
                    stroke="#999"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>

              <rect width="2000" height="2000" fill="url(#grid)" />
            </>

            {couplings.map((c, i) => {
              const isDragging = dragged === c.id;
              return (
                <g key={c.id}>
                  <rect
                    x={c.position.x - 15}
                    y={c.position.y - 25}
                    width={80}
                    height={100}
                    fill={isDragging ? "#333" : "#000"}
                    stroke={isDragging ? "#fff" : "none"}
                    strokeWidth={isDragging ? 2 : 0}
                    onMouseDown={(e) => handleMouseDown(c.id, e)}
                    style={{ cursor: "move" }}
                  />
                  <text
                    x={c.position.x + 110}
                    y={c.position.y + 43}
                    fontSize="40"
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
      </Box>
      <Box
        style={{ display: "flex", justifyContent: "flex-end", margin: "50px" }}
      >
        <Button onClick={handleSaveSVG}>💾 Сохранить SVG</Button>
        <input
          type="file"
          accept=".json"
          onChange={handleImportJSON}
          style={{ marginBottom: "20px" }}
        />
      </Box>
    </EditorSchemaBoxContainer>
  );
};

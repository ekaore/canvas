import React, { useRef, useState, useEffect } from "react";
import { EditorSchemaBoxContainer } from "./EditorSchema.styles";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import {
  addGroupWithCouplings,
  setCouplings,
} from "../../../entities/canvas/couplingSlice";
import { setOffset, setScale } from "../../../entities/canvas/schemaSlice";
import { Box, Button } from "@mui/material";
import { useSchemaDrag } from "../hooks/useSchemaDrag/useSchemaDrag";
import { useSvgZoom } from "../hooks/useSvgZoom/useSvgZoom";
import { EditorText } from "../EditorTitle/EditorText";

export const EditorSchema = () => {
  const [gridStep, setGridStep] = useState(10);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const dispatch = useAppDispatch();
  const texts = useAppSelector((state) => state.text.items); // ✅ добавлено
  const { scale, offset } = useAppSelector((state) => state.editorSchema);
  const scaleRef = useRef(scale);
  const { svgRef } = useSvgZoom({ initialScale: scale, initialOffset: offset });
  useEffect(() => {
    scaleRef.current = scale;
  }, [scale]);
  // --- Snap to Grid ---
  const snapToGridPosition = (x: number, y: number) => {
    if (!snapToGrid) return { x, y };
    const snappedX = Math.round(x / gridStep) * gridStep;
    const snappedY = Math.round(y / gridStep) * gridStep;
    return { x: snappedX, y: snappedY };
  };

  // --- Подключаем drag-хук ---
  const { localGroups, beginDrag, handleMove, endDrag } = useSchemaDrag(
    snapToGridPosition,
    scaleRef
  );
  // --- Сохранить SVG ---
  const handleSaveSVG = () => {
    if (!svgRef.current) return;
    const svgClone = svgRef.current.cloneNode(true) as SVGSVGElement;
    const gridElements = svgClone.querySelectorAll(
      'defs, rect[fill="url(#grid)"]'
    );
    gridElements.forEach((element) => element.remove());
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
  //импорт
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        console.log("JSON файл:", json);

        if (json.couplings) {
          // Создаём новую группу из импортированных муфт
          dispatch(
            addGroupWithCouplings({
              name: `Импорт ${Date.now()}`,
              couplings: json.couplings,
            })
          );
        }

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
          onMouseMove={handleMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
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
            {localGroups.map((group) =>
              group.couplings.map((c: any, i: number) => (
                <g key={c.id}>
                  <rect
                    x={c.position.x - 15}
                    y={c.position.y - 25}
                    width={80}
                    height={100}
                    fill="#000"
                    onMouseDown={(e) => beginDrag(group.id, e)} // 👈 теперь вызываем из хука
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
                    onMouseDown={(e) => beginDrag(group.id, e)} // 👈 тоже drag
                    style={{ cursor: "move" }}
                  >
                    {(i + 1).toString().padStart(2, "0") + "-"}
                  </text>
                </g>
              ))
            )}
            {texts.map((t) => (
              <EditorText key={t.id} id={t.id} x={t.x} y={t.y} text={t.text} />
            ))}
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

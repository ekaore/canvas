import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "../../../app/hook";
import { updateText } from "./textSlice";

interface EditorTextProps {
  id: string;
  x: number;
  y: number;
  text: string;
}

export const EditorText: React.FC<EditorTextProps> = ({ id, x, y, text }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(text);
  const [editing, setEditing] = useState(false);
  const [position, setPosition] = useState({ x, y });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Обновляем позицию в Redux при окончании перетаскивания
  const handleMouseUp = () => {
    if (dragging) {
      dispatch(updateText({ id, text: value, x: position.x, y: position.y }));
      setDragging(false);
    }
  };

  // Начало перетаскивания
  const handleMouseDown = (e: React.MouseEvent<SVGTextElement>) => {
    if (e.button !== 0 || editing) return; // Только левая кнопка и не во время редактирования
    setDragging(true);
    dragOffset.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  // Перетаскивание
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const newX = e.clientX - dragOffset.current.x;
    const newY = e.clientY - dragOffset.current.y;
    setPosition({ x: newX, y: newY });
  };

  // Подписка на mousemove / mouseup на уровне окна
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

  // Редактирование текста по двойному клику
  const handleDoubleClick = () => setEditing(true);

  const handleBlur = () => {
    setEditing(false);
    dispatch(updateText({ id, text: value, x: position.x, y: position.y }));
  };

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
              fontSize: "16px",
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
          fontSize={16}
          onDoubleClick={handleDoubleClick}
          onMouseDown={handleMouseDown}
          style={{
            cursor: "move",
            userSelect: "none",
          }}
        >
          {value}
        </text>
      )}
    </>
  );
};
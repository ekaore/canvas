import { useRef, useEffect } from "react";
import { useAppDispatch } from "../../../../app/hook";
import {
  setOffset,
  setScale,
  setZoom,
} from "../../../../entities/canvas/schemaSlice";
import { UseSvgZoomProps } from "./useSvgZoom.types";

export const useSvgZoom = ({
  initialScale,
  initialOffset,
}: UseSvgZoomProps) => {
  const dispatch = useAppDispatch();
  const svgRef = useRef<SVGSVGElement>(null);
  const scaleRef = useRef(initialScale);
  const offsetRef = useRef(initialOffset);

  // Обновляем refs при изменении scale/offset
  useEffect(() => {
    scaleRef.current = initialScale;
  }, [initialScale]);

  useEffect(() => {
    offsetRef.current = initialOffset;
  }, [initialOffset]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rect = svg.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const normalizedX = (mouseX / rect.width) * 2000;
      const normalizedY = (mouseY / rect.height) * 2000;

      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      const newScale = Math.min(
        Math.max(scaleRef.current * zoomFactor, 0.1),
        5
      );

      if (newScale !== scaleRef.current) {
        const newOffsetX =
          normalizedX -
          (normalizedX - offsetRef.current.x) * (newScale / scaleRef.current);
        const newOffsetY =
          normalizedY -
          (normalizedY - offsetRef.current.y) * (newScale / scaleRef.current);

        dispatch(setScale(newScale));
        dispatch(setZoom(newScale));
        dispatch(setOffset({ x: newOffsetX, y: newOffsetY }));
      }
    };

    svg.addEventListener("wheel", handleWheel, { passive: false });

    return () => svg.removeEventListener("wheel", handleWheel);
  }, [dispatch]);

  return { svgRef };
};

import { useRef, useState, useEffect, useCallback } from "react";
import { Group, IFer, Pos } from "./useSchemaDrag.types";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { setGroups } from "../../../../entities/canvas/couplingSlice";


export const useSchemaDrag = (
  snapToGrid: (x: number, y: number) => Pos,
  scaleRef: { current: number } // можно передать scale если нужен
) => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector((s) => s.coupling.groups);
  const [localGroups, setLocalGroups] = useState(groups);

  // ref для drag-состояния
  const dragRef = useRef<IFer>({
    active: false,
    groupId: null,
    startMouse: null,
    baseGroups: null,
    rafId: null,
  });

  // синхронизация из Redux, если не драгируем
  useEffect(() => {
    if (!dragRef.current.active) setLocalGroups(groups);
  }, [groups]);
  
  const beginDrag = useCallback(
    (groupId: string, e: React.MouseEvent<SVGElement>) => {
      dragRef.current.active = true;
      dragRef.current.groupId = groupId;
      dragRef.current.startMouse = { x: e.clientX, y: e.clientY };
      dragRef.current.baseGroups = groups;
    },
    [groups]
  );

  const endDrag = useCallback(() => {
    if (!dragRef.current.active) return;
    // apply final to redux once
    if (dragRef.current.baseGroups) {
      dispatch(setGroups(dragRef.current.baseGroups));
    }
    dragRef.current.active = false;
    dragRef.current.groupId = null;
    dragRef.current.startMouse = null;
    dragRef.current.baseGroups = null;
    if (dragRef.current.rafId) {
      cancelAnimationFrame(dragRef.current.rafId);
      dragRef.current.rafId = null;
    }
  }, [dispatch]);

  const handleMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (
        !dragRef.current.active ||
        !dragRef.current.startMouse ||
        !dragRef.current.baseGroups
      )
        return;

      const dx = e.clientX - dragRef.current.startMouse.x;
      const dy = e.clientY - dragRef.current.startMouse.y;
      const scale = scaleRef?.current ?? 1;
      const rect = (e.currentTarget as SVGElement).getBoundingClientRect();
      const scaleX = 2000 / rect.width / scale;
      const scaleY = 2000 / rect.height / scale;
      const deltaX = dx * scaleX;
      const deltaY = dy * scaleY;

      // расчёт новой позиции — делаем это в raf для плавности
      if (dragRef.current.rafId) cancelAnimationFrame(dragRef.current.rafId);
      dragRef.current.rafId = requestAnimationFrame(() => {
        const newGroups = dragRef.current!.baseGroups!.map((g: Group) => {
          if (g.id !== dragRef.current!.groupId) return g;
          const movedCouplings = g.couplings.map((c: any) => {
            const nx = c.position.x + deltaX;
            const ny = c.position.y + deltaY;
            const snapped = snapToGrid(nx, ny);
            return { ...c, position: snapped };
          });
          return { ...g, couplings: movedCouplings };
        });

        // обновляем локальное состояние для рендера
        setLocalGroups(newGroups);
        // НЕ диспатчим в redux на каждом шаге; записываем в baseGroups для финального диспатча
        dragRef.current!.baseGroups = newGroups;
        // обновляем стартовые координаты (инкрементальное движение)
        dragRef.current!.startMouse = { x: e.clientX, y: e.clientY };
      });
    },
    [scaleRef, snapToGrid]
  );

  return {
    localGroups,
    beginDrag,
    handleMove,
    endDrag,
  };
};

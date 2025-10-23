export interface Coupling {
    id: string; // Уникальный идентификатор муфты
    name: string; // Название (например, "Муфта 1")
    position: {
      // Координаты на схеме
      x: number;
      y: number;
    };
    type: "left" | "right"; // Тип муфты (ориентация)
    connections: string[]; // ID соединений (какие элементы к ней подключены)
    layerId?: string; // Опционально — принадлежность к слою
    selected?: boolean; // Для UI — выделена ли муфта
  }
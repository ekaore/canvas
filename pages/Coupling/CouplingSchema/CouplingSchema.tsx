import React, { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { ConnectionPoint, Coupling } from './CouplingSchema.types';

export const CouplingSchema: React.FC = () => {
  const [couplings, setCouplings] = useState<Coupling[]>([]);//список всех муфт
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);//хранит id выделенной “точки соединения” (если пользователь кликнул по ней).
  const [draggedCoupling, setDraggedCoupling] = useState<string | null>(null);//id муфты, которую сейчас таскают мышью.
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });//смещение курсора внутри прямоугольника (чтобы муфта не “прыгала”, а двигалась плавно).

  const getNextCouplingPosition = (index: number) => {//1 изменение 
    // Располагаем муфты в одну горизонтальную линию
    const startX = 50; // начальная позиция X
    const spacingX = 60; // расстояние между муфтами по X (ширина муфты + промежуток)
    const lineY = 200; // фиксированная позиция Y для всех муфт
    
    return {
      x: startX + (index * spacingX),
      y: lineY
    };
  };

  const handlePointClick = (pointId: string) => {//2 изменение (когда хотим изменить)
    setSelectedPoint(selectedPoint === pointId ? null : pointId);
  };

  const handleCouplingMouseDown = (couplingId: string, event: React.MouseEvent<SVGElement>) => {
    event.preventDefault();
    const coupling = couplings.find(c => c.id === couplingId);
    if (coupling) {
      const svgElement = event.currentTarget.ownerSVGElement;
      if (svgElement) {
        const rect = svgElement.getBoundingClientRect();
        const scaleX = 2000 / rect.width;
        const scaleY = 1200 / rect.height;
        
        setDraggedCoupling(couplingId);
        setDragOffset({
          x: (event.clientX - rect.left) * scaleX - coupling.position.x,
          y: (event.clientY - rect.top) * scaleY - coupling.position.y
        });
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (draggedCoupling) {
      const rect = event.currentTarget.getBoundingClientRect();
      const scaleX = 2000 / rect.width;
      const scaleY = 1200 / rect.height;
      
      const newPosition = {
        x: (event.clientX - rect.left) * scaleX - dragOffset.x,
        y: (event.clientY - rect.top) * scaleY - dragOffset.y
      };
      
      setCouplings(prev => prev.map(coupling => 
        coupling.id === draggedCoupling 
          ? { ...coupling, position: newPosition }
          : coupling
      ));
    }
  };

  const handleMouseUp = () => {
    setDraggedCoupling(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const renderConnectionPoint = (point: ConnectionPoint) => {
    const isSelected = selectedPoint === point.id;
    
    return (
      <g key={point.id}>
        {/* Connection squares */}
        <rect
          x={point.position.x - 20}
          y={point.position.y - 10}
          width={8}
          height={8}
          fill="#ff0000"
          stroke="#000"
          strokeWidth={1}
        />
        <rect
          x={point.position.x - 20}
          y={point.position.y + 2}
          width={8}
          height={8}
          fill="#ff0000"
          stroke="#000"
          strokeWidth={1}
        />
        <rect
          x={point.position.x - 10}
          y={point.position.y - 10}
          width={8}
          height={8}
          fill="#000000"
          stroke="#000"
          strokeWidth={1}
        />
        <rect
          x={point.position.x - 10}
          y={point.position.y + 2}
          width={8}
          height={8}
          fill="#000000"
          stroke="#000"
          strokeWidth={1}
        />
        
        {/* Point label */}
        <rect
          x={point.position.x}
          y={point.position.y - 15}
          width={200}
          height={30}
          fill={isSelected ? "#e3f2fd" : "#ffffff"}
          stroke={isSelected ? "#1976d2" : "#cccccc"}
          strokeWidth={isSelected ? 2 : 1}
          rx={4}
          onClick={() => handlePointClick(point.id)}
          style={{ cursor: 'pointer' }}
        />
        <text
          x={point.position.x + 10}
          y={point.position.y + 5}
          fontSize="12"
          fill="#000000"
          onClick={() => handlePointClick(point.id)}
          style={{ cursor: 'pointer' }}
        >
          {point.name}
        </text>
      </g>
    );
  };

  return (
    <Box sx={{ p: 2, position: 'relative' }}>
      {/* "+" button under the title, left side */}
      <Box sx={{ position: 'absolute', left: 16, top: 90, zIndex: 2 }}>
      <Typography variant="h6" gutterBottom>
        муфта
      </Typography>
      <Typography variant="h6" gutterBottom sx={{ mt: -1, mb: 2 }}>
        мтаг-212
      </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setCouplings(prev => {
              const index = prev.length + 1;
              const pos = getNextCouplingPosition(index);
              return [
                ...prev,
                {
                  id: `added-${index}`,
                  name: `муфта ${index}`,
                  position: { x: pos.x, y: pos.y },
                  type: index % 2 === 0 ? 'right' : 'left',
                  connections: [index + 1] //3 только одно соединение с номером муфты
                }
              ];
            });
          }}
          sx={{ minWidth: 48, width: 48, height: 48, fontSize: 24, p: 0 }}
        >
          +
        </Button>
      </Box>

      
      <Paper sx={{ p: 0, backgroundColor: 'transparent', position: 'absolute'}}>
        <svg
          width="4350"
          height="4350"
          viewBox="0 0 2000 1200"
          style={{ border: 'none' }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Background circle */}
          <circle
            cx="560"
            cy="560"
            r="560"
            fill="#FFFF00"
            stroke="#ff0000"
            strokeWidth="4"
          />
          
          {/* Render couplings markers (horizontal strip) */}
          {couplings.map((c, index) => {
            const isDragging = draggedCoupling === c.id;
            return (
              <g key={c.id}>
                {/* Black rectangle for coupling */}
                <rect 
                  x={c.position.x - 15} 
                  y={c.position.y - 25} 
                  width={30} 
                  height={50} 
                  fill={isDragging ? "#333333" : "#000000"}
                  stroke={isDragging ? "#ffffff" : "none"}
                  strokeWidth={isDragging ? 2 : 0}
                  onMouseDown={(e) => handleCouplingMouseDown(c.id, e)}
                  style={{ cursor: 'move' }}
                />
                {/* White number with hyphen - rotated vertically */}
                <text
                  x={c.position.x}
                  y={c.position.y + 5}
                  fontSize="12"
                  fill="#ffffff"
                  textAnchor="middle"
                  fontWeight="bold"
                  transform={`rotate(-90 ${c.position.x} ${c.position.y + 5})`}
                  onMouseDown={(e) => handleCouplingMouseDown(c.id, e)}
                  style={{ cursor: 'move' }}
                >
                  {(index + 1).toString().padStart(2, '0')}-
                </text>
              </g>
            );
          })}
        </svg>
      </Paper>
      
      {selectedPoint && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
          <Button variant="outlined" sx={{ mt: 1 }}>
            Редактировать подключения
          </Button>
        </Box>
      )}
    </Box>
  );
};

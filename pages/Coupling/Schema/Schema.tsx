import React, { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Coupling } from './Schema.types';

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

  return (
    <Box sx={{ position: 'relative' }}>

      <Box sx={{ position: 'absolute', left: 16, top: 90, zIndex: 2 }}>
      <Typography variant="h6" gutterBottom>муфта</Typography>
      <Typography variant="h6" gutterBottom sx={{ mt: -1, mb: 2 }}>мтаг-212</Typography>
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
          width="1200"
          height="800"
          viewBox="0 0 4350 4350"
          style={{ border: 'none' }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <circle
            cx="2167"
            cy="2180"
            r="2175"
            fill="#FFFF00"
            stroke="#ff0000"
            strokeWidth="2"
          />
          {couplings.map((c, index) => {
            const isDragging = draggedCoupling === c.id;
            return (
              <g key={c.id}>
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
    </Box>
  );
};

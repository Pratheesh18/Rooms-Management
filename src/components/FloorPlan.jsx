import React, { useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import { Box, Typography } from '@mui/material';
import DraggableTable from './DraggableTable';

const FloorPlan = ({
  tables,
  onAddTable,
  onUpdateTable,
  onSelectTable,
  selectedTable,
  onDeleteTable
}) => {
  const [floorDimensions, setFloorDimensions] = useState({ width: 0, height: 0 });

  
  useEffect(() => {
    const updateDimensions = () => {
      const floorPlan = document.getElementById('floor-plan');
      if (floorPlan) {
        setFloorDimensions({
          width: floorPlan.offsetWidth,
          height: floorPlan.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TABLE',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const dropTargetRect = document.getElementById('floor-plan').getBoundingClientRect();

      if (!offset) return;

      let x = offset.x - dropTargetRect.left;
      let y = offset.y - dropTargetRect.top;

      const tableWidth = item.type === 'rectangular' ? 150 : 100;
      const tableHeight = item.type === 'rectangular' ? 100 : 100;

      
      x = Math.max(0, Math.min(x, floorDimensions.width - tableWidth));
      y = Math.max(0, Math.min(y, floorDimensions.height - tableHeight));

      if (item.source === 'options') {

        const newTable = {
          id: `table-${Date.now()}`,
          name: `T-${tables.length + 1}`,
          type: item.type,
          position: { x, y },
          size: item.type === 'rectangular' ? 
            { width: 120, height: 80 } : 
            { width: 100, height: 100 },
          rotation: 0,
          isActive: true,
          minCovers: 1,
          maxCovers: 4,
          status: 'available',
        };
        onAddTable(newTable);
      } else {
        const updatedTable = {
          ...item.table,
          position: { x, y },
        };
        onUpdateTable(updatedTable);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }), [tables, onAddTable, onUpdateTable, floorDimensions]);



  return (
    <Box
      ref={drop}
      id="floor-plan"
      sx={{
        flex: 1,
        position: 'relative',
        bgcolor: 'grey.100',
        border: (theme) =>
          `2px solid ${isOver ? theme.palette.primary.main : theme.palette.grey[300]}`,
        borderRadius: 1,
        overflow: 'hidden',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {tables.length > 0 ? (
        tables.map((table) => (
          <DraggableTable
            key={table.id}
            table={table}
            isSelected={selectedTable?.id === table.id}
            onClick={() => onSelectTable(table)}
            floorDimensions={floorDimensions}
            onUpdatePosition={(newPosition) => {
              const willCollide = tables.some((otherTable) => {
                if (otherTable.id === table.id) return false;
                return (
                  newPosition.x + table.size.width > otherTable.position.x &&
                  newPosition.x < otherTable.position.x + otherTable.size.width &&
                  newPosition.y + table.size.height > otherTable.position.y &&
                  newPosition.y < otherTable.position.y + otherTable.size.height
                );
              });

              if (!willCollide) {
                onUpdateTable({
                  ...table,
                  position: newPosition,
                });
              }
            }}
            onDeleteTable={onDeleteTable}
          />
        ))
      ) : (
        <Typography variant="h6" color="textSecondary">
          No tables available. Drag and drop a table to add one.
        </Typography>
      )}
    </Box>
  );
};

export default FloorPlan;

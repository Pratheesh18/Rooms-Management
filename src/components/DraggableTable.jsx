import React from 'react';
import { useDrag } from 'react-dnd';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DraggableTable = ({
  table,
  isSelected,
  onClick,
  floorDimensions,
  onUpdatePosition,
  onDeleteTable
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TABLE',
    item: {
      type: table.type,
      table: table,
      source: 'floor',
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDrag = (e) => {
    const floorPlan = document.getElementById('floor-plan');
    const floorRect = floorPlan.getBoundingClientRect();
    
    let x = e.clientX - floorRect.left - (table.size.width / 2);
    let y = e.clientY - floorRect.top - (table.size.height / 2);

    
    x = Math.max(0, Math.min(x, floorDimensions.width - table.size.width));
    y = Math.max(0, Math.min(y, floorDimensions.height - table.size.height));

    onUpdatePosition({ x, y });
  };

  
  const commonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    userSelect: 'none',
    bgcolor: '#ffcdd2', 
    border: theme => `2px solid ${
      isSelected ? 
        theme.palette.primary.main : 
        '#e53935' 
    }`,
  };

  
  const shapeStyles = table.type === 'round' ? {
    width: 100,
    height: 100,
    borderRadius: '50%',
    ...commonStyles
  } : {
    width: 120,
    height: 80,
    borderRadius: '4px',
    ...commonStyles
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteTable(table.id);
  }

  return (
    <Box
      ref={drag}
      sx={{
        position: 'absolute',
        left: table.position.x,
        top: table.position.y,
        transform: `rotate(${table.rotation}deg)`,
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
        transition: 'box-shadow 0.2s',
      }}
      onClick={onClick}
      onDrag={handleDrag}
    >
      <Paper
        elevation={isSelected ? 8 : 2}
        sx={shapeStyles}
      >
        {isSelected && (
            <IconButton size='small' color='error' onClick={handleDelete} sx={{position:'absolute',top:0,right:0,zIndex:1}}>
                <DeleteIcon />
            </IconButton>
        )}
        <Typography 
          variant="subtitle2" 
          sx={{ 
            color: '#b71c1c', 
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}
        >
          {table.name}
        </Typography>
        <Typography 
          variant="caption"
          sx={{ 
            color: '#c62828', 
            fontSize: '0.75rem'
          }}
        >
          {table.minCovers}-{table.maxCovers} covers
        </Typography>
      </Paper>
    </Box>
  );
};

export default DraggableTable;
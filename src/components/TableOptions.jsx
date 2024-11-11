/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDrag } from 'react-dnd';
import { Box, Typography } from '@mui/material';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const tableTypes = [
  { 
    id: 'rectangular', 
    label: 'Rectangular Table', 
    type: 'rectangular',
    icon: <TableRestaurantIcon />
  },
  { 
    id: 'circular', 
    label: 'Circular Table', 
    type: 'circular',
    icon: <RadioButtonUncheckedIcon />
  },
];

const DraggableTableOption = ({ table }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TABLE',
    item: {
      id: table.id,
      type: table.type,
      source: 'options'
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [table.id, table.type]);

  return (
    <Box
      ref={drag}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        p: 2,
        mb: 2,
        bgcolor: 'primary.main',
        color: 'white',
        borderRadius: table.type === 'circular' ? '28px' : 1,
        cursor: 'grab',
        opacity: isDragging ? 0.5 : 1,
        transition: 'opacity 200ms',
        boxShadow: 2,
        '&:hover': {
          bgcolor: 'primary.dark',
        },
      }}
    >
      {table.icon}
      <Typography variant="body2" fontWeight="medium">
        {table.label}
      </Typography>
    </Box>
  );
};

const TableOptions = () => {
  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Table Options
      </Typography>
      {tableTypes.map(table => (
        <DraggableTableOption key={table.id} table={table} />
      ))}
    </Box>
  );
};

export default TableOptions;
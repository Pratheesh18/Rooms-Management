/* eslint-disable react/prop-types */
import { Box, Paper, Typography } from '@mui/material';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

const Statistics = ({ tables }) => {
  const totalTables = tables.length;
  const mainCovers = tables.reduce((sum, table) => sum + table.minCovers, 0);
  const maxCovers = tables.reduce((sum, table) => sum + table.maxCovers, 0);
  const onlineCapacity = tables
    .filter(table => table.isActive)
    .reduce((sum, table) => sum + table.maxCovers, 0);

  return (
    <Paper sx={{ mt: 'auto', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TableRestaurantIcon sx={{ mr: 1 }} />
          <Typography>{totalTables} Tables</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GroupIcon sx={{ mr: 1 }} />
          <Typography>{mainCovers} Main Covers</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <GroupIcon sx={{ mr: 1 }} />
          <Typography>{maxCovers} Max Covers</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BusinessCenterIcon sx={{ mr: 1 }} />
          <Typography>{onlineCapacity} Online Capacity</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Statistics;
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Tabs,
  Tab,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TableOptions from './TableOptions';
import FloorPlan from './FloorPlan';
import Statistics from './Statistics';

const FloorManagement = () => {
  const [rooms, setRooms] = useState(() => {
    const savedRooms = localStorage.getItem('floorRooms');
    return savedRooms ? JSON.parse(savedRooms) : [{ id: 'main', name: 'Main Room', tables: [] }];
  });
  const [currentRoom, setCurrentRoom] = useState('main');
  const [selectedTable, setSelectedTable] = useState(null);
  const [isNewRoomDialogOpen, setIsNewRoomDialogOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const handleAddRoom = () => {
    if (newRoomName.trim()) {
      const newRoom = {
        id: `room-${Date.now()}`,
        name: newRoomName,
        tables: [],
      };
      setRooms([...rooms, newRoom]);
      setNewRoomName('');
      setIsNewRoomDialogOpen(false);
    }
  };

  const handleSaveRoom = () => {
    localStorage.setItem('floorRooms', JSON.stringify(rooms));
  };

  const handleUpdateTable = (updatedTable) => {
    setRooms(rooms.map(room => {
      if (room.id === currentRoom) {
        return {
          ...room,
          tables: room.tables.map(table => 
            table.id === updatedTable.id ? updatedTable : table
          ),
        };
      }
      return room;
    }));
  };

  const handleAddTable = (newTable) => {
    setRooms(rooms.map(room => {
      if (room.id === currentRoom) {
        return {
          ...room,
          tables: [...room.tables, newTable],
        };
      }
      return room;
    }));
  };

  const handleDeleteTable = (tableId) => {
    setRooms(rooms.map(room => {
      if (room.id === currentRoom) {
        return {
          ...room,
          tables: room.tables.filter(table => table.id !== tableId),
        };
      }
      return room;
    }));
    setSelectedTable(null);
  };

  const currentRoomData = rooms.find(room => room.id === currentRoom);
  

  return (
    <Container maxWidth={false} sx={{ py: 3, height: '100vh' , mb:2 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Floor Management
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, height: 'calc(100vh - 140px)' }}>
        <Paper sx={{ width: 300, p: 2 }}>
          <TableOptions />
          {/* {selectedTable && (
            <TableDetails
              table={selectedTable}
              onUpdate={handleUpdateTable}
              onDelete={handleDeleteTable}
            />
          )} */}
        </Paper>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column'}}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Tabs
                value={currentRoom}
                onChange={(_, newValue) => setCurrentRoom(newValue)}
              >
                {rooms.map(room => (
                  <Tab key={room.id} label={room.name} value={room.id} />
                ))}
              </Tabs>
              <Box>
                <Button
                  startIcon={<AddIcon />}
                  onClick={() => setIsNewRoomDialogOpen(true)}
                  sx={{ mr: 1 }}
                >
                  Add Room
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSaveRoom}
                >
                  Save Room
                </Button>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>

          <FloorPlan
            tables={currentRoomData.tables}
            onAddTable={handleAddTable}
            onUpdateTable={handleUpdateTable}
            onSelectTable={setSelectedTable}
            selectedTable={selectedTable}
            onDeleteTable={handleDeleteTable}
          />
          
          <Statistics tables={currentRoomData.tables} />
        </Box>
      </Box>

      <Dialog
        open={isNewRoomDialogOpen}
        onClose={() => setIsNewRoomDialogOpen(false)}
      >
        <DialogTitle>Add New Room</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Room Name"
            fullWidth
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsNewRoomDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddRoom} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FloorManagement;
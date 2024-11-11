/* eslint-disable no-unused-vars */
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import FloorManagement from './components/FloorManagement';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f',
    },
    secondary: {
      main: '#1976d2',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DndProvider backend={HTML5Backend}>
        <FloorManagement />
      </DndProvider>
    </ThemeProvider>
  );
};

export default App
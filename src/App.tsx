// src/App.tsx
import React from 'react';
import TransactionForm from './components/TransactionForm';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD700',
      light: '#FFF4B8',
      dark: '#B89B00',
      contrastText: '#000000',
    },
    secondary: {
      main: '#424242',
      light: '#6D6D6D',
      dark: '#1B1B1B',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFDF7',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#525252',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 500,
      color: '#2C2C2C',
      marginBottom: '1.5rem',
    },
    h6: {
      fontWeight: 500,
      color: '#2C2C2C',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#FFD700',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFD700',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '12px 24px',
          fontWeight: 500,
          '&:hover': {
            boxShadow: '0 4px 12px rgba(255, 215, 0, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <TransactionForm />
        </ThemeProvider>
    );
};

export default App;
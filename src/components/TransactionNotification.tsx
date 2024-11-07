import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { TransactionResponse } from '../types/transaction';
import DownloadIcon from '@mui/icons-material/Download';

interface Props {
  response: TransactionResponse;
  onClose: () => void;
}

const TransactionNotification: React.FC<Props> = ({ response, onClose }) => {
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(response, null, 2)], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction-certificate.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <Paper 
      elevation={3}
      sx={{
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        p: 4,
        zIndex: 1000,
        maxWidth: '90%',
        maxHeight: '80vh',
        overflow: 'auto',
        backgroundColor: '#FFFFFF',
        border: '1px solid rgba(255, 215, 0, 0.2)',
        borderRadius: 3,
        boxShadow: '0 12px 48px rgba(0, 0, 0, 0.12)',
        animation: 'slideDown 0.3s ease-out',
        '& pre': {
          backgroundColor: '#FAFAFA',
          padding: 3,
          borderRadius: 2,
          border: '1px solid rgba(0, 0, 0, 0.05)',
          fontSize: '0.9rem',
          maxHeight: '50vh',
          overflowY: 'auto'
        },
        '& .MuiButton-root': {
          margin: '8px 0',
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">Transaction Certificate</Typography>
        <Button onClick={onClose} size="small">Close</Button>
      </Box>
      <pre style={{ textAlign: 'left', overflow: 'auto' }}>
        {JSON.stringify(response, null, 2)}
      </pre>
      <Button
        startIcon={<DownloadIcon />}
        variant="contained"
        onClick={handleDownload}
        sx={{ mt: 2 }}
        fullWidth
      >
        Download Certificate
      </Button>
    </Paper>
  );
};

export default TransactionNotification;

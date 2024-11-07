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
        p: 2,
        zIndex: 1000,
        maxWidth: '90%',
        maxHeight: '80vh',
        overflow: 'auto'
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

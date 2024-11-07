// src/components/TransactionForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Slide } from '@mui/material';
import { TransactionData, TransactionResponse } from '../types/transaction';
import TransactionNotification from './TransactionNotification';

const TransactionForm: React.FC = () => {
    const [formData, setFormData] = useState<TransactionData>({
        nonce: 0,
        gasPrice: 0,
        gasLimit: 0,
        to: '',
        value: 0,
        data: '',
        chainId: 0,
    });
    const [response, setResponse] = useState<TransactionResponse | null>(null);
    const [showNotification, setShowNotification] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: isNaN(Number(value)) ? value : Number(value),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Object.values(formData).some(field => field === '' || field === 0)) {
            alert('Please fill out all fields correctly.');
            return;
        }

        try {
            const response = await fetch('https://zkm/zendit.io', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                const data: TransactionResponse = await response.json();
                setResponse(data);
                setShowNotification(true);
            } else {
                console.error('Failed to submit transaction');
            }
        } catch (error) {
            console.error('Error submitting transaction:', error);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Provide Transaction Data
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField label="Nonce" name="nonce" type="number" onChange={handleChange} required />
                <TextField label="Gas Price" name="gasPrice" type="number" onChange={handleChange} required />
                <TextField label="Gas Limit" name="gasLimit" type="number" onChange={handleChange} required />
                <TextField label="To Address" name="to" type="text" onChange={handleChange} required />
                <TextField label="Value" name="value" type="number" onChange={handleChange} required />
                <TextField label="Data" name="data" type="text" onChange={handleChange} />
                <TextField label="Chain ID" name="chainId" type="number" onChange={handleChange} required />
                <Button variant="contained" color="primary" type="submit">
                    Submit
                </Button>
            </Box>
            
            {response && (
                <Slide direction="down" in={showNotification} mountOnEnter unmountOnExit>
                    <div>
                        <TransactionNotification 
                            response={response} 
                            onClose={() => setShowNotification(false)} 
                        />
                    </div>
                </Slide>
            )}
        </Container>
    );
};

export default TransactionForm;
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import nth from '../../assets/nth.svg';

export default function NoResult({ message, height }) {
    return (
        <Box width="100%" height={height || "100%"} display="flex" alignItems="center" justifyContent="center" flex={1} flexDirection="column">
            <img src={nth} alt="Empty result" style={{ maxWidth: 70 }} />
            <Typography variant="body2" style={{ marginTop: 20, color: '#666' }}>{message}</Typography>
        </Box>
    )
}

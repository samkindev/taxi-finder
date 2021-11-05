import { Box } from '@mui/system';
import React from 'react';
import logo from '../../assets/logo.png';

export default function Logo({ width, height, ...other }) {
    return (
        <Box width={width || 70} height={height || 'auto'} {...other}>
            <img src={logo} alt="taxi express" />
        </Box>
    )
}

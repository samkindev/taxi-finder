import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import TaxiCard from './TaxiCard';

export default function TaxiList({ itineraire, setTaxi }) {
    const [taxis, setTaxis] = useState([]);
    const [loading, setLoading] = useState(false);

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography sx={{ marginBottom: 15 }}>Liste des taxis</Typography>
            <div>
                {taxis.map(taxi => (
                    <TaxiCard taxi={taxi} />
                ))}
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        padding: "15px 0",
        width: 300
    }
});

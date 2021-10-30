import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ItineraireModal from './ItineraireModal';

export default function SideBar({ setDestination }) {
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.innerContainer}>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>Votre destination</Typography>
                <Button
                    variant="outlined"
                    color="default"
                    fullWidth
                    onClick={handleOpenModal}
                >
                    Entrez un itinéraire
                </Button>
                {open && <ItineraireModal open={open} onClose={handleCloseModal} setDestination={setDestination} />}
                <div className={classes.recentList}>
                    <Typography variant="body2" sx={{ fontSize: "0.9rem", fontWeight: 500 }}>Itinéraires récents</Typography>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        minHeight: '400px',
        backgroundColor: '#fff',
    },
    innerContainer: {
        padding: '20px'
    },
    recentList: {
        marginTop: 20,
        padding: '10px 0',
        borderTop: '1px solid #eaeaea'
    }
});

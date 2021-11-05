import React from 'react';
import { Typography, Avatar, ButtonBase, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

export default function TaxiCard({ taxi = {}, onClick }) {
    const classes = useStyles();
    console.log(taxi);
    return (
        <ButtonBase onClick={onClick} className={classes.root} sx={{ padding: "5px 20px", width: '100%', justifyContent: 'flex-start', textAlign: 'start' }}>
            <Avatar className={classes.avatar}></Avatar>
            <div className={classes.details}>
                <Grid container sx={{ alignItems: 'center' }}>
                    <Grid item xs={8} style={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="caption">
                            <span>Couleur: </span>
                            <span>{taxi.couleur}</span>
                        </Typography>
                        <Typography variant="caption">
                            <span>Marque: </span>
                            <span>{taxi.marque}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography variant="h5" color="secondary" sx={{ flex: 1 }}>90%</Typography>
                    </Grid>
                </Grid>
            </div>
        </ButtonBase>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        "&:hover": {
            backgroundColor: '#0076ff26'
        }
    },
    avatar: {
        marginRight: 15
    },
    details: {
        flex: 2,
    }
}));

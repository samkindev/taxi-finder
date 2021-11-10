import React, { useState, useEffect } from 'react';
import { Typography, useTheme, Avatar, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Map } from '../../components';
import { getCommandData, subsicribeUserToDriver } from '../../app/firebase/api/commande';
import { useSelector } from 'react-redux';
import { getCurrentCommand } from '../../app/reducers/commads';
import { Redirect } from 'react-router';
import { Box } from '@mui/system';

export default function ClientCommandPage() {
    const [taxiPosition, setTaxiPosition] = useState();
    const [loading, setLoading] = useState(false);
    const [command, setCommand] = useState();
    const currentCommand = useSelector(getCurrentCommand);

    useEffect(() => {
        if (currentCommand) {
            getCommandData(currentCommand.commande, (l, err, data) => {
                setLoading(l);
                if (err) {
                    console.log(err);
                    return;
                }
                if (data) {
                    setCommand(data);
                    subsicribeUserToDriver(currentCommand.vehicule, (l, err, sub) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        if (sub) {
                            setTaxiPosition(sub.position);
                        }
                    });
                }
            });
        }
    }, [currentCommand]);

    const theme = useTheme();
    const classes = useStyles(theme)();

    if (!currentCommand) {
        return <Redirect to="/" />
    }
    return (
        <div className={classes.root}>
            {(loading || !command || !taxiPosition) ?
                <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                    <Typography variantnt="caption">Chargement...</Typography>
                </Box> :
                <>
                    <div className={classes.centerVerticalFlex}>
                        <Box className={classes.description}>
                            <Typography variant="h1" className={classes.title}>Mon taxi</Typography>
                            <Typography variant="body2"><span>Marque : </span> <span>{command.vehicule.marque}</span></Typography>
                            <Typography variant="body2"><span>Couleur : </span> <span>{command.vehicule.couleur}</span></Typography>
                            <Typography sx={{ marginTop: 1.25 }} variant="h1" className={classes.title}>Trajet</Typography>
                            <Typography variant="body2">{command.vehicule.depart} - {command.vehicule.terminus}</Typography>
                            <Typography sx={{ marginTop: 1.25 }} variant="h1" className={classes.title}>Arrêt</Typography>
                            <Typography variant="body2">{command.arret}</Typography>
                        </Box>
                        <Box className={classes.description} alignItems="center">
                            <Typography variant="h1" className={classes.title}>Chauffeur</Typography>
                            <Avatar style={{ width: 80, height: 80, marginTop: 15 }}></Avatar>
                        </Box>
                        <Box className={classes.description} alignItems="center">
                            <Button
                                variant="outlined"
                                color="default"
                                fullWidth
                            >Annuler réservation</Button>
                        </Box>
                    </div>
                    <main className={classes.main}>
                        <Map taxiPosition={taxiPosition} />
                    </main>
                </>
            }
        </div>
    );
}

const useStyles = theme => makeStyles({
    root: {
        display: 'flex',
    },
    description: {
        width: 300,
        backgroundColor: '#fff',
        boxShadow: '1px 1px 3px #60606052, -1px -1px 2px #85858547',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
        justfyContent: 'center',
        padding: 15,
        marginLeft: '0px!important',
        "&:not(:first-child)": {
            marginTop: 20
        }
    },
    main: {
        flex: 1,
        width: 'calc(100vw - 300px)',
        height: 'calc(100vh - 83px)',
        overflow: 'hidden',
        marginLeft: 20
    },
    title: {
        fontSize: '18px!important',
        fontWeight: 'bold!important',
        marginBottom: '10px!important'
    },
    centerVerticalFlex: {
        display: 'flex',
        flexDirection: 'column',
        padding: 15
    },
    [theme.breakpoints.down('sm')]: {
        root: {
            flexDirection: 'column-reverse',
        },
        main: {
            flex: 'auto',
            width: "100%",
            maxHeight: '50vh',
            height: '50vh',
            marginLeft: 0,
            marginBottom: 20
        },
        description: {
            width: '100%',
            zIndex: 2000,
            marginLeft: 15
        },
        centerVerticalFlex: {
            flexDirection: 'column'
        }
    }
});
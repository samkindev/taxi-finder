import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { actions, getCurrentDestinaton, setC } from '../../app/reducers/commads';
import { Box } from '@mui/system';
import { CreateCommandeTaxi, getItineraireTaxis, subscibeClient } from '../../app/firebase/api/commande';
import { TaxiCard } from '../../components';
import models from '../../app/firebase/api/models';
import { getUser } from '../../app/reducers/user';
import SendingDemand from '../../components/Client/SendingDemand';
import { useHistory, useRouteMatch } from 'react-router';

export default function ClientMainPage() {
    const user = useSelector(getUser);
    const currentDest = useSelector(getCurrentDestinaton);
    const [itineraire, setItineraire] = useState(currentDest ? currentDest.itineraire : null);
    const [arret, setArret] = useState(currentDest ? currentDest.arret : null);
    const [taxis, setTaxis] = useState([]);
    const [selectedTaxi, setSelectedTaxi] = useState();
    const [loading, setLoading] = useState(true);
    const [commandeState, setCommandeState] = useState('idle');

    const dispatch = useDispatch();
    const history = useHistory();
    const { url } = useRouteMatch();
    useEffect(() => {
        getItineraireTaxis(itineraire, arret, (l, error, txs) => {
            setLoading(l);

            if (error) {
                console.log(error);
                return;
            }

            if (txs) {
                setTaxis(txs);
            }
        });
    }, [arret, itineraire]);

    const handleSelectTaxi = (taxi) => {
        const c = new models.Commande(user.id, taxi.id, arret, "sending");
        setSelectedTaxi(taxi);
        CreateCommandeTaxi(c, (l, err, res) => {
            if (l) {
                setCommandeState('En cour d\'envoie ...');
            } else {
                setCommandeState('En attente de la confirmation du taxi ...');
            }

            if (err) {
                console.log(err);
                return;
            }

            if (res) {
                subscibeClient(res.id, (l, err, sub) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (sub) {
                        if (sub.etat === "confirmed") {
                            setCommandeState("Commande confirmée.");
                            setTimeout(() => {
                                console.log(taxi);
                                dispatch(actions.setCurrentCommand({
                                    vehicule: taxi.id,
                                    commande: res.id
                                }));
                                history.push(url + "/commander-taxi");
                            }, 200);
                        } else if (sub.etat === "rejected") {
                            setCommandeState("Command rejetée.");
                        }
                    }

                });
            }
        });
    };
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            {/* <aside className={classes.aside}>
                <ClientSideBar setDestination={setDestination} />
            </aside> */}
            <Grid item xs={0} sm={3}></Grid>
            <Grid item xs={12} sm={6} className={classes.main}>
                {loading ?
                    <Box height="calc(100vh - 70px)" display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress color="secondary" size={50} />
                    </Box>
                    : <div>
                        <header className={classes.listTitle}>
                            <Typography>Les taxis pour votre course</Typography>
                        </header>
                        <div className={classes.taxiList}>
                            {taxis.map(t => (
                                <TaxiCard key={t.id} taxi={t} onClick={() => handleSelectTaxi(t)} />
                            ))}
                            {commandeState !== 'idle' &&
                                <SendingDemand status={commandeState} open={commandeState !== "idle"} taxi={selectedTaxi} onClose={() => setCommandeState('idle')} />
                            }
                        </div>
                    </div>
                }
            </Grid>
            <Grid item xs={0} sm={3}></Grid>
        </Grid>
    )
}


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    aside: {
        flex: 1,
        width: 300,
        position: 'fixed',
        top: 55,
        left: 0,
        bottom: 0,
        borderRight: '1px solid #eaeaea',
    },
    main: {
        flex: 2,
        borderLeft: '1px solid #eaeaea',
        borderRight: '1px solid #eaeaea',
        minHeight: 'calc(100vh - 70px)'
    },
    listTitle: {
        padding: '15px 20px',
        borderBottom: '1px solid #eaeaea',
    }
}));
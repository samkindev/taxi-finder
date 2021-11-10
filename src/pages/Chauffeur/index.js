import React, { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { Typography, useTheme, Button, Avatar, IconButton, Snackbar, Grow } from '@mui/material';
import {makeStyles} from '@mui/styles'
import { subscibeDriver } from '../../app/firebase/api/commande';
import { getCurrentDriver } from '../../app/reducers/driver';
import NewCommand from '../../components/Chauffeur/NewCommand';
import {Map, ModifItineraire, Vehicule} from '../../components';
import { updateVehiculeLocation } from '../../app/firebase/api/vehicule';
import { Box } from '@mui/system';
import RoomIcon from '@mui/icons-material/Room';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getUser } from '../../app/reducers/user';

export default function MainPage({openMenu, toggleManu}) {
    const [newCommand, setNewCommand] = useState(false);
    const [command, setCommand] = useState({});
    const [modifItineraire, setModifItineraire] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const [showVehicule, setShowVehicule] = useState(false);

    const toggleModifItineraire = () => {
        setModifItineraire(!modifItineraire);
    }

    const toggleShowVehicule = () => {
        setShowVehicule(!showVehicule);
    }

    const handleClose = () => {
        setNewCommand(false);
    };

    const containerRef = useRef();

    const driver = useSelector(getCurrentDriver);
    const user = useSelector(getUser);

    useEffect(() => {
        const unsub = subscibeDriver(driver.vehiculeId, (l, err, res) => {
            console.log(l, err);
            if (res) {
                if (res.length === 1) {
                    setNewCommand(true);
                    setCommand(res[0]);
                }
            }
        });

        const unw = navigator.geolocation.watchPosition((position) => {
            console.log(position.coords);
            updateVehiculeLocation(
                driver.vehiculeId,
                { lon: position.coords.longitude, lat: position.coords.latitude },
                (l, err, res) => {
                    if (res) {
                        console.log("Position changed");
                    }
                }
            );
        }, (err) => {
            console.log(err);
        });

        return () => {
            navigator.geolocation.clearWatch(unw);
            unsub();
        };
    }, [driver.vehiculeId]);
    const theme = useTheme();
    const classes = useStyles(theme, openMenu)();
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <aside 
                    className={clsx(
                        classes.aside, 
                        {
                            [classes.openAside]: openMenu,
                            [classes.closeAside]: !openMenu
                        }
                    )}
                >
                    <IconButton onClick={toggleManu} size="small" className={classes.closeBtn}>
                        <CloseIcon color="inherit" />
                    </IconButton>
                    <Box pt={3} pb={3} width="100%" borderBottom="1px solid #444" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Avatar
                            style={{
                                width: 70,
                                height: 70,
                                fontSize: '0.8rem',
                                marginBottom: 5
                            }}
                        />
                        <Typography sx={{textAlign: 'center', fontSize: 18}} variant="h6">{user.prenom} {user.nom}</Typography>
                        <Button
                            variant="outlined"
                            color="default"
                            disableElevation
                            sx={{
                                borderRadius: 4.5,
                                p: '2px 15px',
                                color: '#888',
                                mt: 1
                            }}
                        >
                            Profile
                        </Button>
                    </Box>
                    <Box flex={1} pt={2.5} pl={2} pr={2} className={classes.asideBody}>
                        <Box>
                            <Typography sx={{fontSize: 15}} variant="h6">Itinéraire</Typography>
                            <Box className={classes.trajet}>
                                <span className={classes.bul1} />
                                <span className={classes.bar}/>
                                <span className={classes.bul2}/>
                                <div>
                                    <Typography variant="caption" sx={{textTransform: 'capitalize'}}>{driver.depart}</Typography>
                                    <RoomIcon fontSize="small" style={{color: '#666'}} />
                                </div>
                                <div>
                                    <Typography variant="caption" sx={{textTransform: 'capitalize'}}>{driver.terminus}</Typography>
                                    <RoomIcon fontSize="small" style={{color: '#666'}} />
                                </div>
                            </Box>
                        </Box>
                        <Box pt={2} pb={2} width={220}>
                            <Button
                                variant="contained"
                                color="default"
                                disableElevation
                                onClick={toggleModifItineraire}
                                sx={{
                                    borderRadius: 4.5,
                                    marginBottom: 2
                                }}
                            >
                                Modifier l'itinéraire
                            </Button>
                            <Button
                                variant="contained"
                                color="default"
                                disableElevation
                                onClick={toggleShowVehicule}
                                sx={{
                                    borderRadius: 4.5,
                                    marginBottom: 2
                                }}
                            >
                                Mon véhicule
                            </Button>
                            <Button
                                variant="contained"
                                color="default"
                                disableElevation
                                sx={{
                                    borderRadius: 4.5,
                                    marginBottom: 2
                                }}
                            >
                                Historique
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                disableElevation
                                sx={{
                                    borderRadius: 4.5
                                }}
                            >
                                Je ne suis pas disponible
                            </Button>
                        </Box>
                    </Box>
                    <Box p={2.5} borderTop="1px solid #444" display="flex" justifyContent="center" alignItems="flex-end" width="100%">
                        <Typography sx={{color: '#666', textAlign:'center'}} variant="caption">Chauffeur de taxi</Typography>
                    </Box>
                </aside>
                <main className={classes.main}>
                    <Map />
                    <div className={classes.card}>
                        <Typography sx={{fontSize: 15}} variant="h6">Prochain client</Typography>
                        <Box p={1} width="100%" mt={2} mb={2} border="1px solid #eaeaea" borderRadius={2}>
                            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                <Typography variant="caption" className={classes.cardTrajet}>
                                    <span>Campus</span>
                                    <span className={classes.cardSep}>
                                        <span className={classes.cardBul1}></span>
                                        <span className={classes.cardBar}></span>
                                        <span className={classes.cardBul2}></span>
                                    </span>
                                    <span>Upn</span>
                                </Typography>
                                <IconButton size="small">
                                    <MoreVertIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            <Typography 
                                variant="caption"
                                sx={{
                                    backgroundColor: '#fb3c001a',
                                    color: theme.palette.primary.main, 
                                    fontSize: 14,
                                    borderRadius: 20, 
                                    width: 'fit-content',
                                    padding: theme.spacing(0.2, 1),
                                    display: 'block',
                                    margin: theme.spacing(1, 0) 
                                }}
                            >
                                Express
                            </Typography>
                        </Box>
                        <Button
                            variant="text"
                            color="default"
                            disableElevation
                            sx={{
                                borderRadius: 4.5
                            }}
                        >
                            Tous les clients
                        </Button>
                    </div>
                </main>
            </div>
            {newCommand &&
                <NewCommand open={newCommand} onClose={handleClose} command={command} containerRef={containerRef} />
            }
            {modifItineraire &&
                <ModifItineraire open={modifItineraire} setHasChanged={setHasChanged} onClose={toggleModifItineraire} driver={driver} prevItineraire={{depart: driver.depart, terminus: driver.terminus}} />
            }
            {hasChanged &&
                <Snackbar
                    open={hasChanged}
                    TransitionComponent={Grow}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                    autoHideDuration={6000}
                    onClose={() => setHasChanged(false)}
                    message="Votre itinéraire à été modifié avec succès!"
              />
            }
            {showVehicule && 
                <Vehicule driver={driver} onClose={toggleShowVehicule} open={showVehicule} />
            }
        </div>
    )
}


const useStyles = (theme) => makeStyles({
    root: {
        width: '100%'
    },
    aside: {
        backgroundColor: '#333',
        color: '#fff',
        position: 'fixed',
        width: 300,
        display: 'flex',
        top: 0,
        left: 0,
        bottom: 0,
        flexDirection: 'column',
        alignItems: 'center',
        overflowX: 'hidden',
        zIndex: 20,
        [theme.breakpoints.down('sm').replace('599.95px', '700px')]: {
            width: '0'
        }
    },
    openAside: {
        width: 300,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.down('sm').replace('599.95px', '700px')]: {
            width: '100vw'
        },
    },
    closeAside: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: 0,
    },
    asideBody: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    main: {
        position: 'relative',
        marginLeft: 300,
        height: '100vh',
        width: "calc(100vw - 300px)",
        [theme.breakpoints.down('sm').replace('599.95px', '700px')]: {
            marginLeft: 0,
            width: '100vw',
            overflow: 'hidden',
        },
    },
    trajet: {
        position: 'relative',
        padding: '10px 0',
        "& > div": {
            borderRadius: 25,
            padding: '5px 15px',
            border: '1px solid #666',
            marginLeft: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        "& > div:last-child": {
            marginTop: 20
        },
    },
    bul1: {
        position: 'absolute',
        backgroundColor: theme.palette.secondary.main,
        width: 10,
        height: 10,
        borderRadius: '50%',
        top: 25,
        left: 0,
    },
    bul2: {
        position: 'absolute',
        backgroundColor: theme.palette.primary.main,
        width: 10,
        height: 10,
        borderRadius: '50%',
        bottom: 25,
        left: 0,
    },
    bar: {
        width: 2,
        position: 'absolute',
        height: 37,
        left: 4,
        top: 40,
        backgroundColor: '#666',
    },
    card: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        background: '#fff',
        zIndex: 9,
        boxShadow: '1px 1px 5px #b1acac',
        padding: 20,
        borderRadius: 10,
        minWidth: 350,
    },
    cardTrajet: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        "& > span": {
            marginLeft: 15
        }
    },
    cardSep: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        marginLeft: '0!important'
    },
    cardBul1: {
        position: 'absolute',
        backgroundColor: theme.palette.secondary.main,
        width: 7,
        height: 7,
        borderRadius: '50%',
        top: 10,
        left: 0,
    },
    cardBar: {
        width: 2,
        position: 'absolute',
        height: 10,
        left: 2.4,
        top: 22,
        backgroundColor: '#666',
    },
    cardBul2: {
        position: 'absolute',
        backgroundColor: theme.palette.primary.main,
        width: 7,
        height: 7,
        borderRadius: '50%',
        bottom: 8,
        left: 0,
    },
    closeBtn: {
        position: 'absolute!important',
        top: 10,
        right: 10,
        color: '#fff!important',
        display: 'none!important',
        [theme.breakpoints.down('sm').replace('599.95px', '700px')]: {
            display: 'inline-flex!important',
        }
    },
    [theme.breakpoints.down('sm')]: {
        card: {
            left: '50%',
            minWidth: '95%',
            transform: "translateX(-50%)"
        },
    },
});
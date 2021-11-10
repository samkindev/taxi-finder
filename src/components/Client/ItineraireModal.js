import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, TextField, Typography, Button, Fade, IconButton, useTheme, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { ArrowBack, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { actions } from '../../app/reducers/commads';
import { getAll } from '../../app/firebase/api/itineraire';
import { AutocompleteInput } from '..';
import Map from '../Map';

export default function ItineraireModal({ open, onClose, setDestination, goToClient }) {
    const [step, setStep] = useState(0);
    const [itineraires, setItineraires] = useState([]);
    const [itineraire, setItineraire] = useState();
    const [depart, setDepart] = useState('');
    const [arret, setArret] = useState('');
    const [error, setError] = useState()

    const dispatch = useDispatch();
    const handleConfirm = () => {
        if (itineraire !== "" && arret !== "") {
            if (typeof setDestination === "function") {
                setDestination(itineraire, arret);
            }

            setTimeout(() => {
                dispatch(actions.setCurrentDestination({ itineraire, arret, depart }));
                onClose();
                if (typeof goToClient === "function") {
                    goToClient();
                }
            }, 200);
        }
    };

    const goToNext = () => {
        if (step === 0 && !itineraire) {
            setError("Veuillez renseigner l'itinéraire.")
        } else if (step === 1 && depart === "") {
            setError("Veuillez renseigner le point de départ.")
        } else if (step === 2 && arret === "") {
            setError("Veuillez renseigner l'arrêt.")
        } else {
            setError(null);
            setStep(step + 1);
        }        
    };

    const goBack = () => {
        setStep(step - 1);
    }

    useEffect(() => {
        getAll((l, err, res) => {
            if (err) {
                console.log(err);
                return;
            }

            if (res) {
                setItineraires(res);
            }
        });
    }, []);

    const theme = useTheme();
    const classes = useStyles(theme)();
    return (
        <Modal
            open={open}
            onBackdropClick={onClose}
            onClose={onClose}
            BackdropProps={{
                style: {
                    backgroundColor: "rgb(0 0 0 / 48%)",
                },
            }}
        >
            <div className={classes.content}>
                <Box borderBottom="1px solid #eaeaea" p={theme.spacing(1, 0)} display="flex" alignItems="center">
                    <IconButton className={classes.closeBtn} onClick={onClose}>
                        <ArrowBack />
                    </IconButton>
                    <Typography sx={{marginLeft: 2, fontSize: 17}} variant="h6">Commande taxi</Typography>
                </Box>
                {error && <Alert sx={{mt: 1}} severity="error" color="error">{error}</Alert>}
                <Box p={2} className={classes.body}>
                    {step === 0 &&
                        <Fade in={step === 0}>
                            <div className={classes.form}>
                                <Typography 
                                    variant="h2"
                                    sx={{
                                        color: theme.palette.default.main,
                                        fontSize: 25,
                                        fontWeight: '600',
                                        mb: 1.5
                                    }}
                                >Quelle course voulez-vous faire ?</Typography>
                                <Typography variant="caption">Renseigner votre itinéraire.</Typography>
                                <Box>
                                    <AutocompleteInput
                                        options={itineraires}
                                        value={itineraire}
                                        onChange={(val) => setItineraire(val)}
                                    />
                                    <Button
                                        size="small"
                                        disableElevation
                                        color="secondary"
                                        variant="contained"
                                        onClick={goToNext}
                                        disabled={itineraire === ""}
                                        sx={{ marginTop: 2 }}
                                    >
                                        Suivant
                                        <ChevronRight fontSize="small" sx={{marginLeft: 1}} />
                                    </Button>
                                </Box>
                            </div>
                        </Fade>
                    }
                    {step === 1 &&
                        <Fade in={step === 1}>
                            <div className={classes.form}>
                                <Typography 
                                    variant="h2"
                                    sx={{
                                        color: theme.palette.default.main,
                                        fontSize: 25,
                                        fontWeight: '600',
                                        mb: 2
                                    }}
                                >Quel est votre point de départ ?</Typography>
                                <Typography variant="caption">Où voulez-vous que le taxi vous prenne ?</Typography>
                                <Box mt={1.5}>
                                    <TextField
                                        placeholder="Point de départ"
                                        color="secondary"
                                        size="small"
                                        name="depart"
                                        id="depart"
                                        type="text"
                                        fullWidth
                                        value={depart}
                                        onChange={e => setDepart(e.target.value)}
                                        sx={{
                                            marginBottom: 2
                                        }}
                                    />
                                    <Box display="flex" justifyContent="space-between">
                                        <Button
                                            size="small"
                                            disableElevation
                                            color="default"
                                            variant="text"
                                            onClick={goBack}
                                        >
                                            <ChevronLeft fontSize="small" sx={{marginLeft: 1}} />
                                            Itinéraire
                                        </Button>
                                        <Button
                                            size="small"
                                            disableElevation
                                            color="secondary"
                                            variant="contained"
                                            onClick={goToNext}
                                        >
                                            Suivant
                                            <ChevronRight fontSize="small" sx={{marginLeft: 1}} />
                                        </Button>
                                    </Box>
                                </Box>
                            </div>
                        </Fade>
                    }
                    {step === 2 &&
                        <Fade in={step === 2}>
                            <div className={classes.form}>
                                <Typography
                                    variant="h2"
                                    sx={{
                                        color: theme.palette.default.main,
                                        fontSize: 25,
                                        fontWeight: '600',
                                        mb: 1.5
                                    }}
                                >Point d'arrêt</Typography>
                                <Typography variant="caption">Où allez-vous vous arrêter ?</Typography>
                                <Box mt={1.5}>
                                    <TextField
                                        placeholder="Votre arrêt"
                                        color="secondary"
                                        size="small"
                                        name="arret"
                                        id="arret"
                                        type="text"
                                        fullWidth
                                        value={arret}
                                        onChange={e => setArret(e.target.value)}
                                        sx={{
                                            marginBottom: 2
                                        }}
                                    />
                                    <Box display="flex" justifyContent="space-between">
                                        <Button
                                            size="small"
                                            disableElevation
                                            color="default"
                                            variant="text"
                                            onClick={goBack}
                                        >
                                            <ChevronLeft fontSize="small" sx={{marginLeft: 1}} />
                                            Point de départ
                                        </Button>
                                        <Button
                                            size="small"
                                            disableElevation
                                            color="secondary"
                                            variant="contained"
                                            onClick={handleConfirm}
                                        >
                                            Confirmer
                                            <ChevronRight fontSize="small" sx={{marginLeft: 1}} />
                                        </Button>
                                    </Box>
                                </Box>
                            </div>
                        </Fade>
                    }
                    <Box width="100%" p={theme.spacing(2, 0)} height="50vh">
                        <Typography variant="h6" sx={{fontSize: 17, mb: 2}}>Ma position actuelle</Typography>
                        <Box className={classes.mapContainer} borderRadius={theme.spacing(2)}>
                            <Map />
                        </Box>
                    </Box>
                </Box>
            </div>
        </Modal>
    )
}

const useStyles = theme => makeStyles({
    container: {
        minWidth: '100%',
        minHeight: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        paddingTop: 50,
        justifyContent: 'center',
    },
    content: {
        backgroundColor: '#fff',
        boxShadow: "0px 0px 20px #4e4e4e4a",
        width: '70vw',
        minWidth: '500px',
        maxWidth: '650px',
        minHeight: '100vh',
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
    },
    form: {
        maxWidth: 500
    },
    mapContainer: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },
    [theme.breakpoints.down('sm')]: {
        content: {
            width: "100%",
            minWidth: "100%",
            transform: 'none',
            position: 'static',
            borderRadius: 0,
        }
    },
});

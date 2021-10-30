import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, TextField, Typography, Button, Fade, IconButton, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Close } from '@mui/icons-material';
import { actions } from '../../app/reducers/commads';

export default function ItineraireModal({ open, onClose, setDestination, goToClient }) {
    const [step, setStep] = useState(0);
    const [itineraire, setItineraire] = useState({
        depart: '',
        terminus: ''
    });
    const [arret, setArret] = useState('');

    const dispatch = useDispatch();
    const handleConfirm = () => {
        if (itineraire !== "" && arret !== "") {
            if (typeof setDestination === "function") {
                setDestination(itineraire, arret);
            }

            setTimeout(() => {
                dispatch(actions.setCurrentCommand({ itineraire, arret }));
                onClose();
                if (typeof goToClient === "function") {
                    goToClient();
                }
            }, 200);
        }
    };

    const goToArret = () => {
        setStep(step + 1);
    };

    const theme = useTheme();
    const classes = useStyles(theme)();
    return (
        <Modal
            open={open}
            onBackdropClick={onClose}
            onClose={onClose}
            BackdropProps={{
                style: {
                    backgroundColor: "rgb(215 215 215 / 39%)",
                },
            }}
        >
            <div className={classes.content}>
                <IconButton className={classes.closeBtn} onClick={onClose}>
                    <Close />
                </IconButton>
                <Box p={2}>
                    {step === 0 &&
                        <Fade in={step === 0}>
                            <div>
                                <Typography>Votre itinéraire</Typography>
                                <Box padding={2} paddingLeft={2.5} borderLeft="2px solid #00000021" marginLeft={1}>
                                    <TextField
                                        placeholder="Point de départ"
                                        name="depart"
                                        id="depart"
                                        type="text"
                                        fullWidth
                                        color="secondary"
                                        size="small"
                                        value={itineraire.depart}
                                        onChange={e => setItineraire(it => ({
                                            ...it,
                                            depart: e.target.value
                                        }))}
                                        sx={{
                                            marginBottom: 2
                                        }}
                                    />
                                    <TextField
                                        placeholder="Destination"
                                        color="secondary"
                                        size="small"
                                        name="destination"
                                        id="destination"
                                        type="text"
                                        fullWidth
                                        value={itineraire.terminus}
                                        onChange={e => setItineraire(it => ({
                                            ...it,
                                            terminus: e.target.value
                                        }))}
                                        sx={{
                                            marginBottom: 2
                                        }}
                                    />
                                    <Button
                                        size="small"
                                        disableElevation
                                        color="secondary"
                                        variant="contained"
                                        onClick={goToArret}
                                        disabled={itineraire.depart === "" || itineraire.terminus === ""}
                                    >
                                        Suivant
                                    </Button>
                                </Box>
                            </div>
                        </Fade>
                    }
                    {step === 1 &&
                        <Fade in={step === 1}>
                            <div>
                                <Typography>Votre arrêt</Typography>
                                <Box padding={2} paddingLeft={2.5} borderLeft="2px solid #00000021" marginLeft={1}>
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
                                    <Button
                                        size="small"
                                        disableElevation
                                        color="secondary"
                                        variant="contained"
                                        onClick={handleConfirm}
                                    >
                                        Confirmer
                                    </Button>
                                </Box>
                            </div>
                        </Fade>
                    }
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
        width: 500,
        minHeight: 300,
        borderRadius: 7,
        position: 'absolute',
        top: 50,
        left: '50%',
        transform: 'translateX(-50%)'
    },
    closeBtn: {
        position: 'absolute!important',
        top: 10,
        right: 15
    },
    [theme.breakpoints.down('sm')]: {
        content: {
            width: "100%",
            padding: "20px 10px",
            transform: 'none',
            position: 'static'
        }
    }
});

import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Typography, Button, Fade, useTheme, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { actions } from '../../app/reducers/driver';
import {updateDriverItineraire} from '../../app/firebase/api/user'
import { getAll } from '../../app/firebase/api/itineraire';
import { AutocompleteInput } from '..';

export default function ModifItineraire({ open, onClose, prevItineraire, driver, setHasChanged }) {
    const [extrems, setExtrems] = useState([]);
    const [itineraire, setItineraire] = useState({
        depart: '',
        terminus: ''
    });
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const hasChanged = (prevItineraire.depart !== itineraire.depart && itineraire.depart !== "") || (prevItineraire.terminus !== itineraire.terminus && itineraire.terminus !== ""); 
    const handleSubmit = () => {
        if (hasChanged) {
            updateDriverItineraire(driver.id, driver.vehiculeId, itineraire.depart, itineraire.terminus, (l, err, res) => {
                setLoading(l);

                if (err) {
                    console.log(err);
                    return;
                }

                if (res) {
                    dispatch(actions.setDriver({driver: res}));
                    setTimeout(() => {
                        setItineraire({
                            depart: "",
                            terminus: ""
                        });
                        setHasChanged(true);
                        onClose();
                    }, 200);
                }
            })
        }
    };

    const onCancel = () => {
        setItineraire({
            depart: "",
            terminus: ""
        })
        onClose();
    }

    useEffect(() => {
        getAll((l, err, res) => {
            if (err) {
                console.log(err);
                return;
            }

            if (res) {
                const extrems = [];
                res.forEach(i => {
                    if (!extrems.some(el => el === i.extremite[0])) {
                        extrems.push(i.extremite[0]);
                    }
                    if (!extrems.some(el => el === i.extremite[1])) {
                        extrems.push(i.extremite[1]);
                    }
                });

                setExtrems(extrems);
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
                    backgroundColor: "#00000021",
                },
            }}
        >
            <div className={classes.content}>
                <Box p={theme.spacing(2.5, 3, 3)}>
                    <Fade in={true}>
                        <div>
                            <Typography variant="h6">Modification de l'itinéraire</Typography>
                            <Box borderTop="1px solid #eaeaea" mt={1} pt={1} mb={1}>
                                <Typography variant="body2" sx={{fontSize: 15, fontWeight: 'bold'}}>Ancien itinéraire</Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                                    <Typography variant="caption" className={classes.cardTrajet}>
                                        <span>{prevItineraire.depart}</span>
                                        <span className={classes.cardSep}>
                                            <span className={classes.cardBul1}></span>
                                            <span className={classes.cardBar}></span>
                                            <span className={classes.cardBul2}></span>
                                        </span>
                                        <span>{prevItineraire.terminus}</span>
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2" sx={{fontSize: 15, fontWeight: 'bold'}}>Nouvel itinéraire</Typography>
                            <AutocompleteInput
                                options={extrems}
                                placeholder="Point de départ"
                                value={itineraire.depart}
                                onChange={(val) => setItineraire(it => ({ ...it, depart: val }))}
                            />
                            <AutocompleteInput
                                options={extrems}
                                placeholder="Termunus"
                                value={itineraire.terminus}
                                onChange={(val) => setItineraire(it => ({ ...it, terminus: val }))}
                            />
                            <Typography variant="caption">
                                <strong>Note:</strong> En modifiant votre itinéraire vous ne serez plus visible sur l'ancien itinéraire.
                            </Typography>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Button
                                    size="small"
                                    disableElevation
                                    color="secondary"
                                    variant="contained"
                                    onClick={handleSubmit}
                                    // disabled={itineraire.depart === "" || itineraire.terminus === ""}
                                    sx={{ marginTop: 2 }}
                                >
                                    Confirmer la modification
                                    {loading && <CircularProgress size={10} sx={{ml: 1}} />}
                                </Button>
                                <Button
                                    size="small"
                                    disableElevation
                                    color="default"
                                    variant="outlined"
                                    onClick={onCancel}
                                    sx={{ marginTop: 2 }}
                                >
                                    Annuler
                                </Button>
                            </Box>
                        </div>
                    </Fade>
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
        boxShadow: "0px 0px 20px #4e4e4e8f",
        width: 400,
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
    [theme.breakpoints.down('sm')]: {
        content: {
            width: "100%",
            padding: "20px 10px",
            transform: 'none',
            position: 'static',
            borderRadius: 0,
        }
    }
});

import React, { useState } from 'react';
import { TextField, Typography, Button, Modal, CircularProgress, Alert, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createArret } from '../../app/firebase/api/itineraire';
import models from '../../app/firebase/api/models';
import { Box } from '@mui/system';

export default function AddArret({ open, onClose, arret, itineraireId }) {
    const [nom, setNom] = useState(arret ? arret.nom : '');
    const [position, setPosition] = useState(arret ? arret.position && arret.position : []);
    const [loading, setLoading] = useState(false);
    const [searching, setSearching] = useState(false);
    const [error, setError] = useState(null);

    const handleGetPoisition = () => {
        setSearching(true);
        navigator.geolocation.getCurrentPosition((location) => {
            const { longitude, latitude } = location.coords;
            setPosition([longitude, latitude]);

            setSearching(false);
        }, err => {
            console.log(err);
            setSearching(false);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nom) {
            let data;
            if (arret) {
                let d = { id: arret.id };
                if (arret.nom !== nom) {
                    d = { ...d, nom };
                }

                if (arret.position !== position) {
                    d = { ...d, position };
                }

                data = d;
            } else {
                const arr = new models.Arret(itineraireId, nom.toLowerCase(), position);
                data = arr;
            }

            createArret(data, (l, err, res) => {
                setLoading(l);

                if (err) {
                    console.log(err);
                    setError(err);
                    return;
                }

                if (res) {
                    onClose();
                }
            });
        }

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
            <div className={classes.contentContainer}>
                <Typography>{arret ? "Mise à jour arret" : "Ajouter un arret"}</Typography>
                <form className={classes.form}>
                    {error && <Alert severity="error" color="error" style={{ marginBottom: 15 }}>{error}</Alert>}
                    <label
                        htmlFor="lim1"
                    >
                        <Typography variant="caption">Nom</Typography>
                        <TextField
                            name="lim1"
                            id="lim1"
                            placeholder="Nom de l'arret"
                            value={nom}
                            onChange={e => setNom(e.target.value)}
                            variant="outlined"
                            color="default"
                            size="small"
                            style={{
                                marginBottom: 15
                            }}
                            fullWidth
                        />
                    </label>
                    <Box marginBottom={2}>
                        <label
                            htmlFor="lim2"
                        >
                            <Typography variant="caption">Position</Typography>
                            <TextField
                                name="position"
                                id="lim2"
                                placeholder="Longitude, latitude"
                                value={position.length > 0 ? `${position[0]}, ${position[1]}` : ""}
                                variant="outlined"
                                color="default"
                                fullWidth
                                disabled
                                size="small"
                                style={{
                                    marginBottom: 15
                                }}
                            />
                        </label>
                        <Button
                            variant="outlined"
                            color="default"
                            onClick={handleGetPoisition}
                            type="submit"
                        >
                            Obtenir cette position
                            {searching && <CircularProgress size={10} color="inherit" style={{ marginLeft: 10 }} />}
                        </Button>
                    </Box>
                    <Box display="flex" alignItems="center" >
                        <Button
                            variant="contained"
                            color="secondary"
                            disableElevation
                            onClick={handleSubmit}
                            type="submit"
                        >
                            {arret ? "Modifier" : "Enregistrer"}
                            {loading && <CircularProgress size={10} color="inherit" style={{ marginLeft: 10 }} />}
                        </Button>
                        <Button
                            variant="text"
                            color="default"
                            disableElevation
                            onClick={onClose}
                            type="submit"
                            sx={{ marginLeft: 2 }}
                        >
                            Annuler
                        </Button>
                    </Box>
                </form>
            </div>
        </Modal>
    )
}

const useStyles = theme => makeStyles({
    contentContainer: {
        backgroundColor: '#fff',
        boxShadow: "0px 0px 20px #4e4e4e4a",
        width: 500,
        minHeight: 300,
        borderRadius: 7,
        position: 'absolute',
        top: 50,
        left: '50%',
        transform: 'translateX(-50%)',
        padding: 20,
    },
    form: {
        marginTop: 20
    },
    [theme.breakpoints.down('sm')]: {
        contentContainer: {
            width: "100%",
            padding: "20px 10px",
            // height: "100vh",
            transform: 'none',
            position: 'static'
        }
    }
})
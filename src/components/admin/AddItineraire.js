import React, { useState } from 'react';
import { TextField, Typography, Button, Modal, CircularProgress, Alert, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { createitineraire } from '../../app/firebase/api/itineraire';
import models from '../../app/firebase/api/models';
import { Box } from '@mui/system';

export default function AddItineraire({ open, onClose, itineraire }) {
    const [lim1, setLim1] = useState(itineraire ? itineraire.extremite[0] : '');
    const [lim2, setLim2] = useState(itineraire ? itineraire.extremite[1] : '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (lim1 !== "" && lim2 !== "") {
            let data;
            if (itineraire) {
                let d = itineraire.extremite || [];
                if (itineraire.depart !== lim1) {
                    d[0] = lim1;
                }
                if (itineraire.terminus !== lim2) {
                    d[1] = lim2;
                }
                data = { id: itineraire.id, extremite: d };
            } else {
                const it = new models.Itineraire(lim1.toLowerCase(), lim2.toLowerCase());
                data = it;
            }

            if (data) {
                createitineraire(data, (l, err, res) => {
                    setLoading(l);

                    if (err) {
                        console.log(err);
                        setError("Une erreur s'est produite lors de l'enregistrement.");
                        return;
                    }

                    if (res) {
                        setError(null);
                        setTimeout(() => {
                            onClose();
                        }, 300);
                    }
                });
            }
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
                <Typography>{itineraire ? "Mise à jour itineraire" : "Ajouter un itineraire"}</Typography>
                <form className={classes.form}>
                    {error && <Alert severity="error" color="error" style={{ marginBottom: 15 }}>{error}</Alert>}
                    <label
                        htmlFor="lim1"
                    >
                        <Typography variant="caption">Limite 1</Typography>
                        <TextField
                            name="lim1"
                            id="lim1"
                            value={lim1}
                            onChange={e => setLim1(e.target.value)}
                            variant="outlined"
                            color="default"
                            size="small"
                            style={{
                                marginBottom: 15
                            }}
                            fullWidth
                        />
                    </label>
                    <label
                        htmlFor="lim2"
                    >
                        <Typography variant="caption">Limite 2</Typography>
                        <TextField
                            name="lim2"
                            id="lim2"
                            value={lim2}
                            onChange={e => setLim2(e.target.value)}
                            variant="outlined"
                            color="default"
                            fullWidth
                            size="small"
                            style={{
                                marginBottom: 15
                            }}
                        />
                    </label>
                    <Box display="flex" alignItems="center" >
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleSubmit}
                            disableElevation
                            type="submit"
                        >
                            {itineraire ? "Modifier" : "Enregistrer"}
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
        padding: 20
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
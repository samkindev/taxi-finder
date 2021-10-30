import { Button, CircularProgress, Modal, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { deleteArret, deleteItineraire } from '../../app/firebase/api/itineraire';

export default function ConfirmDeleteItineraire({ open, itineraire, arret, onClose, message }) {
    const [loading, setLoading] = React.useState(false);

    const callback = (l, err, u) => {
        setLoading(l);
        if (err) {
            console.log(err);
            return;
        }
        if (u) {
            onClose();
        }
    };

    const confirmDelete = () => {
        if (itineraire) {
            deleteItineraire(itineraire.id, callback);
        } else if (arret) {
            deleteArret(arret.id, callback);
        }
    };
    const theme = useTheme();
    const classes = (makeStyles({
        contentContainer: {
            backgroundColor: '#fff',
            boxShadow: "0px 0px 20px #4e4e4e4a",
            width: 500,
            borderRadius: 7,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        [theme.breakpoints.down('sm')]: {
            contentContainer: {
                width: "100%",
                padding: "20px 10px",
                bottom: 0,
                top: 'auto',
                borderRadius: 0,
                left: 0,
                transform: 'none',
            }
        }
    }))();
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
                <Typography variant="caption" style={{ textAlign: 'center' }}>{message || `Voulez-vous vraiment supprimer l'itineraire ${itineraire.nom}`}</Typography>
                <Box display="flex" justifyContent="space-around" marginTop={2} minWidth="50%">
                    <Button
                        disableElevation
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={confirmDelete}
                    >
                        Supprimer
                        {loading && <CircularProgress size={10} color="inherit" style={{ marginLeft: 10 }} />}
                    </Button>
                    <Button
                        disableElevation
                        variant="outlined"
                        color="default"
                        size="small"
                        onClick={onClose}
                    >
                        Annuler
                    </Button>
                </Box>
            </div>
        </Modal>
    )
}

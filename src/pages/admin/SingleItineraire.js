import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getItineraireArret, getSingleItineraire } from '../../app/firebase/api/itineraire';
import { Add } from '@mui/icons-material';
import { Box } from '@mui/system';
import ArretTable from '../../components/admin/ArretsTable';
import { NoResult } from '../../components';
import AddArret from '../../components/admin/AddArret';

export default function SingleItineraire() {
    const { idItineraire } = useParams();
    const [itineraire, setItineraire] = useState();
    const [loading, setLoading] = useState(false);
    const [loadingArrets, setLoadingArrets] = useState(false);
    const [arrets, setArrets] = useState([]);
    const [addArret, setAddArret] = useState(false);

    const toggleAddArret = () => {
        setAddArret(!addArret);
    };

    useEffect(() => {
        getSingleItineraire(idItineraire, (l, err, it) => {
            setLoading(l);
            if (err) {
                console.log(err);
                return;
            }

            if (it) {
                setItineraire(it);
                getItineraireArret(it.id, (l, error, res) => {
                    setLoadingArrets(l);

                    if (error) {
                        console.log(error);
                        return;
                    }

                    if (res) {
                        setArrets(res);
                    }
                });
            }
        });
    }, [idItineraire]);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {(loading || !itineraire) ?
                <Box height="calc(100vh - 100px)" display="flex" justifyContent="center" alignItems="center">
                    <CircularProgress color="secondary" />
                </Box> :
                <div className={classes.container}>
                    <header>
                        <Typography variant="h3" style={{ textTransform: 'capitalize' }}>{itineraire.nom}</Typography>
                    </header>
                    <main className={classes.main}>
                        <Box>
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                pb={2.5}
                                pt={2.5}
                                mb={2.5}
                                borderBottom="1px solid #eaeaea"
                            >
                                <Typography>Liste des arrets</Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    disableElevation
                                    onClick={toggleAddArret}
                                >
                                    Ajouter
                                    <Add style={{ marginLeft: 10 }} />
                                </Button>
                                {addArret && <AddArret itineraireId={itineraire.id} open={addArret} onClose={toggleAddArret} />}
                            </Box>
                            {arrets.length === 0 ?
                                <NoResult message="Aucun arret enregistré pour cet itinéraire." height="calc(100vh - 100px)" /> :
                                loadingArrets ?
                                    <Box height="calc(100vh - 150px)" display="flex" justifyContent="center" alignItems="center">
                                        <CircularProgress color="secondary" />
                                    </Box> :
                                    <ArretTable rows={arrets} />
                            }
                        </Box>
                    </main>
                </div>
            }
        </div>
    )
}

const useStyles = makeStyles({
    root: {},
});
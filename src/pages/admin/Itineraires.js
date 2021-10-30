import React, { useEffect, useState } from 'react';
import { Typography, CircularProgress, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Add } from '@mui/icons-material';
import { getAll } from '../../app/firebase/api/itineraire';
import { Box } from '@mui/system';
import { NoResult } from '../../components';
import AddItineraire from '../../components/admin/AddItineraire';
import ItineraireTable from '../../components/admin/ItineraireTable';

export default function Itineraires() {
    const [itineraires, setItineraires] = useState([]);
    const [loading, setLoading] = useState(false);
    const [add, setAdd] = useState(false);

    const handleAddItineraire = () => {
        setAdd(true);
    };
    const handleCloseAdd = () => {
        setAdd(false);
    };

    useEffect(() => {
        getAll((l, err, its) => {
            setLoading(l);
            if (err) {
                console.log(err);
                return;
            }
            if (its) {
                setItineraires([...its]);
            }
        });
    }, []);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.main}>
                <header className={classes.header}>
                    <Typography className={classes.title}>Liste des itineraires</Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        disableElevation
                        sx={{ marginTop: 2 }}
                        onClick={handleAddItineraire}
                    >
                        Ajouter
                        <Add style={{ marginLeft: 10 }} />
                    </Button>
                    {add && <AddItineraire open={add} onClose={handleCloseAdd} />}
                </header>
                <div className={classes.list}>
                    {loading ?
                        <Box width='100%' height="50vh" display="flex" alignItems="center" justifyContent="center">
                            <CircularProgress size={100} color="secondary" />
                        </Box> :
                        itineraires.length === 0 ?
                            <NoResult message="Aucun itinéraire enregistré!!" height="calc(100vh - 200px)" /> :
                            <ItineraireTable rows={itineraires} />
                    }
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    root: {
        minHeight: '100vh',
    },
    main: {
    },
    header: {
        padding: "0 0 20px 0",
        borderBottom: '1px solid #eaeaea',
    },
    list: {
        padding: "20px 0"
    },
    item: {
        padding: "0!important",
        justifyContent: 'flex-start!important'
    }
});

import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Fade, Button, Radio, Grid, TextField, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import globalStyles from '../../styles/globalStyles';
import { Link } from 'react-router-dom';
import { createDriverAccount } from '../../app/firebase/api/user';
import models from '../../app/firebase/api/models';
import { getUser } from '../../app/reducers/user';
import { actions } from '../../app/reducers/driver';

export default function WelcomeChauffeur() {
    const user = useSelector(getUser);
    const [step, setStep] = useState(0);
    const [itineraire, setItineraire] = useState({
        depart: '',
        terminus: ''
    });
    const [typeTaxi, setTypeTaxi] = useState('');
    const [couleur, setCouleur] = useState('');
    const [marque, setmarque] = useState('');
    const [plaque, setPlaque] = useState('');
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const handleSubmit = e => {
        e.preventDefault();

        if (itineraire !== "" && typeTaxi !== "" && couleur !== "" && marque !== "" && plaque !== "" && user) {
            const taxi = {
                type: typeTaxi,
                couleur,
                marque, plaque
            };
            const Driver = models.Chauffeur;
            const d = new Driver(user.id, taxi, null, itineraire);
            createDriverAccount(d, (l, err, res) => {
                setLoading(l);

                if (err) {
                    console.log(err);
                    return;
                }

                dispatch(actions.setDriver({ driver: res }));
            });
        }
    };

    const goNext = () => {
        if (step >= 2) return;
        setStep(step + 1);
    };

    const goBack = () => {
        if (step <= 0) return;
        setStep(step - 1);
    };

    const globalClasses = globalStyles();
    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} sm={8}>
                <form className={classes.form}>
                    <Link to="/" className={classes.logoContainer}>
                        <Typography variant="h4" className={classes.logo}>Logo</Typography>
                    </Link>
                    <FormBlock title="Bienvenu Sam!" actionTitle="Suivant" goNext={goNext} goBack={goBack} step={step} index={0}>
                        <div className={clsx(classes.blockBody)}>
                            <Typography variant="h5" sx={{ marginBottom: 2, fontFamily: 'monospace' }}>Quel est votre itineraire?</Typography>
                            <TextField
                                color="default"
                                fullWidth
                                placeholder="Point de depart"
                                value={itineraire.depart}
                                onChange={e => setItineraire(it => ({
                                    ...it,
                                    depart: e.target.value
                                }))}
                                size="small"
                                sx={{
                                    margin: "16px 0"
                                }}

                            />
                            <TextField
                                color="default"
                                fullWidth
                                placeholder="Terminus (Fin de votre trajet)"
                                value={itineraire.terminus}
                                onChange={e => setItineraire(it => ({
                                    ...it,
                                    terminus: e.target.value
                                }))}
                                size="small"
                            />
                        </div>
                    </FormBlock>
                    <FormBlock title="Type de taxi." actionTitle="Suivant" goNext={goNext} goBack={goBack} step={step} index={1}>
                        <div className={clsx(classes.blockBody)}>
                            <Typography variant="h5" sx={{ marginBottom: 2, fontFamily: 'monospace' }}>Quel type de taxi conduisez-vou?</Typography>
                            <div className={clsx(globalClasses.centerVerticalFlex)}>
                                <label htmlFor="express" style={{ marginRight: 10, cursor: 'pointer' }} className={globalClasses.centerVerticalFlex}>
                                    <Radio onChange={e => setTypeTaxi(e.target.value)} checked={typeTaxi === "express"} value="express" type="radio" color="default" size="small" id="express" />
                                    <Typography variant="caption">Expresse</Typography>
                                </label>
                                <label htmlFor="commun" className={globalClasses.centerVerticalFlex} style={{ cursor: 'pointer' }}>
                                    <Radio onChange={e => setTypeTaxi(e.target.value)} checked={typeTaxi === "commun"} value="commun" type="radio" color="default" size="small" id="commun" />
                                    <Typography variant="caption">En commun</Typography>
                                </label>
                            </div>
                        </div>
                    </FormBlock>
                    <FormBlock title="Information du véhicule." actionTitle="Enregistrer" loading={loading} goNext={handleSubmit} goBack={goBack} step={step} index={2}>
                        <div>
                            <label>
                                <Typography variant="caption">Couleur</Typography>
                                <TextField
                                    color="default"
                                    fullWidth
                                    placeholder="La couleur de votre véhicule"
                                    value={couleur}
                                    onChange={e => setCouleur(e.target.value)}
                                    inputProps={{
                                        sx: {
                                            padding: "8px 14px"
                                        }
                                    }}
                                    sx={{
                                        margin: '4px 0',
                                        marginBottom: 2.3
                                    }}
                                />
                            </label>
                            <label>
                                <Typography variant="caption">Marque</Typography>
                                <TextField
                                    color="default"
                                    fullWidth
                                    placeholder="La marque de votre véhicule"
                                    value={marque}
                                    onChange={e => setmarque(e.target.value)}
                                    inputProps={{
                                        sx: {
                                            padding: "8px 14px"
                                        }
                                    }}
                                    sx={{
                                        margin: '4px 0',
                                        marginBottom: 2.3
                                    }}
                                />
                            </label>
                            <label>
                                <Typography variant="caption">Plaque d'immatriculation</Typography>
                                <TextField
                                    color="default"
                                    fullWidth
                                    placeholder="Immatriculation de votre véhicule"
                                    value={plaque}
                                    onChange={e => setPlaque(e.target.value)}

                                    inputProps={{
                                        sx: {
                                            padding: "8px 14px"
                                        }
                                    }}
                                    sx={{
                                        margin: '4px 0',
                                    }}
                                />
                            </label>
                        </div>
                    </FormBlock>
                </form>
            </Grid>
            <Grid item sm={4} className={classes.banner}></Grid>
        </Grid>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '100vh',
        alignItems: 'stretch'
    },
    form: {
        minHeight: '100vh',
        display: 'flex!important',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 24px',
        margin: 'auto'
    },
    bigTitle: {
        marginBottom: '35px!important',
        fontSize: '2.5rem!important',
        color: '#666'
    },
    banner: {
        backgroundColor: theme.palette.secondary.light,
    },
    logoContainer: {
        display: 'block',
        marginBottom: 50
    },
    block: {
        maxWidth: 430
    }
}));

const FormBlock = ({ title, goNext, goBack, children, actionTitle, step, index, loading }) => {
    const classes = useStyles();
    return (
        <>
            {step === index &&
                <Fade in={step === index}>
                    <div className={classes.block}>
                        <Typography variant="h2" sx={{ fontWeight: 400, fontFamily: 'monospace' }} className={classes.bigTitle}>{title}</Typography>
                        {children}
                        <Box display="flex" marginTop={5} justifyContent="space-between">
                            {step > 0 &&
                                <Button
                                    size="medium"
                                    color="default"
                                    variant="text"
                                    onClick={goBack}
                                    sx={{ marginRight: 20 }}
                                >
                                    <ChevronLeft />
                                    Précédent
                                </Button>
                            }
                            <Button
                                size="medium"
                                color="secondary"
                                variant="contained"
                                onClick={goNext}
                                disableElevation
                                type={step === 2 ? "submit" : "button"}
                                disabled={loading}
                            >
                                {actionTitle}
                                {step === 2 ? loading && <CircularProgress color="secondary" size={10} /> : loading ? <CircularProgress /> : <ChevronRight />}
                            </Button>
                        </Box>
                    </div>
                </Fade>
            }
        </>
    )
}
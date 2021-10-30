import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Button, Typography, useTheme } from '@mui/material';
import globalStyles from '../../styles/globalStyles';
import ItineraireModal from '../../components/Client/ItineraireModal';

export default function LandingPage() {
    const history = useHistory();
    const handleGoToCLient = () => {
        history.push("/client/1");
    };
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleGoToDriver = () => {
        history.push("/conducteur/1");
    };

    const theme = useTheme();
    const globalClasses = globalStyles();
    const classes = useStyles(theme)();
    return (
        <div className={classes.root}>
            {open && <ItineraireModal open={open} onClose={handleCloseModal} goToClient={handleGoToCLient} />}
            <div className={classes.container}>
                <div className={classes.heroContainer}>
                    <div className={clsx(classes.hero, globalClasses.centerFlex)}>
                        <div className={classes.heroContent}>
                            <Typography variant="title" component="h1" sx={{ lineHeight: 1.1, maxWidth: 800 }} className={classes.title}>Changez votre façon de vous déplacer</Typography>
                            <Typography variant="body1" className={classes.text1} style={{ color: '#444' }}>Conduisez en securité et gangez de l'argent.<br />Trouvez votre transport rapidement et gagnez du temps.</Typography>
                            <div className={clsx(globalClasses.centerFlex, classes.heroActions)} style={{ width: '100%' }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    sx={{
                                        fontSize: '1.1rem'
                                    }}
                                    onClick={handleOpenModal}
                                >
                                    Trouver un transport
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    sx={{
                                        marginLeft: 1.5,
                                        fontSize: '1.1rem'
                                    }}
                                    onClick={handleGoToDriver}
                                >
                                    Conduire un taxi
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const useStyles = theme => makeStyles({
    heroContainer: {
        overflowX: 'hidden'
    },
    hero: {
        minHeight: 530,
        maxWidth: '1220px',
        margin: 'auto',
        padding: 20
    },
    heroContent: {
        display: 'flex',
        flexDirection: 'column!important',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        "& p": {
            marginTop: 20,
            marginBottom: 20
        }
    },
    highLighted: {
        color: theme.palette.primary.main
    },
    text1: {
        maxWidth: '800px',
        fontWeight: '600!important',
    },
    contentWrapper: {
        maxWidth: 1220,
        margin: 'auto'
    },
    description: {
        padding: '100px 20px'
    },
    [theme.breakpoints.down("md")]: {
        title: {
            fontSize: '28px!important'
        },
        text1: {
            fontSize: '17px!important'
        },
        heroActions: {
            flexDirection: 'column',
            "& > button": {
                width: '100%',
                margin: 0,
            },
            "& > button:last-child": {
                marginTop: 20
            }
        }
    }
});

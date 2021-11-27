import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Button, Typography, useTheme } from '@mui/material';
import globalStyles from '../../styles/globalStyles';
import ItineraireModal from '../../components/Client/ItineraireModal';
import bg from '../../assets/bg.jpg';
import { getUser } from '../../app/reducers/user';

export default function LandingPage() {
    const user = useSelector(getUser);
    const history = useHistory();
    const goToLogin = () => {
        history.push("/login");
    };
    const handleGoToCLient = () => {
        if (user) {
            history.push("/client/1");
        } else {
            goToLogin();
        }
    };
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
        if (user) {
            setOpen(true);
        } else {
            goToLogin();
        }
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleGoToDriver = () => {
        if (user) {
            history.push("/conducteur/" + user.id);
        } else {
            goToLogin();
        }
    };

    const theme = useTheme();
    const globalClasses = globalStyles();
    const classes = useStyles(theme)();
    return (
        <div className={classes.root}>
            {open && <ItineraireModal open={open} onClose={handleCloseModal} goToClient={handleGoToCLient} />}
            <div className={classes.container}>
                <div className={clsx("home", classes.heroContainer)}>
                    <div className={clsx(classes.hero, globalClasses.centerFlex)}>
                        <div className={classes.heroContent}>
                            <Typography variant="title" component="h1" sx={{ lineHeight: 1.1, maxWidth: 800 }} className={classes.title}>Changez votre façon de vous déplacer</Typography>
                            <Typography variant="body1" className={classes.text1} style={{ color: 'inherit' }}>Conduisez en securité et gagnez de l'argent.<br />Trouvez votre transport rapidement et gagnez du temps.</Typography>
                            <div className={clsx(globalClasses.centerFlex, classes.heroActions)} style={{ width: '100%' }}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    disableElevation
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
                                    disableElevation
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
        overflowX: 'hidden',
        backgroundImage: "url(" + bg + ")",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        position: 'relative',
        color: '#fff',
    },
    hero: {
        height: 'calc(100vh - 52px)',
        maxWidth: '1220px',
        margin: 'auto',
        padding: 20,
        background: ' #00000047',
        color: 'inherit'
    },
    heroContent: {
        display: 'flex',
        flexDirection: 'column!important',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 10,
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
        heroContent: {
            background: '#0008',
            padding: 20,
            maxWidth: 550,
        },
        title: {
            fontSize: '40px!important'
        },
        text1: {
            fontSize: '20px!important'
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

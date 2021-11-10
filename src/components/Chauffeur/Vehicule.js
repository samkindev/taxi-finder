import React, { useState, useEffect } from 'react';
import { Modal, Fade, IconButton, useTheme, CircularProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { getSingleVehicule } from '../../app/firebase/api/vehicule';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ModifItineraire({ open, onClose, driver }) {
    const [loading, setLoading] = useState(false);
    const [vehicule, setVehicule] = useState();

    console.log(vehicule);

    useEffect(() => {
        getSingleVehicule(driver.vehiculeId, (l, err, res) => {
            setLoading(l);

            if (err) {
                console.log(err);
                return;
            }

            if (res) {
                setVehicule(res);
            }
        })
    }, [driver]);

    const theme = useTheme();
    const classes = useStyles(theme)();
    return (
        <Modal
            open={open}
            onBackdropClick={onClose}
            onClose={onClose}
            BackdropProps={{
                style: {
                    backgroundColor: "#f3f3f3c4",
                    backdropFilter: 'blur(5px)'
                },
            }}
        >
            <div className={classes.content}>
                <IconButton className={classes.closeBtn} onClick={onClose}>
                    <ArrowBackIcon />
                </IconButton>
                <Box p={theme.spacing(2.5, 3, 3)}>
                    {(loading || !vehicule) ?
                        <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
                            <CircularProgress color="secondary" />
                        </Box> :
                        <Fade in={true}>
                            <div>
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
        boxShadow: "0px 0px 20px #4e4e4e4d",
        width: 600,
        minHeight: '100vh',
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)'
    },
    closeBtn: {
        position: 'absolute!important',
        top: 10,
        left: 15
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

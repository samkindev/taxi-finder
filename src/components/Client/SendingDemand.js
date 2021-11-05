import React from 'react';
import clsx from 'clsx';
import { Avatar, Modal, Typography, Button, IconButton, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import globalStyles from '../../styles/globalStyles';
import { Box } from '@mui/system';
import { Close } from '@mui/icons-material';

export default function SendingDemand({ open, taxi, onClose, status, resend }) {
    const handleHangout = () => {
        setTimeout(() => {
            onClose();
        }, 300);
    };
    const theme = useTheme();
    const classes = useStyles(theme)();
    const globalClasses = globalStyles();
    return (
        <Modal
            open={open}
            onClose={onClose}
            BackdropProps={{
                style: {
                    backgroundColor: "rgb(215 215 215 / 39%)",
                },
            }}>
            <div className={clsx(globalClasses.centerFlex, classes.rootContainer)}>
                <div className={clsx(globalClasses.centerFlex, classes.content)}>
                    {status === "Commande confirmée." ?
                        <Box width="100%" height="100%" backgroundColor="#fff" color="#333" marginBottom="0px!important" className={clsx(globalClasses.centerFlex, classes.content)}>
                            <Typography>Votre demande est acceptée !</Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={onClose}
                            >Ok</Button>
                        </Box> :
                        status === "Command rejetée." ?
                            <Box width="100%" height="100%" backgroundColor="#fff" color="#333" marginBottom="0px!important" className={clsx(globalClasses.centerFlex, classes.content)}>
                                <Typography>Votre demande a été rejetée !</Typography>
                                <Box dispaly="flex" justifyContent="space-around" alignItems="center">
                                    <Button
                                        variant="outlined"
                                        color="default"
                                        style={{ marginRight: 10 }}
                                        onClick={onClose}
                                    >Choisir un autre taxi</Button>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={resend}
                                    >Renvoyer la demande</Button>
                                </Box>
                            </Box> :
                            <>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <Avatar style={{ width: 80, height: 80, marginBottom: 10 }} />
                                    <Typography variant="caption">Transport {taxi.type}</Typography>
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 500 }}>{taxi.depart} - {taxi.terminus}</Typography>
                                <Typography variant="caption" style={{ textAlign: 'center' }}>{status}</Typography>
                                <IconButton
                                    variant="contained"
                                    color="white"
                                    size="large"
                                    disableElevation
                                    sx={{ color: '#333', backgroundColor: '#fff' }}
                                    onClick={handleHangout}
                                >
                                    <Close color="error" />
                                </IconButton>
                            </>
                    }
                </div>
            </div>
        </Modal>
    )
}

const useStyles = theme => makeStyles({
    rootContainer: {
        width: '100%',
        height: '100%',
    },
    content: {
        maxWidth: 600,
        width: '60%',
        height: '100vh',
        backgroundColor: '#000000d1',
        boxShadow: "0px 0px 20px #4e4e4e4a",
        flexDirection: 'column',
        color: '#fff',
        "& > *": {
            marginBottom: '30px!important'
        }
    },
    [theme.breakpoints.down('sm')]: {
        content: {
            width: '100%',
            padding: 20
        }
    }
});

import React, { useState } from 'react';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { Avatar, Button, CircularProgress, Modal, Typography, useTheme } from '@mui/material';
import { confirmCommand, rejectCommad } from '../../app/firebase/api/commande';
import { getCurrentDriver } from '../../app/reducers/driver';
import globalStyles from '../../styles/globalStyles';

export default function NewCommand({ open, onClose, command }) {
    const driver = useSelector(getCurrentDriver);
    const [confirming, setConfirming] = useState(false);
    const [rejecting, setRejecting] = useState(false);

    const handleReject = () => {
        rejectCommad(command.id, (l, error, res) => {
            setRejecting(l);
            if (error) {
                console.log(error);
                return;
            }

            if (res) {
                onClose();
            }
        });
    };
    const handleConfirm = () => {
        confirmCommand(command.id, (l, error, res) => {
            setConfirming(l);
            if (error) {
                console.log(error);
                return;
            }

            if (res === 1) {
                onClose();
            }
        });
    };
    const theme = useTheme();
    const globalClasses = globalStyles();
    const classes = useStyles(theme)();
    return (
        <Modal open={open}>
            <div direction="up" in={open} className={clsx(globalClasses.centerFlex, classes.rootContainer)}>
                <div className={clsx(globalClasses.centerFlex, classes.contentContainer)}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar style={{ width: 80, height: 80, marginBottom: 10 }} />
                        <Typography variant="caption">Arret {command.arret}</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 500 }}>{driver.depart} - {driver.terminus}</Typography>
                    <Typography variant="caption" style={{ textAlign: 'center' }}>...</Typography>
                    <Box display="flex" alignItems="center" justifyContent="space-around">
                        <Button
                            variant="contained"
                            color="error"
                            size="large"
                            disableElevation
                            onClick={handleReject}
                            style={{ marginRight: 10 }}
                        >
                            Rejeter
                            {rejecting && <CircularProgress size={10} color="inherit" style={{ marginLeft: 10 }} />}
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            disableElevation
                            onClick={handleConfirm}
                        >
                            Confirmer
                            {confirming && <CircularProgress size={10} color="inherit" style={{ marginLeft: 10 }} />}
                        </Button>

                    </Box>
                </div>
            </div>
        </Modal>
    );
}

const useStyles = theme => makeStyles({
    rootContainer: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
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
        contentContainer: {
            width: '100%',
            padding: 20
        }
    }
});
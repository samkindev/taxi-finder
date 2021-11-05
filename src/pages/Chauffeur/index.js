import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { subscibeDriver } from '../../app/firebase/api/commande';
import { getCurrentDriver } from '../../app/reducers/driver';
import NewCommand from '../../components/Chauffeur/NewCommand';
import { updateVehiculeLocation } from '../../app/firebase/api/vehicule';

export default function MainPage() {
    const [newCommand, setNewCommand] = useState(false);
    const [command, setCommand] = useState({});

    const handleClose = () => {
        setNewCommand(false);
    };

    const containerRef = useRef();

    const driver = useSelector(getCurrentDriver);
    useEffect(() => {
        const unsub = subscibeDriver(driver.vehiculeId, (l, err, res) => {
            console.log(l, err);
            if (res) {
                if (res.length === 1) {
                    setNewCommand(true);
                    setCommand(res[0]);
                }
            }
        });

        const unw = navigator.geolocation.watchPosition((position) => {
            console.log(position.coords);
            updateVehiculeLocation(
                driver.vehiculeId,
                { lon: position.coords.longitude, lat: position.coords.latitude },
                (l, err, res) => {
                    if (res) {
                        console.log("Position changed");
                    }
                }
            );
        }, (err) => {
            console.log(err);
        });

        return () => {
            navigator.geolocation.clearWatch(unw);
            unsub();
        };
    }, [driver.vehiculeId]);
    return (
        <div>
            <Typography variant="h1">Driver</Typography>
            {newCommand &&
                <NewCommand open={newCommand} onClose={handleClose} command={command} containerRef={containerRef} />
            }
        </div>
    )
}

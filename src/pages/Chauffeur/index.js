import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { subscibeDriver } from '../../app/firebase/api/commande';
import { getCurrentDriver } from '../../app/reducers/driver';
import NewCommand from '../../components/Chauffeur/NewCommand';

export default function MainPage() {
    const [newCommand, setNewCommand] = useState(false);
    const [command, setCommand] = useState({});

    const handleClose = () => {
        setNewCommand(false);
    };

    const containerRef = useRef();

    const driver = useSelector(getCurrentDriver);
    useEffect(() => {
        subscibeDriver(driver.id, (l, err, res) => {
            if (res) {
                if (res.length === 1) {
                    setNewCommand(true);
                    setCommand(res[0]);
                }
            }
        });
    }, [driver.id]);
    return (
        <div>
            <Typography variant="h1">Driver</Typography>
            {newCommand &&
                <NewCommand open={newCommand} onClose={handleClose} command={command} containerRef={containerRef} />
            }
        </div>
    )
}

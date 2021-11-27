import React, { useState } from 'react';
import clsx from 'clsx';
import { TextField, Typography, Button, CircularProgress, Alert, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import globalStyles from '../../styles/globalStyles';
import { Link } from 'react-router-dom';
import { getCurrentUser, login } from '../../app/firebase/api/user';
import { useDispatch } from 'react-redux';
import { actions } from '../../app/reducers/user';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dispatch = useDispatch();
    const handleSubmit = () => {
        if (email !== "" && password !== "") {
            login(email, password, (l, err, res) => {
                setLoading(l);

                if (err) {
                    setError("Une erreur s'est produite lors de l'envoie de la requête.");
                    return;
                }

                if (res) {
                    dispatch(actions.connectUser({
                        loading: l,
                        user: getCurrentUser()
                    }));
                }
            });
        }
    };

    const theme = useTheme();
    const globalClasses = globalStyles();
    const classes = useStyles(theme)();
    return (
        <form className={classes.form}>
            <Typography variant="h1" className={classes.title}>Connexion à votre compte</Typography>
            {error && <Alert severity="error" color="error" sx={{ margin: '10px 0' }}>{error}</Alert>}
            <TextField
                name="email"
                id="email"
                placeholder="email@domain.dom"
                value={email}
                onChange={e => setEmail(e.target.value)}
                variant="outlined"
                color="default"
                style={{
                    marginBottom: 15
                }}
                fullWidth
            />
            <TextField
                name="password"
                id="password"
                type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                variant="outlined"
                fullWidth
                color="default"
                style={{
                    marginBottom: 15
                }}
            />
            <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleSubmit}
                disableElevation
                disabled={loading}
            >
                Connexion
                {loading && <CircularProgress color="inherit" size={10} style={{ marginLeft: 10 }} />}
            </Button>
            <div className={clsx(globalClasses.centerFlex)} style={{ padding: '20px 0' }}>
                <Typography variant="body2" color="GrayText">Vous n'avez pas de compte ?</Typography>
                <Link to="/signup" style={{ marginLeft: 10 }}>
                    <Button
                        variant="outlined"
                        color="default"
                        size="small"
                    >
                        Créer
                    </Button>
                </Link>
            </div>
        </form>
    )
}

const useStyles = theme => makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: 400,
        margin: 'auto',
        padding: '20px',
        boxShadow: theme.shadows[2],
        borderRadius: theme.spacing(2),
    },
    title: {
        fontSize: '1.5rem!important',
        fontWeight: '500!important',
        textAlign: 'center',
        margin: '0 0 20px!important'
    },
    [theme.breakpoints.down("sm")]: {
        form: {
            width: "100%",
            margin: 'auto',
            padding: '20px',
            boxShadow: "none",
            borderRadius: 0,
        },
    }
});
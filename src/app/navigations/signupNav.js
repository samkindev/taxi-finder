import React, { useState } from 'react';
import { Switch, Route, useRouteMatch, useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Button, TextField, Typography, Select, MenuItem, Alert, CircularProgress, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { signupUser, createUtilisateur, getCurrentUser } from '../firebase/api/user';
import models from '../firebase/api/models';
import { useDispatch } from 'react-redux';
import { actions } from '../reducers/user';

const useStyles = theme => makeStyles({
    root: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        width: '35%',
        minWidth: 400,
        margin: 'auto',
        padding: '20px',
        boxShadow: '0px 0px 1px 0px rgb(137 135 135), 0px 0px 1px 0px rgb(159 159 159), 0px 0px 1px 0px rgb(187 187 187)',
        borderRadius: theme.spacing(1.25),
    },
    [theme.breakpoints.down("sm")]: {
        wrapper: {
            width: "100%",
            minWidth: '100%',
            margin: 'auto',
            padding: '20px',
            boxShadow: "none",
            borderRadius: 0,
        },
    }
});

export default function SignupNav() {
    const { path } = useRouteMatch();

    const { url } = useRouteMatch();
    const history = useHistory();
    const goNext = (u) => {
        history.push(url + u);
    };

    const theme = useTheme();
    const classes = useStyles(theme)();
    return (
        <div className={classes.root}>
            <Switch>
                <Route path={`${path}/user/:userId`} component={() => <UserData />} />
                <Route path={`${path}/password`} component={() => <PasswordForm goNext={goNext} />} />
                <Route path={path} component={() => <EmailForm goNext={goNext} />} />
            </Switch>
        </div>
    )
}

const EmailForm = ({ goNext }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const onSubmit = () => {
        if (email !== "" && password !== "" && password === confirmPass) {
            signupUser(email, password, (l, err, res) => {
                setLoading(l);

                setError(err);

                if (err || !res) {
                    return;
                }

                goNext("/user/" + res.uid);
            })
        }
    }
    const theme = useTheme();
    const classes = useStyles(theme)();
    return (
        <div className={classes.wrapper}>
            <Typography color="textGray" sx={{ marginBottom: 2 }}>Votre addresse mail et mot de passe</Typography>
            {error && <Alert severity="error" color="error" style={{ margin: '10px 0' }}>{error}</Alert>}
            <label htmlFor="nom">
                <Typography variant="caption">Email</Typography>
                <TextField
                    name="email"
                    id="email"
                    type="email"
                    placeholder="mail@domain.dom"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    variant="outlined"
                    fullWidth
                    color="default"
                    inputProps={{
                        sx: {
                            padding: "8px 14px"
                        }
                    }}
                    sx={{
                        marginBottom: 2,
                    }}
                />
            </label>
            <label htmlFor="nom">
                <Typography variant="caption">Mot de passe</Typography>
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
                    inputProps={{
                        sx: {
                            padding: "8px 14px"
                        }
                    }}
                    sx={{
                        marginBottom: 2,
                    }}
                />
            </label>
            <label htmlFor="nom">
                <Typography variant="caption">Confirmer mot de passe</Typography>
                <TextField
                    name="confirmPass"
                    id="confirmPass"
                    type="password"
                    placeholder="Confirmer mot de passe"
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    variant="outlined"
                    fullWidth
                    color="default"
                    inputProps={{
                        sx: {
                            padding: "8px 14px"
                        }
                    }}
                    sx={{
                        margin: "4px 0",
                        marginBottom: 0.5,
                    }}
                />
            </label>
            <Box display="flex" justifyContent='flex-end' marginTop={2}>
                <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={onSubmit}
                    disabled={loading}
                    disableElevation
                >
                    Suivant
                    {loading ? <CircularProgress color="inherit" style={{ marginLeft: 10 }} size={10} /> : <ChevronRightIcon />}
                </Button>
            </Box>
        </div>
    );
}

const PasswordForm = ({ goNext }) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const theme = useTheme();
    const classes = useStyles(theme)();
    return (
        <form className={classes.wrapper}>
            <Typography color="textGray" sx={{ marginBottom: 2 }}>Ajoutez un mot de passe à votre compte</Typography>
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
                sx={{
                    marginBottom: 2
                }}
            />
            <TextField
                name="confirm_password"
                id="confirm_password"
                type="password"
                placeholder="Votre mot de passe"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                variant="outlined"
                fullWidth
                color="default"
                sx={{
                    marginBottom: 2
                }}
            />
            <Box display="flex" justifyContent='flex-end'>
                <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={goNext}
                    disableElevation
                >
                    Suivant
                    <ChevronRightIcon />
                </Button>
            </Box>
        </form>
    )
};


const UserData = () => {
    const [nom, seNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [sexe, setSexe] = useState('');
    const [tel, setTel] = useState('');
    const [ville, setVille] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { userId } = useParams();

    const reset = () => {
        seNom('');
        setPrenom('');
        setSexe('');
        setVille('');
    }

    const history = useHistory();
    const dispatch = useDispatch();
    const handleSubmit = () => {
        if (nom !== "" && prenom !== "" && sexe !== "" && ville !== "" && userId) {
            const User = models.User;
            const c = new User(userId, nom, prenom, sexe, ville);
            createUtilisateur(c, (l, error, res) => {
                setLoading(l);
                if (error) {
                    console.log(error);
                    setError("Une erreur s'est produite lors de l'enregistrement");
                    return;
                }

                if (res) {
                    reset();
                    dispatch(actions.connectUser({
                        loading: l,
                        user: getCurrentUser()
                    }));
                    history.push("/");
                }
            });
        }
    };

    const theme = useTheme();
    const classes = useStyles(theme)();
    return (
        <form className={classes.wrapper}>
            {error && <Alert severity="error" color="error">{error}</Alert>}
            <label htmlFor="nom">
                <Typography variant="caption">Nom</Typography>
                <TextField
                    name="nom"
                    id="nom"
                    type="text"
                    placeholder="Votre nom"
                    value={nom}
                    onChange={e => seNom(e.target.value)}
                    variant="outlined"
                    fullWidth
                    color="default"
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
            <label htmlFor="prenom">
                <Typography variant="caption">Prenom</Typography>
                <TextField
                    name="prenom"
                    id="prenom"
                    type="text"
                    placeholder="Votre prenom"
                    value={prenom}
                    onChange={e => setPrenom(e.target.value)}
                    variant="outlined"
                    fullWidth
                    color="default"
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
            <label htmlFor="sexe">
                <Typography variant="caption">Sexe</Typography>
                <Select
                    id="sexe"
                    variant="outlined"
                    color="default"
                    fullWidth
                    placeholder="Homme ou femme"
                    value={sexe}
                    onChange={e => setSexe(e.target.value)}
                    inputProps={{
                        sx: {
                            padding: "8px 14px"
                        }
                    }}
                    sx={{
                        margin: "4px 0",
                        marginBottom: 0.5,
                    }}
                >
                    <MenuItem value="homme">Home</MenuItem>
                    <MenuItem value="femme">Femme</MenuItem>
                </Select>
            </label>
            <label htmlFor="tel">
                <Typography variant="caption">Tel</Typography>
                <TextField
                    name="tel"
                    id="tel"
                    type="tel"
                    placeholder="Votre numéro de téléphone"
                    value={tel}
                    onChange={e => setTel(e.target.value)}
                    variant="outlined"
                    fullWidth
                    color="default"
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
            <label htmlFor="ville">
                <Typography variant="caption">Ville</Typography>
                <TextField
                    name="ville"
                    id="ville"
                    type="text"
                    placeholder="Votre ville"
                    value={ville}
                    onChange={e => setVille(e.target.value)}
                    variant="outlined"
                    fullWidth
                    color="default"
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
            <Box display="flex" justifyContent='flex-start'>
                <Button
                    variant="contained"
                    color="secondary"
                    size="medium"
                    onClick={handleSubmit}
                    sx={{ marginTop: 1 }}
                    disableElevation
                >
                    Terminer
                    {loading && <CircularProgress size={10} color="inherit" style={{ marginLeft: 10 }} />}
                </Button>
            </Box>
        </form>
    )
}
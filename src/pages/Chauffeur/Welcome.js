import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import {
	Typography,
	Fade,
	Button,
	Radio,
	Grid,
	TextField,
	CircularProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import globalStyles from "../../styles/globalStyles";
import { Link } from "react-router-dom";
import { createDriverAccount, updateDriver } from "../../app/firebase/api/user";
import models from "../../app/firebase/api/models";
import { getUser } from "../../app/reducers/user";
import { actions, getCurrentDriver } from "../../app/reducers/driver";
import { AutocompleteInput } from "../../components";
import { getAll } from "../../app/firebase/api/itineraire";
import { createVehicule } from "../../app/firebase/api/vehicule";
import { Logo } from "../../components";

export default function WelcomeChauffeur() {
	const user = useSelector(getUser);
	const chauffeur = useSelector(getCurrentDriver);
	const [permi, setPermi] = useState("");
	const [step, setStep] = useState(chauffeur ? 1 : 0);
	const [itineraires, setItineraires] = useState([]);
	const [course, setCourse] = useState(null);
	const [terms, setTerms] = useState([]);
	const [itineraire, setItineraire] = useState({
		depart: "",
		terminus: "",
	});
	const [typeTaxi, setTypeTaxi] = useState("");
	const [couleur, setCouleur] = useState("");
	const [marque, setmarque] = useState("");
	const [plaque, setPlaque] = useState("");
	const [loading, setLoading] = useState(false);
	const [vLoading, setVLoading] = useState(false);

	const dispatch = useDispatch();
	const submitVehicule = () => {
		console.log(chauffeur);
		if (
			chauffeur !== null &&
			user !== null &&
			typeTaxi !== "" &&
			marque !== "" &&
			couleur !== "" &&
			plaque !== "" &&
			itineraire.depart !== "" &&
			itineraire.terminus !== ""
		) {
			const vehicule = new models.Vehicule(
				chauffeur.id,
				`${user.prenom} ${user.nom}`,
				typeTaxi,
				marque,
				couleur,
				plaque,
				null,
				itineraire.depart,
				itineraire.terminus,
				null
			);

			createVehicule(vehicule, (l, err, res) => {
				setVLoading(l);

				if (err) {
					console.log(err);
					return;
				}

				if (res) {
					updateDriver(
						chauffeur.id,
						{
							vehiculeId: res.id,
							typeTaxi: res.type,
							depart: res.depart,
							terminus: res.terminus,
						},
						(l, err, res) => {
							if (err) {
								console.log(err);
							}

							if (res) {
								dispatch(actions.setDriver({ driver: res }));
							}
						}
					);
				}
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (permi !== "" && user) {
			const Driver = models.Chauffeur;
			const d = new Driver(user.id, null, "", "", "", "", permi);
			createDriverAccount(d, (l, err, res) => {
				setLoading(l);

				if (err) {
					console.log(err);
					return;
				}

				if (res) {
					const { createdAt, ...driver } = res;
					dispatch(actions.setDriver({ driver: driver }));
					setStep(step + 1);
				}
			});
		}
	};

	const checkItineraire = () => {
		const text = itineraire.depart + " - " + itineraire.terminus;
		const c = itineraires.find((it) => it.nom.indexOf(text) !== -1);

		if (c) {
			setCourse(c);
		}
	};

	const goNext = () => {
		if (step >= 3) return;
		setStep(step + 1);
	};

	const goBack = () => {
		if (step <= 1) return;
		setStep(step - 1);
	};

	useEffect(() => {
		getAll((l, err, res) => {
			if (err) {
				console.log(err);
				return;
			}

			if (res) {
				setItineraires(res);
				const terms = [];
				res.forEach((i) => {
					if (!terms.some((el) => el === i.extremite[0])) {
						terms.push(i.extremite[0]);
					}
					if (!terms.some((el) => el === i.extremite[1])) {
						terms.push(i.extremite[1]);
					}
				});

				console.log(terms);
				setTerms(terms);
			}
		});
	}, []);

	const globalClasses = globalStyles();
	const classes = useStyles();
	return (
		<Grid container className={classes.root}>
			<Grid item xs={12} sm={8}>
				<form className={classes.form}>
					<Box mb={2}>
						<Link to="/" className={classes.logoContainer}>
							<Logo width={100} />
						</Link>
					</Box>
					<FormBlock
						title={`${
							user.sexe === "homme" ? "Bienvenu" : "Bienvenue"
						} ${user.prenom}!`}
						actionTitle="Suivant"
						goNext={handleSubmit}
						goBack={goBack}
						loading={loading}
						step={step}
						index={0}
					>
						<div className={clsx(classes.blockBody)}>
							<Typography
								variant="h5"
								sx={{
									marginBottom: 2,
								}}
							>
								Cr??ation de votre compte chauffeur.
							</Typography>
							<label>
								<Typography variant="caption">
									Permi de conduire
								</Typography>
								<TextField
									color="default"
									fullWidth
									placeholder="Le num??ro de votre permi"
									value={permi}
									onChange={(e) => setPermi(e.target.value)}
									inputProps={{
										sx: {
											padding: "8px 14px",
										},
									}}
									sx={{
										margin: "4px 0",
										marginBottom: 2.3,
									}}
								/>
							</label>
						</div>
					</FormBlock>
					<FormBlock
						title="Itin??raire"
						actionTitle="Suivant"
						displayActions={course ? false : true}
						goNext={checkItineraire}
						goBack={goBack}
						step={step}
						index={1}
					>
						<div className={clsx(classes.blockBody)}>
							{course ? (
								<Box>
									<Typography
										variant="h5"
										sx={{
											marginBottom: 2,
	
										}}
									>
										Confirmez votre itin??raire.
									</Typography>
									<Typography
										variant="h5"
										sx={{
											p: 1,
											border: "1px solid #eaeaea",
											backgroundColor: "#0096ff14",
											borderRadius: 1.25,
										}}
									>
										{course.nom}
									</Typography>
									<Box
										display="flex"
										marginTop={5}
										alignItems="center"
									>
										<Button
											size="medium"
											color="secondary"
											variant="contained"
											onClick={goNext}
											disableElevation
										>
											Confirmer
										</Button>
										<Button
											size="medium"
											color="default"
											variant="text"
											onClick={() => setCourse(null)}
											sx={{ marginLeft: 2 }}
										>
											Modifier
										</Button>
									</Box>
								</Box>
							) : (
								<>
									<Typography
										variant="h5"
										sx={{
											marginBottom: 2,
	
										}}
									>
										Quel est votre itin??raire ?
									</Typography>
									<AutocompleteInput
										options={terms}
										value={itineraire.depart}
										onChange={(val) =>
											setItineraire((it) => ({
												...it,
												depart: val,
											}))
										}
									/>
									<AutocompleteInput
										options={terms}
										value={itineraire.terminus}
										onChange={(val) =>
											setItineraire((it) => ({
												...it,
												terminus: val,
											}))
										}
									/>
								</>
							)}
						</div>
					</FormBlock>
					<FormBlock
						title="Type de taxi."
						actionTitle="Suivant"
						goNext={goNext}
						goBack={goBack}
						step={step}
						index={2}
					>
						<div className={clsx(classes.blockBody)}>
							<Typography
								variant="h5"
								sx={{
									marginBottom: 2,
								}}
							>
								Quel type de taxi conduisez-vous ?
							</Typography>
							<div
								className={clsx(
									globalClasses.centerVerticalFlex
								)}
							>
								<label
									htmlFor="express"
									style={{
										marginRight: 10,
										cursor: "pointer",
									}}
									className={globalClasses.centerVerticalFlex}
								>
									<Radio
										onChange={(e) =>
											setTypeTaxi(e.target.value)
										}
										checked={typeTaxi === "express"}
										value="express"
										type="radio"
										color="default"
										size="small"
										id="express"
									/>
									<Typography variant="caption">
										Express
									</Typography>
								</label>
								<label
									htmlFor="commun"
									className={globalClasses.centerVerticalFlex}
									style={{ cursor: "pointer" }}
								>
									<Radio
										onChange={(e) =>
											setTypeTaxi(e.target.value)
										}
										checked={typeTaxi === "commun"}
										value="commun"
										type="radio"
										color="default"
										size="small"
										id="commun"
									/>
									<Typography variant="caption">
										En commun
									</Typography>
								</label>
							</div>
						</div>
					</FormBlock>
					<FormBlock
						title="Information du v??hicule."
						actionTitle="Enregistrer"
						loading={vLoading}
						goNext={submitVehicule}
						goBack={goBack}
						step={step}
						index={3}
					>
						<div>
							<label>
								<Typography variant="caption">
									Couleur
								</Typography>
								<TextField
									color="default"
									fullWidth
									placeholder="La couleur de votre v??hicule"
									value={couleur}
									onChange={(e) => setCouleur(e.target.value)}
									inputProps={{
										sx: {
											padding: "8px 14px",
										},
									}}
									sx={{
										margin: "4px 0",
										marginBottom: 2.3,
									}}
								/>
							</label>
							<label>
								<Typography variant="caption">
									Marque
								</Typography>
								<TextField
									color="default"
									fullWidth
									placeholder="La marque de votre v??hicule"
									value={marque}
									onChange={(e) => setmarque(e.target.value)}
									inputProps={{
										sx: {
											padding: "8px 14px",
										},
									}}
									sx={{
										margin: "4px 0",
										marginBottom: 2.3,
									}}
								/>
							</label>
							<label>
								<Typography variant="caption">
									Plaque d'immatriculation
								</Typography>
								<TextField
									color="default"
									fullWidth
									placeholder="Immatriculation de votre v??hicule"
									value={plaque}
									onChange={(e) => setPlaque(e.target.value)}
									inputProps={{
										sx: {
											padding: "8px 14px",
										},
									}}
									sx={{
										margin: "4px 0",
									}}
								/>
							</label>
						</div>
					</FormBlock>
				</form>
			</Grid>
			<Grid item sm={4} className={classes.banner}></Grid>
		</Grid>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		minHeight: "100vh",
		alignItems: "stretch",
	},
	form: {
		minHeight: "100vh",
		display: "flex!important",
		flexDirection: "column",
		justifyContent: "center",
		padding: "0 24px",
		margin: "auto",
	},
	bigTitle: {
		marginBottom: "35px!important",
		fontSize: "2.5rem!important",
		color: "#666",
	},
	banner: {
		backgroundColor: theme.palette.secondary.light,
	},
	logoContainer: {
		display: "block",
		marginBottom: 50,
	},
	block: {
		maxWidth: 430,
	},
}));

const FormBlock = ({
	title,
	goNext,
	goBack,
	children,
	actionTitle,
	step,
	index,
	loading,
	displayActions = true,
}) => {
	const classes = useStyles();
	return (
		<>
			{step === index && (
				<Fade in={step === index}>
					<div className={classes.block}>
						<Typography
							variant="h2"
							sx={{ fontWeight: 400, fontFamily: "monospace" }}
							className={classes.bigTitle}
						>
							{title}
						</Typography>
						{children}
						{displayActions && (
							<Box
								display="flex"
								marginTop={5}
								justifyContent="space-between"
							>
								{step > 0 && (
									<Button
										size="medium"
										color="default"
										variant="text"
										onClick={goBack}
										sx={{ marginRight: 20 }}
									>
										<ChevronLeft />
										Pr??c??dent
									</Button>
								)}
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
									{step === 2 ? (
										loading && (
											<CircularProgress
												color="secondary"
												size={10}
											/>
										)
									) : loading ? (
										<CircularProgress
											color="secondary"
											size={10}
										/>
									) : (
										<ChevronRight />
									)}
								</Button>
							</Box>
						)}
					</div>
				</Fade>
			)}
		</>
	);
};

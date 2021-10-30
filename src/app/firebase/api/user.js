import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, getDocs, getDoc, query, where, doc } from 'firebase/firestore';
import firebase from '..';
import models from './models';

const auth = firebase.auth;
const db = firebase.db;

/**
 * The function to signup the user.
 * @param {string} email The user email
 * @param {string} password The user password
 * @param {function} cb the callback function, (loading, error, response)
 */
export const signupUser = (email, password, cb) => {
    cb(true, null, null);
    createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
            cb(false, null, res.user);
        })
        .catch(err => {
            console.log(err);
            let error = err.message;
            if (err.message === "Firebase: Error (auth/email-already-in-use).") {
                error = "C'est email existe déjà.";
            }

            cb(false, error, null);
        });
};

/**
 * Creates a user data object in the db
 * @param {object} data The user data object
 */
export const createUtilisateur = async (data, cb) => {
    try {
        cb(true, null, null);
        const ref = collection(db, 'utilisateurs').withConverter(models.userConverter);
        const clientRef = await addDoc(ref, data);
        cb(false, null, clientRef.withConverter(models.userConverter));
    } catch (error) {
        console.log(error);
        cb(null, error.message, null);
    }
};

/**
 * 
 * @param {string} email The user email
 * @param {string} password the user password
 * @param {function} cb The callback function to be called, (loading, err, response) 
 */
export const login = (email, password, cb) => {
    cb(true, null, null);
    signInWithEmailAndPassword(auth, email, password)
        .then(res => {
            cb(false, null, res.user);
        })
        .catch(err => {
            let msg = "Une erreur s'est produite lors de la connexion à votre compte";

            if (err.message === 'Firebase: Error (auth/user-not-found).' || err.message === 'Firebase: Error (auth/wrong-password).') {
                msg = "Echec d'authentification. Email ou mot de passe incorrect.";
            }

            cb(false, msg, null);
        });
};

/**
 * Log out the user
 * @param {function} cb Callback function
 */
export const logoutUser = async (cb) => {
    try {
        cb(true, null);
        await auth.signOut();
        cb(false, null);
    } catch (error) {
        console.log(error);
        cb(error.message);
    }
};

export const getCurrentUser = () => {
    return firebase.auth.currentUser;
};

/**
 * Gets the user Data.
 * @param {function} cb Callback function to be called at the end of the transaction
 */
export const getUserData = (cb) => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            cb(true, null, null);
            try {
                const id = user.uid;
                const uCol = collection(db, "utilisateurs");
                const q = query(uCol, where("user", "==", id)).withConverter(models.userConverter);
                const uRef = (await getDocs(q)).docs;
                const u = uRef[0];
                if (u) {
                    cb(false, null, {
                        id: u.id,
                        ...u.data(),
                        providerData: user.providerData[0]
                    });
                } else {
                    cb(false, null, null);
                }
            } catch (error) {
                cb(false, null, error.message);
            }
        } else {
            cb(false, null, null);
        }
    });
};


/**
 * 
 * @param {object} data Driver data
 * @param {function} cb 
 */
export const createDriverAccount = async (data, cb) => {
    try {
        cb(true, null);
        const ref = collection(db, 'chauffeurs').withConverter(models.chauffeurConverter);
        const dRef = (await addDoc(ref, data));

        const d = await getDoc(dRef.withConverter(models.chauffeurConverter));

        cb(false, null, {
            id: d.id,
            ...d.data()
        });
    } catch (error) {
        console.log(error);
        cb(null, error.message, null);
    }
};


/**
 * Gets the driver account by the user id.
 * @param {string} userId The connected user id
 * @param {function} cb The callback function to be called
 */

export const getDriver = async (userId, cb) => {
    cb(true, null, null);
    try {
        const q = query(collection(db, "chauffeurs"), where("utilisateur", "==", userId)).withConverter(models.chauffeurConverter);
        const snapShot = (await getDocs(q)).docs;
        const d = snapShot[0];

        if (d) {
            cb(false, null, {
                id: d.id,
                ...d.data()
            });
        } else {
            cb(false, null, null);
        }
    } catch (error) {
        cb(false, error.message);
    }
};

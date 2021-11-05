import { collection, addDoc, getDocs, getDoc, query, where, doc, updateDoc } from 'firebase/firestore';
import firebase from '..';
import models from './models';

const db = firebase.db;


/**
 * Creates a vehicle data in the db
 * @param {object} data The user data object
 */
export const createVehicule = async (data, cb) => {
    try {
        cb(true, null, null);
        const ref = collection(db, 'vehicules').withConverter(models.vehiculeConverter);
        const vRef = await addDoc(ref, data);

        const vehicule = await getDoc(vRef.withConverter(models.vehiculeConverter));

        cb(false, null, {
            id: vehicule.id,
            ...vehicule.data()
        });
    } catch (error) {
        console.log(error);
        cb(null, error.message, null);
    }
};

export const updateVehiculeLocation = async (vehiculeId, position, cb) => {
    try {
        cb(true, null, 0);
        const vRef = doc(db, "vehicules", vehiculeId);
        await updateDoc(vRef.withConverter(models.vehiculeConverter), { position });

        cb(false, null, 1);
    } catch (error) {
        cb(false, error.message, null);
    }
};

export const getCommandVehicle = async (itineraire, cb) => {
    cb(true, null, null);
    try {
        const q = query(collection(db, "vehicle"), where("depart", "==", itineraire.depart), where("terminus", "==", itineraire.terminus)).withConverter(models.vehiculeConverter);
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
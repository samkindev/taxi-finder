import { collection, addDoc, getDocs, getDoc, query, where, doc, onSnapshot, updateDoc, collectionGroup } from 'firebase/firestore';
import firebase from '..';
import models from './models';

const db = firebase.db;

/**
 * Create a client command
 * @param {object} data Commande instance
 * @param {function} cb callback function
 */
export const CreateCommandeTaxi = async (data, cb) => {
    try {
        cb(true, null, null);
        const ref = collection(db, 'commandes').withConverter(models.commadeConverter);
        const comRef = await addDoc(ref, data);
        cb(false, null, comRef);
    } catch (error) {
        console.log(error);
        cb(null, error.message, null);
    }
};


export const getItineraireTaxis = async (itineraire, arret, cb) => {
    try {
        cb(true, null, null);
        const q = query(collectionGroup(db, "itineraire", where("depart", "==", itineraire.depart))).withConverter(models.chauffeurConverter); //query(collection(db, "chauffeurs"));
        const driversDocs = (await getDocs(q)).docs;

        console.log(driversDocs);

        const taxis = driversDocs.map(d => {
            return ({
                id: d.id,
                ...d.data()
            });
        });

        cb(false, null, taxis);
    } catch (error) {
        cb(false, error.message, null);
    }
};

export const subscibeDriver = (driverId, cb) => {
    cb(true, null, null);
    const q = query(collection(db, "commandes"), where("chauffeur", "==", driverId)).withConverter(models.commadeConverter);
    const unsubscribe = onSnapshot(q, (qSnapshot) => {
        const commands = [];
        qSnapshot.docChanges().forEach(change => {
            if (change.type === "added") {
                commands.push({ id: change.doc.id, ...change.doc.data() });
            } else if (change.type === "modified") {
                console.log("Modified: ", change.doc.data());
            } else if (change.type === "removed") {
                console.log("Removed: ", change.doc.data());
            }
        });

        cb(false, null, commands);
    }, error => {
        console.log(error);
        cb(false, error.message, null);
    });

    return unsubscribe;
};

export const subscibeClient = (comId, cb) => {
    cb(true, null, null);
    const unsub = onSnapshot(doc(db, "commandes", comId), (snapshot) => {
        const command = snapshot.data();
        cb(false, null, command);
    }, error => {
        console.log(error);
        cb(false, error.message, null);
    });

    return unsub;
};

export const confirmCommand = async (idCom, cb) => {
    try {
        cb(true, null, 0);
        const comRef = doc(db, "commandes", idCom);
        await updateDoc(comRef.withConverter(models.commadeConverter), { etat: "confirmed" });
        cb(false, null, 1);
    } catch (error) {
        cb(false, error.message, null);
    }
};

export const rejectCommad = async (idCom, cb) => {
    try {
        cb(true, null, 0);
        const comRef = doc(db, "commandes", idCom);
        await updateDoc(comRef, { etat: "rejected" });
        cb(false, null, 1);
    } catch (error) {
        cb(false, null, null);
    }
};

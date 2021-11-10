import { collection, addDoc, getDocs, query, where, doc, onSnapshot, updateDoc, collectionGroup, getDoc } from 'firebase/firestore';
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
        if (!itineraire) {
            return cb(false, "Aucun itinéraire spécifié.");
        }

        cb(true, null, null);
        const q = query(
            collectionGroup(
                db, "vehicules"
            ),
            where("depart", "==", itineraire.extremite[0]),
            where("terminus", "==", itineraire.extremite[1])
        ).withConverter(models.vehiculeConverter); //query(collection(db, "chauffeurs"));
        const vDocs = (await getDocs(q)).docs;

        const taxis = vDocs.map(d => {
            console.log(d.data());
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

export const subscibeDriver = (vehiculeId, cb) => {
    cb(true, null, null);
    const q = query(collection(db, "commandes"), where("taxi", "==", vehiculeId)).withConverter(models.commadeConverter);
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

export const subsicribeUserToDriver = (vehiculeId, cb) => {
    cb(true, null, null);
    const q = doc(db, "vehicules", vehiculeId).withConverter(models.vehiculeConverter);
    const unsubscribe = onSnapshot(q, (qSnapshot) => {
        cb(false, null, { id: qSnapshot.id, ...qSnapshot.data() });
    }, error => {
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

export const getCommandData = async (comId, cb) => {
    try {
        cb(true);
        const comRef = doc(db, "commandes", comId).withConverter(models.commadeConverter);
        const com = await getDoc(comRef);
        if (com.data()) {
            const vRef = doc(db, "vehicules", com.data().taxi).withConverter(models.vehiculeConverter);
            const v = await getDoc(vRef);

            cb(false, null, {
                id: com.id,
                ...com.data(),
                vehicule: {
                    id: v.id,
                    ...v.data()
                }
            });

        } else {
            cb(false, "Aucune commande retrouvée.", null);
        }
    } catch (err) {
        cb(false, err.message, null);
    }
};
import { collection, addDoc, query, where, getDocs, getDoc, onSnapshot, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import models from './models';
import firebase from '..';

const db = firebase.db;

export const getAll = (cb) => {
    try {
        cb(true, null, null);
        const q = query(
            collection(db, "itineraires").withConverter(models.itineraireConverter),
            orderBy("createdAt", "desc")
        );
        const unsub = onSnapshot(q, (snapshot) => {
            const its = [];
            snapshot.forEach(c => {
                its.push({ id: c.id, ...c.data() });
            });
            cb(false, null, its);
        }, (err) => {
            cb(false, err.message, null);
        });

        return unsub;
    } catch (error) {
        cb(false, error.message, null);
    }
};

export const createitineraire = async (data, cb) => {
    try {
        cb(true, null, null);
        if (data.id) {
            const { id, ...rest } = data;
            const ref = doc(db, "itineraires", id).withConverter(models.itineraireConverter);

            updateDoc(ref, rest)
                .then(() => {
                    cb(false, null, true);
                })
                .catch(err => {
                    cb(false, err.message, null);
                });

        } else {
            const ref = collection(db, 'itineraires').withConverter(models.itineraireConverter);
            const comRef = await addDoc(ref, data);
            cb(false, null, comRef);
        }
    } catch (error) {
        console.log(error);
        cb(null, error.message, null);
    }
};

export const deleteItineraire = (idItineraire, cb) => {
    try {
        cb(true);
        const ref = doc(db, "itineraires", idItineraire);

        deleteDoc(ref)
            .then(() => {
                cb(false, null, true);
            })
            .catch(err => {
                cb(false, err.message);
            });
    } catch (err) {
        cb(false, err.message);
    }
};


export const searchItineraire = async (text, cb) => {
    try {
        cb(true, null, null);
        const q = query(
            collection(db, "itineraire"),
            where("extremite", "array-contains", text)
        ).withConverter(models.itineraireConverter);
        const itRefs = (await getDocs(q)).docs;

        const its = itRefs.map(d => {
            return {
                id: d.id,
                ...d.data()
            };
        });

        cb(false, null, its);
    } catch (error) {
        cb(false, error.message, null);
    }
};

export const getSingleItineraire = async (id, cb) => {
    try {
        cb(true);
        const itRef = doc(db, "itineraires", id).withConverter(models.itineraireConverter);
        const snap = await getDoc(itRef);
        if (snap.id) {
            cb(false, null, {
                id: snap.id,
                ...snap.data()
            });
        } else {
            cb(false, "Aucun itineraire ne correspond");
        }
    } catch (error) {
        cb(false, error.message);
    }
};

export const createArret = async (data, cb) => {
    try {
        cb(true, null, null);
        if (data.id) {
            const { id, ...rest } = data;

            const ref = doc(db, "arrets", id).withConverter(models.arretConverter);

            updateDoc(ref, rest)
                .then(() => {
                    cb(false, null, true);
                })
                .catch(err => {
                    cb(false, err.message, null);
                });
        } else {
            const ref = collection(db, 'arrets').withConverter(models.arretConverter);
            const arRef = await addDoc(ref, data);
            cb(false, null, arRef);
        }
    } catch (error) {
        console.log(error);
        cb(null, error.message, null);
    }
};

export const getItineraireArret = async (idItineraire, cb) => {
    try {
        cb(true);
        const q = query(
            collection(db, "arrets").withConverter(models.arretConverter),
            where(
                "itineraire", "==", idItineraire
            ),
            orderBy("createdAt", "desc")
        );

        const unSub = onSnapshot(q, (snaps) => {
            const res = [];
            snaps.docs.map(snap => {
                res.push({ id: snap.id, ...snap.data() });
            });
            cb(false, null, res);
        }, (err) => {
            cb(false, err.message);
        });


        return unSub;
    } catch (error) {
        console.log(error);
        cb(false, error.message);
    }
};

export const deleteArret = async (arretId, cb) => {
    try {
        cb(true);
        const ref = doc(db, "arrets", arretId);
        deleteDoc(ref)
            .then(() => {
                cb(false, null, true);
            })
            .catch(err => {
                cb(false, err.message);
            });
    } catch (err) {
        cb(false, err.message);
    }
};

export const searchArret = async (nom, idItineraire, cb) => {

};
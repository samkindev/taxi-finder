import firebase from '../index';
/**
 * The user class
 */
class User {
    constructor(userId, nom, prenom, sexe, ville, createdAt) {
        this.user = userId;
        this.nom = nom;
        this.prenom = prenom;
        this.sexe = sexe;
        this.ville = ville;
        this.createdAt = createdAt;
    }

    toString() {
        return this.prenom + " " + this.nom + " ";
    }
}

/**
 * The class for the driver
 */
class Chauffeur {
    constructor(utilisateurId, taxi, position, itineraire, createdAt) {
        this.utilisateur = utilisateurId;
        this.position = position;
        this.itineraire = {
            depart: itineraire.depart,
            terminus: itineraire.terminus
        };
        this.taxi = {
            type: taxi.type,
            couleur: taxi.couleur,
            marque: taxi.marque,
            plaque: taxi.plaque,
        };
        this.createdAt = createdAt;
    }
}


/**
 * The class for itineraire
 */
class Itineraire {
    constructor(depart, terminus, createdAt) {
        this.nom = `${depart} - ${terminus} / ${terminus} - ${depart}`;
        this.extremite = [
            depart,
            terminus,
        ];
        this.createdAt = createdAt;

    }
}

/**
 * The class the Arret
 */
class Arret {
    constructor(itineraireId, nom, position, createdAt) {
        this.itineraire = itineraireId;
        this.nom = nom;
        this.position = position;
        this.createdAt = createdAt;
    }
}

/**
 * The commade class
 */

class Commande {
    constructor(client, driver, arret, etat, createdAt) {
        this.client = client;
        this.chauffeur = driver;
        this.arret = arret;
        this.etat = etat;
        this.createdAt = createdAt;
    }
}

// Firestore converters

const userConverter = {
    toFirestore: (u) => {
        return {
            user: u.user,
            nom: u.nom,
            prenom: u.prenom,
            sexe: u.sexe,
            ville: u.ville,
            createdAt: firebase.createdAt()
        };
    },
    fromFirestore: (snapShot, options) => {
        const data = snapShot.data(options);
        return new User(data.user, data.nom, data.prenom, data.sexe, data.ville, data.createdAt);
    }
};


const chauffeurConverter = {
    toFirestore: (c) => {
        return {
            utilisateur: c.utilisateur,
            itineraire: c.itineraire,
            taxi: c.taxi,
            position: c.position,
            createdAt: firebase.createdAt()
        };
    },
    fromFirestore: (snapShot, options) => {
        const data = snapShot.data(options);
        return new Chauffeur(data.utilisateur, data.taxi, data.position, data.itineraire, data.createdAt);
    }
};

const itineraireConverter = {
    toFirestore: (v) => {
        return {
            nom: v.nom,
            extremite: v.extremite,
            createdAt: firebase.createdAt()
        };
    },
    fromFirestore: (snapShot, options) => {
        const data = snapShot.data(options);
        return new Itineraire(data.extremite[0], data.extremite[1], data.createdAt);
    }
};

const arretConverter = {
    toFirestore: (v) => {
        return {
            itineraire: v.itineraire,
            nom: v.nom,
            position: v.position,
            createdAt: firebase.createdAt()
        };
    },
    fromFirestore: (snapShot, options) => {
        const data = snapShot.data(options);
        return new Arret(data.itineraire, data.nom, data.position, data.createdAt);
    }
};

const commadeConverter = {
    toFirestore: (v) => {
        return {
            client: v.client,
            chauffeur: v.chauffeur,
            arret: v.arret,
            etat: v.etat,
            createdAt: firebase.createdAt()
        };
    },
    fromFirestore: (snapShot, options) => {
        const data = snapShot.data(options);
        return new Commande(data.client, data.chauffeur, data.arret, data.etat, data.createdAt);
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
const models = {
    User,
    userConverter,
    Chauffeur,
    chauffeurConverter,
    Itineraire,
    itineraireConverter,
    Arret,
    arretConverter,
    Commande,
    commadeConverter
};

export default models;
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
    constructor(utilisateurId, createdAt, vehiculeId, typeTaxi, depart, terminus, permi) {
        this.utilisateur = utilisateurId;
        this.permi = permi;
        this.vehiculeId = vehiculeId;
        this.typeTaxi = typeTaxi;
        this.depart = depart;
        this.terminus = terminus;
        this.createdAt = createdAt;
    }
}

/**
 * The class for the driver vehicle
 */
class Vehicule {
    constructor(chauffeurId, nomChauffeur, type, marque, couleur, plaque, itineraireId, depart, terminus, position) {
        this.chauffeurId = chauffeurId;
        this.nomChauffeur = nomChauffeur;
        this.type = type;
        this.couleur = couleur;
        this.marque = marque;
        this.plaque = plaque;
        this.itineraireId = itineraireId;
        this.depart = depart;
        this.terminus = terminus;
        this.position = position;
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
    constructor(client, taxi, arret, etat, createdAt) {
        this.client = client;
        this.taxi = taxi;
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
            vehiculeId: c.vehiculeId,
            typeTaxi: c.typeTaxi,
            depart: c.depart,
            terminus: c.terminus,
            permi: c.permi,
            createdAt: firebase.createdAt()
        };
    },
    fromFirestore: (snapShot, options) => {
        const data = snapShot.data(options);
        return new Chauffeur(data.utilisateur, data.createdAt, data.vehiculeId, data.typeTaxi, data.depart, data.terminus, data.permi);
    }
};

const vehiculeConverter = {
    toFirestore: (c) => {
        return {
            chauffeurId: c.chauffeurId,
            nomChauffeur: c.nomChauffeur,
            type: c.type,
            couleur: c.couleur,
            marque: c.marque,
            plaque: c.plaque,
            itineraireId: c.itineraireId,
            depart: c.depart,
            terminus: c.terminus,
            position: c.position,
            createdAt: firebase.createdAt()
        };
    },
    fromFirestore: (snapShot, options) => {
        const data = snapShot.data(options);
        return new Vehicule(data.chauffeurId, data.nomChauffeur, data.type, data.marque, data.couleur, data.plaque, data.itineraireId, data.depart, data.terminus, data.position);
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
            taxi: v.taxi,
            arret: v.arret,
            etat: v.etat,
            createdAt: firebase.createdAt()
        };
    },
    fromFirestore: (snapShot, options) => {
        const data = snapShot.data(options);
        return new Commande(data.client, data.taxi, data.arret, data.etat, data.createdAt);
    }
};

// eslint-disable-next-line import/no-anonymous-default-export
const models = {
    User,
    userConverter,
    Chauffeur,
    chauffeurConverter,
    Vehicule,
    vehiculeConverter,
    Itineraire,
    itineraireConverter,
    Arret,
    arretConverter,
    Commande,
    commadeConverter
};

export default models;
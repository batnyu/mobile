import uuid from "uuid";
import {AJOUTER_LIVRE, SUPPRIMER_LIVRE} from "../actions";

const etatInitial = {
    livres: [{nom: 'Livre 1', auteur: 'Auteur 1', id: uuid()}]
}

const livreReducer = (etat = etatInitial, action) => {
    switch (action.type) {
        case AJOUTER_LIVRE:
            const {livre: nouveauLivre} = action

            nouveauLivre.id = uuid()
            return {
                livres: [
                    ...etat.livres, nouveauLivre
                ]
            }

        case SUPPRIMER_LIVRE:
            const {id} = action;
            const filteredLivres = etat.livres.filter(l => l.id !== id);

            return {
                livres: filteredLivres
            }
        default:
            return etat
    }
}

export default livreReducer

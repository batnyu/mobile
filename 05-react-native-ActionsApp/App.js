import React from 'react'
import {StyleSheet, View, ScrollView} from 'react-native'
import Entete from './src/Entete'
import Saisie from './src/Saisie'
import BoutonCreer from './src/BoutonCreer'
import ListeActions from './src/action/ListeActions'
import Menu from './src/menu/Menu'
import uuid from 'uuid';

/**
 * Composant d'entrée de l'application.
 */
export default class App extends React.Component {

    // état global de l'application
    // il y aura probalement d'autres informations à stocker
    state = {
        texteSaisie: '',
        filter: "Toutes",
        actions: [
            {
                id: 1,
                name: "Action 1",
                completed: false
            }, {
                id: 2,
                name: "Action 2",
                completed: true
            }]
    }

    /**
     * Méthode invoquée lorsque que la saisie change.
     *
     * @param nouvelleSaisie la valeur saisie
     */
    quandLaSaisieChange(nouvelleSaisie) {
        console.log('la saisie à changée', nouvelleSaisie)
        this.setState({texteSaisie: nouvelleSaisie})
    }

    /**
     * Méthode invoquée lors du clic sur le bouton `Valider`.
     */
    validerNouvelleAction() {
        if (this.state.texteSaisie) {
            this.setState({
                actions: [...this.state.actions, {
                    id: uuid(),
                    name: this.state.texteSaisie,
                    completed: false
                }]
            })
        }
    }

    modifierState(id, nom) {
        if (nom === "Supprimer") {
            const actions = this.state.actions.filter(action => action.id !== id);
            this.setState({
                actions
            })
        } else if (nom === "Terminer") {
            const actions = this.state.actions.map(action => {
                if (action.id === id) {
                    return {
                        ...action,
                        completed: !action.completed
                    }
                } else {
                    return action;
                }
            })
            this.setState({
                actions
            })
        }
    }

    navigateTo(title) {
        this.setState({filter: title});
    }

    getFilteredActions(filter, actions) {
        switch (filter) {
            case "Toutes":
                return actions;
            case "Actives":
                return actions.filter(action => !action.completed)
            case "Terminées":
                return actions.filter(action => action.completed)
        }
    }

    render() {
        const {texteSaisie, filter, actions} = this.state;
        const filteredActions = this.getFilteredActions(filter, actions);

        return (
            <View style={styles.conteneur}>
                <ScrollView keyboardShouldPersistTaps='always' style={styles.content}>
                    <Entete/>
                    <Saisie texteSaisie={texteSaisie} evtTexteModifie={(titre) => this.quandLaSaisieChange(titre)}/>
                    <ListeActions actions={filteredActions}
                                  onToggle={({id, nom}) => this.modifierState(id, nom)}></ListeActions>
                    <BoutonCreer onValider={() => this.validerNouvelleAction()}/>
                </ScrollView>
                <Menu onNavigateTo={(title) => this.navigateTo(title)}></Menu>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    conteneur: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        paddingTop: 60,
    },
})

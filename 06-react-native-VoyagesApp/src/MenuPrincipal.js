import React from 'react'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

import ListerVoyages from "./ListerVoyages";
import AjouterVoyage from "./AjouterVoyage";
import { couleurs } from './Theme'
import UnVoyage from "./UnVoyage";


const options = {
    navigationOptions: {
        headerStyle: {
            backgroundColor: couleurs.primaire
        },
        headerTintColor: '#fff'
    }
}

const VoyagesNav = createStackNavigator({
    ListerVoyages: { screen: ListerVoyages},
    UnVoyage: { screen: UnVoyage }
}, options)


const MenuPrincipal = createBottomTabNavigator({
    ListerVoyages: { screen: VoyagesNav }, // noter ici que la route 'ListerVoyages' conduit à une nouvelle navigation.
    AjouterVoyage: { screen: AjouterVoyage }
})

export default MenuPrincipal

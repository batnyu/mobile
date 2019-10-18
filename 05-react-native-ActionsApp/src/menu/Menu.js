import React from 'react'
import { View, StyleSheet } from 'react-native'
import OptionMenu from './OptionMenu'

/**
 * Composant Menu.
 */
const Menu = ({onNavigateTo}) => (
    <View style={styles.menu}>
        <OptionMenu title="Toutes" onNavigateTo={onNavigateTo}></OptionMenu>
        <OptionMenu title="Actives" onNavigateTo={onNavigateTo}></OptionMenu>
        <OptionMenu title="Terminées" onNavigateTo={onNavigateTo}></OptionMenu>
    </View>
)

const styles = StyleSheet.create({
    menu: {
        height: 70,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#dddddd'
    }
})
export default Menu

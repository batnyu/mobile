import React from 'react'
import {View, Text} from 'react-native'
import UneAction from './UneAction'


const ListeActions = ({actions, onToggle}) => {

    return (
        <View>
            {actions.map(action => <UneAction key={action.id} action={action} onToggle={onToggle}></UneAction>)}
        </View>
    )
}

export default ListeActions

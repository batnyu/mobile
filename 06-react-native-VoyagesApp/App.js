import React from 'react';

import MenuPrincipal from "./src/MenuPrincipal";


export default class App extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            voyages: []
        };

        this.onAddVoyage = this.onAddVoyage.bind(this);
        this.onAddLieu = this.onAddLieu.bind(this);
    }

    onAddVoyage(voyage) {
        this.setState((prevState, props) => ({voyages: [...prevState.voyages, voyage]}))
    }

    onAddLieu(id, lieu) {
        console.log("onAddLieu", id, lieu);


        this.setState((prevState, props) => {
            return {
                voyages: prevState.voyages.map(v => {
                    if (v.id === id) {
                        return {
                            ...v,
                            lieux: [...v.lieux, lieu]
                        };
                    } else {
                        return v;
                    }
                })
            }
        })
    }

    render() {
        return (
            <MenuPrincipal screenProps={{
                voyages: this.state.voyages,
                onAddVoyage: this.onAddVoyage,
                onAddLieu: this.onAddLieu
            }}/>
        );
    }
}


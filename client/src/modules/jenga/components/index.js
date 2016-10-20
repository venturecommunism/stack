import React, {Component} from 'react';
import {Akkad} from 'akkad';
import JengaScene from '../scenes/JengaScene';
import actions from '../commands';

class App extends Component {
    render() {
        return (
            <div className="app">
                <h1>Akkad Jenga!</h1>
                <Akkad actions={actions}>
                    <JengaScene />
                </Akkad>
            </div>
        )
    }
}

export default App;

import React, {Component} from 'react';
import {Akkad} from "akkad";
import triggerActions from "../commands/triggerActions";
import TriggersScene from "../scenes/TriggersScene";

class Landing extends Component {
    render() {
        return (
            <Akkad actions={triggerActions}>
              <TriggersScene />
            </Akkad>
        );
    }
}

export default Landing;

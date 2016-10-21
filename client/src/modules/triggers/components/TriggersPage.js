import React, {Component, PropTypes} from 'react';
import {Akkad} from "akkad";
import triggerActions from "../commands/triggerActions";
import TriggersScene from "../scenes/TriggersScene";
import Overlay from "./Overlay";

const initState = {};

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

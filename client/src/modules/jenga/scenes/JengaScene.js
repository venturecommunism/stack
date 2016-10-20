import React, {Component} from 'react';
import {Scene, Material, cameras, lights, shapes, systems} from 'akkad';

import JengaGround from './JengaGround';
import JengaBlocks from './JengaBlocks';

const {ArcRotateCamera} = cameras;
const {HemisphericLight} = lights;
const {Box} = shapes;
const {
    Color,
    Position,
    Physics,
    CheckCollisions,
    CollisionsEnabled,
    PhysicsState
} = systems;

class JengaScene extends Component {
    render() {
        return (
            <Scene>
                <CollisionsEnabled />
                <Physics gravity={[0, -10, 0]} />
                <ArcRotateCamera position={[4, 5, -12]} target={[0, 0, 0]} />
                <HemisphericLight />
                <JengaBlocks />
                <JengaGround />
            </Scene>
        );
    }
}

export default JengaScene;

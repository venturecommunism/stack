import React, {Component} from 'react';
import {shapes, Material, systems} from 'akkad';

const {Ground} = shapes;
const {CheckCollisions, Position, Color, PhysicsState} = systems;

class JengaGround extends Component {
    render() {
        return (
            <Ground
                height={300}
                width={300}
            >
                <CheckCollisions />
                <Position vector={[0, -1, 0]} />
                <Material>
                    <Color color={[0, 1, 1]} />
                </Material>
                <PhysicsState mass={0} />
            </Ground>
        );
    }
}

export default JengaGround;

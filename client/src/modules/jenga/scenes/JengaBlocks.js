import React, {Component} from 'react';
import Immutable, {Range} from 'immutable';
import {shapes, Material, systems} from 'akkad';

import JengaBlock from './JengaBlock';

const {Box} = shapes;
const {Color} = systems;

const levels = 3;

const pieces = Range(0, levels * 3)
                    .groupBy(n => n % levels)
                    .map((arr, arrIndex) => {
                        return arr.map((val, i) => {
                            const l = arrIndex + 1;

                            return {
                                position: l % 2
                                              ? [0, l * 0.65, i * 1.1]
                                              : [i - 1, l * 0.65, 1],
                                rotation: l % 2
                                              ? [0, 0, 0]
                                              : [0, 1.55, 0]
                            }
                        })
                    })
                    .toList()
                    .flatten();

class JengaBlocks extends Component {
    render() {
        return (
            <div>
                {pieces.map((v, i) => <JengaBlock key={`jenga-block-${i}`} jengaBlockIndex={i} {...v} />)}
            </div>
        );
    }
}

export default JengaBlocks;

import React, {Component} from 'react'
import {Akkad, Scene, cameras, lights, shapes} from 'akkad'

const {ArcRotateCamera} = cameras
const {HemisphericLight} = lights
const {Box} = shapes

class App extends Component {
    render() {
        return (
            <Akkad>
                <Scene>
                    <ArcRotateCamera
                        position={[3, 4, -5]}
                        target={[0, 1, 0]}
                    />
                    <HemisphericLight />
                    <Box />
                </Scene>
            </Akkad>
        )
    }
}

export default App

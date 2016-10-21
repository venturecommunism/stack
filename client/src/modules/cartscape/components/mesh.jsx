import React, {Component} from 'react';
import {Akkad, Scene, cameras, lights, systems} from "akkad";

//copy https://github.com/BabylonJS/Samples/Scenes/hillvalley into a new directory named hillvalley under meshserver then start the python script
const hillvalleypath = 'http://localhost:8000/hillvalley/'

//const {ArcRotateCamera} = cameras;
const {FreeCamera} = cameras;
const {HemisphericLight} = lights;
const {Mesh, Position, Rotate} = systems;

class MeshPage extends Component {
    render() {
        return (
            <div>
                <Akkad>
                    <Scene>
                        <FreeCamera
                            position={[-24, 2, -24]}
                            target={[10, 0, 100]}
                        />
                        <HemisphericLight />
                        <Mesh
                            path={hillvalleypath}
                            fileName={'HillValley.babylon'}
                        >
                            <Position vector={[0, 0, 0]}/>
                            <Rotate
                                axis={[0, 1.2, 0]}
                                amount={60}
                                space="LOCAL"
                            />
                        </Mesh>
                    </Scene>
                </Akkad>
<div style={{visibility: "hidden", width: "40px", height: "40px"}}>
<iframe width="420" height="345" src="http://www.youtube.com/v/WY2w2-CAKgM&autoplay=1&loop=1&playlist=WY2w2-CAKgM" frameborder="0"></iframe>
</div>
            </div>
        );
    }
}

export default MeshPage;

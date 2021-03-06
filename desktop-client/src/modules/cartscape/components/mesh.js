import React from 'react';
import {Akkad, Scene, shapes, cameras, lights, systems} from 'akkad';

// copy https://github.com/BabylonJS/Samples/Scenes/hillvalley into a new directory named hillvalley under meshserver then start the python script
const hillvalleypath = 'http://localhost:8000/hillvalley/'

//const {ArcRotateCamera} = cameras;
const {FreeCamera} = cameras;
const {HemisphericLight} = lights;
const {Mesh, Position, Trigger} = systems;

const {Sphere} = shapes;

export default ({actions, result}) => (
            <div>
                <Akkad>
                    <Scene>
                        <FreeCamera
                            position={[-24, 2, -24]}
                            target={[10, 0, 100]}
                        />
                        <HemisphericLight source={[0, -1, 0]} diffuse={[1,1,1]} specular={[1,1,1]} />
                        <Mesh
                            path={hillvalleypath}
                            fileName={'HillValley.babylon'}
                        >
{/*                            <Position vector={[0, 0, 0]}/>
                            <Rotate
                                axis={[0, 1.2, 0]}
                                amount={60}
                                space="LOCAL"
                            /> */}
                        </Mesh>
                    <Sphere
                        segments={24}
                        diameter={.15}
                    >
<Trigger onClick={() => actions.togglefullscreen(null, result)} />
                        <Position vector={[-17.92, 1.22, -18.47]} />
                    </Sphere>
                    </Scene>
                </Akkad>
{/* <div style={{visibility: "hidden", width: "40px", height: "40px"}}>
<iframe width="420" height="345" src="http://www.youtube.com/v/WY2w2-CAKgM&autoplay=1&loop=1&playlist=WY2w2-CAKgM" frameborder="0"></iframe>
</div> */}
            </div>
        );


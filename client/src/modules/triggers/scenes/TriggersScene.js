import React from 'react';
import {Akkad, Scene, Material, shapes, cameras, lights, systems} from "akkad";

const {FreeCamera} = cameras;
const {HemisphericLight} = lights;
const {
    Position,
    Rotate,
    Color,
    Gravity,
    Trigger,
    ApplyGravity,
    CheckCollisions,
    CollisionsEnabled
} = systems;

const {
    Box,
    Sphere,
    Cylinder,
    Torus,
    Ground
} = shapes;

export default ({actions}) => (
            <div>
                <div style={{color: '#FFF', fontSize: '2em', position: 'fixed', height: '20px', width: '20px'}}>
                    {/*this.context.appState.get("lastKeyPressed")*/}
                </div>
                <Akkad>
                <Scene>
                    {/*<Trigger onKeyDown={testKeyDown} />*/}
                    <CollisionsEnabled />
                    <Gravity vector={[0, -0.9, 0]} />
                    <FreeCamera
                        position={[0, 0, 10]}
                        target={[0, 0, 0]}
                    >
                        <CheckCollisions />
                        <ApplyGravity />
                    </FreeCamera>
                    <HemisphericLight />
                    <Box>
<Trigger onClick={() => alert("Clicked box")} />
                        <Position vector={[2, 0, 0]} />
                    </Box>
                    <Sphere
                        segments={24}
                        diameter={2}
                    >
<Trigger onClick={() => alert("Clicked sphere")} />
                        <Position vector={[-2, 0, 0]} />
                    </Sphere>
                    <Cylinder>
<Trigger onClick={() => alert("Clicked cylinder")} />
                        <Rotate
                            axis={[1, 1.2, 0]}
                            amount={60}
                            space="LOCAL"
                        />
                    </Cylinder>
                    <Torus
                        diameter={2}
                        thickness={.5}
                        tessellation={30}
                    >
<Trigger onClick={() => alert("Clicked torus")} />
                        <Position vector={[4, 0, 1]} />
                        <Rotate
                            axis={[1, 1.2, 0]}
                            amount={60}
                            space="LOCAL"
                        />
                    </Torus>
                    <Ground
                        height={300}
                        width={300}
                    >
<Trigger onClick={() => alert("Clicked ground")} />
                        <CheckCollisions />
                        <Position vector={[0, -2, 0]} />
                        <Material>
                            <Color color={[0, 1, 1]} />
                        </Material>
                    </Ground>
                </Scene>
                </Akkad>
            </div>
        )

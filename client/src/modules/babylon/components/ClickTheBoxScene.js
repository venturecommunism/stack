import React from 'react'
import {Akkad, Scene, shapes, cameras, lights, systems} from 'akkad'

const {FreeCamera} = cameras
const {GamePadCamera} = cameras
const {HemisphericLight} = lights
const {Trigger, Position} = systems
const {Box, Sphere} = shapes

export default ({result, actions}) => (
  <div>
      <Akkad>
        <Scene>
            <FreeCamera
                position={[3, 4, -5]}
                target={[0, 1, 0]}
            />
            <HemisphericLight />
            <Box>
                <Trigger onClick={() => alert("You Clicked")} />
            </Box>
            <Box>
                <Position vector={[2, 0, 0]} />
            </Box>
            <Sphere
                segments={24}
                diameter={2}
            >
                <Position vector={[-2, 0, 0]} />
            </Sphere>
        </Scene>
      </Akkad>
  </div>
)

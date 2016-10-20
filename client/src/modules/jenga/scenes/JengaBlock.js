import React, {Component, PropTypes} from 'react';
import Immutable, {Range} from 'immutable';
import {shapes, Material, systems} from 'akkad';

const {Box} = shapes;
const {
    Color,
    Position,
    Rotation,
    Trigger,
    PhysicsState,
    SubMesh,
    MultiMaterial
} = systems;

class JengaBlock extends Component {
    static propTypes = {
        position: PropTypes.arrayOf(PropTypes.number),
        rotation: PropTypes.arrayOf(PropTypes.number),
        jengaBlockIndex: PropTypes.number.isRequired
    };

    static defaultProps = {
        rotation: [0, 0, 0]
    };

    static contextTypes = {
        appState: PropTypes.object,
        actions: PropTypes.object
    }

    clickBlock = (evt, meshID, triggerID) => {
        // console.log('clicked a box!!!');
        // console.log(evt, meshID, triggerID);

        this.context.actions.clickOnBlock(evt, meshID, triggerID, this.props.jengaBlockIndex);
    }

    mouseOverBlock = (evt, meshID, triggerID) => {
        // this.context.actions.mouseOverBlock(evt, meshID, triggerID);
        this.context.actions.clickOnBlock(evt, meshID, triggerID, this.props.jengaBlockIndex);
    }

    mouseOutBlock = () => {
        // console.log('mouseOutBlock');
    }

    render() {
        const {position, rotation, jengaBlockIndex} = this.props;
        const {appState} = this.context;
        const selectedBlock = appState.getIn(['selectedBlock', 'blockIndex'], null);
        const subMeshId = appState.getIn(['selectedBlock', 'subMeshId'], null);

        const materials = Range(0, 5).map((i) => {
            const color = jengaBlockIndex === selectedBlock && subMeshId === i
                            ? [0.2, 1.5, 0.7]
                            : [0.9, 0.5, 1.7];
            return (
                <Material key={`block-material-${i}`}>
                    <Color color={color} />
                </Material>
            );
        }).toList();

        return (
            <Box width={3} height={0.6} updatable>
                <Rotation axis={rotation} />
                <Position vector={position} />
                <PhysicsState mass={10} />
                <Trigger
                    onClick={this.clickBlock}
                    onMouseOver={this.mouseOverBlock}
                    onMouseOut={this.mouseOutBlock}
                />
                <MultiMaterial>
                    {materials}
                    {/*<Material>
                        <Color color={[0.2, 1.5, 0.7]} />
                    </Material>
                    <Material>
                        <Color color={[0.2, 0.5, 1.7]} />
                    </Material>
                    <Material>
                        <Color color={[0.9, 0.5, 1.7]} />
                    </Material>
                    <Material>
                        <Color color={[0.2, 1.5, 1.7]} />
                    </Material>
                    <Material>
                        <Color color={[0.2, 0.4, 1.0]} />
                    </Material>
                    <Material>
                        <Color color={[1, 0.2, 1]} />
                    </Material>*/}
                </MultiMaterial>
                <SubMesh
                    materialIndex={0}
                    indexStart={0}
                    indexCount={6}
                />
                <SubMesh
                    materialIndex={1}
                    indexStart={6}
                    indexCount={6}
                />
                <SubMesh
                    materialIndex={2}
                    indexStart={12}
                    indexCount={6}
                />
                <SubMesh
                    materialIndex={3}
                    indexStart={18}
                    indexCount={6}
                />
                <SubMesh
                    materialIndex={4}
                    indexStart={24}
                    indexCount={6}
                />
                <SubMesh
                    materialIndex={5}
                    indexStart={30}
                    indexCount={6}
                />
            </Box>
        );
    }
}

export default JengaBlock;

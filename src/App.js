import React, {Component} from 'react';
import {Loop, Stage, World, Body, KeyListener} from 'react-game-kit'
import Matter from 'matter-js';
import './App.css';

class App extends Component {

    physicsInit = engine => {
        const ground = Matter.Bodies.rectangle(512 * 3, 448, 1024 * 3, 64, {
            isStatic: true,
        });

        const leftWall = Matter.Bodies.rectangle(-64, 288, 64, 576, {
            isStatic: true,
        });

        const rightWall = Matter.Bodies.rectangle(3008, 288, 64, 576, {
            isStatic: true,
        });

        Matter.World.addBody(engine.world, ground);
        Matter.World.addBody(engine.world, leftWall);
        Matter.World.addBody(engine.world, rightWall);
    };

    handleEnterBuilding = index => {
        setTimeout(() => {
            this.props.onLeave(index);
        }, 500);
    };

    constructor(props) {
        super(props);

        this.keyListener = new KeyListener();

        window.AudioContext = window.AudioContext || window.webkitAudioContext;
    }

    componentDidMount() {

        this.keyListener.subscribe([
            this.keyListener.LEFT,
            this.keyListener.RIGHT,
            this.keyListener.UP,
            this.keyListener.SPACE,
            65,
        ]);
    }

    componentWillUnmount() {
        this.keyListener.unsubscribe();
    }

    render() {
        return (
            <Loop>
                <Stage>
                    <World onInit={this.physicsInit}>
                        <Body args={[0, 0, 75, 75]} ref={(b) => this.body = b.body}>
                            hi!
                        </Body>
                    </World>
                </Stage>
            </Loop>
        );
    }
}

export default App;
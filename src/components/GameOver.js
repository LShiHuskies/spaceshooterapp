import React, { Component } from 'react';

class GameOver extends Component {
    render() {
        return (
            <div style={{position: 'absolute', top: '0%'}}>
                <h1 style={{color: "red", textAlign: "center"}}>Game Over</h1>
                <h2 style={{color: "red", textAlign: "center"}}>Your Score: {this.props.gameScore}</h2>
            </div>
        );
    }
}

export default GameOver;

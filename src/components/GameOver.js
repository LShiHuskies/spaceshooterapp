import React, { Component } from 'react';

class GameOver extends Component {

  handleExit = (event) => {
    window.location.reload();
  }

    render() {
        return (
            <div style={{width: '300px', height: '200px', backgroundColor: 'rgba(0, 0, 10, 0.6)'}}>
                <h1 style={{color: "red", textAlign: "center"}}>Game Over</h1>
                <h2 style={{color: "red", textAlign: "center", marginBottom: '40px'}}>Your Score: {this.props.gameScore}</h2>

        <span>
          <button style={{
            width: '100px', height: '34px', borderRadius: '100px', backgroundColor: '#2c9db7', float: 'right', marginRight: '0px',
            fontSize: '11px', fontWeight: 'bold', fontStretch: 'normal', letterSpacing: '0.2px', textAlign: 'center',
            fontStyle: 'normal', color: 'red'
          }}> Play Again? </button>

          <button style={{
            width: '100px', height: '34px', borderRadius: '100px', backgroundColor: '#798898', marginRight: '5px', fontSize: '11px', fontWeight: 'bold', fontStyle: 'normal', fontStretch: 'normal', lineHeight: 'normal',
            letterSpacing: '0.2px', textAlign: 'center', float: 'left', color: 'red'
          }} onClick={this.handleExit}> Exit </button>
        </span>
            </div>
        );
    }
}

export default GameOver;

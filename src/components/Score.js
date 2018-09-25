import React, { Component } from 'react';

class Score extends Component {
    render() {
        return (
            <div>
                <h2 style={{textAlign: 'right', color: "white", marginRight: "60px"}}>Score: {this.props.gameScore} </h2>
            </div>
        );
    }
}

export default Score;

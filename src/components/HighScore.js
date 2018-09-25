import React, { Component } from 'react';

class HighScore extends Component {
    filterScores = () => {
        if (this.props.scoreFilter.length <= 3){
        return this.props.scoreFilter.map(obj => <p>{obj.user} - {obj.score}</p>)
        }
        else {
        this.props.scoreFilter.length = 3
        return this.props.scoreFilter.map(obj => <p>{obj.user} - {obj.score}</p>)
        }
    }
    render() {
        
        
        return (
            <div style={{position: 'absolute', top:`${window.innerHeight/3}px`,left: `${window.innerWidth/4}px`, boxSizing: 'border-box',color:'cyan', padding: '5px', border: 'solid #5B6DCD 10px', width:' 50%'}}><br></br>
                High Scores:
                {this.filterScores()}
            </div>
        );
    }
}

export default HighScore;
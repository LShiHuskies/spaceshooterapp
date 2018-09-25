import React, { Component } from 'react';

class Obstacle extends Component {

    
    render() {
        return (
            <div>
                <img src="https://space-facts.com/wp-content/uploads/mars-transparent.png" 
                    style={{
                        position: 'absolute',
                        width: `${this.props.obstacleSize}%`,
                        top: `${this.props.obstacleCoordinate.top}px`,
                        left: `${this.props.obstacleCoordinate.left}px`
                    }}
                />
            </div>
        );
    }
}

export default Obstacle;
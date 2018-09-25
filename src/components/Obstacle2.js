import React, { Component } from 'react';

class Obstacle2 extends Component {
    render() {
        return (
            <div>
                <img src="https://space-facts.com/wp-content/uploads/mars-transparent.png" 
                    style={{
                        position: 'absolute',
                        width: `${this.props.obstacleSize2}%`,
                        top: `${this.props.obstacleCoordinate2.top}px`,
                        left: `${this.props.obstacleCoordinate2.left}px`
                    }}
                />
            </div>
        );
    }
}

export default Obstacle2;
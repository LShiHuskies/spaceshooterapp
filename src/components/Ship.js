import React, { Component } from 'react';
import keydown from 'react-keydown';
import Projectile from './Projectile'

class Ship extends Component {
    render() {
        return (
            <div>
                <img src={this.props.shipSrc}
                style={{
                    position:"absolute", 
                    left: `${this.props.currentPosition.left}px`, 
                    top: `${this.props.currentPosition.top}px`, 
                    width: "2%", 
                    transform: `rotate(${this.props.currentDirection}deg)`
                    }}
                />
                {this.props.attack == null ? null : <Projectile attackDirection={this.props.attackDirection} attackPosition={this.props.attackPosition}/>}
            </div>
        );
    }
}

export default Ship;
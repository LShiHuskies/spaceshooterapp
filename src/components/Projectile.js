import React, { Component } from 'react';

class Projectile extends Component {
    render() {
        return (
            <div>
                <img src="https://orig00.deviantart.net/c74e/f/2013/060/6/5/kamehameha_style_blue_png_by_lewildgoku-d5wny3l.png" 
                style={{
                    width: "5%", 
                    position: "absolute", 
                    transform: `rotate(${this.props.attackDirection}deg)`,
                    left: `${this.props.attackPosition.left}px`, 
                    top: `${this.props.attackPosition.top}px`}}
                />
            </div>
        );
    }
}

export default Projectile;
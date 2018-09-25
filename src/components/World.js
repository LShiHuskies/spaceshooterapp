import React, { Component } from 'react';
import Ship from './Ship'
import keydown from 'react-keydown'
import Obstacle from './Obstacle'
import Obstacle2 from './Obstacle2'
import Score from './Score'
import explosion from '../assets/explosion.gif'
import Soundtrack from "../assets/Soundtrack.mp3"
import explosionSound from "../assets/explosionSound.mp3"
import shootingSound from "../assets/shootingSound.wav"
import GameOver from './GameOver'

// Acceleration for Ship (Accessed inside handleControls)
var upwardAcceleration = []
var downwardAcceleration = []
var leftwardAcceleration = []
var rightwardAcceleration = []

let gameBackgroundMusic = document.createElement("audio")
gameBackgroundMusic.src = `${Soundtrack}`
gameBackgroundMusic.setAttribute("preload", "auto");
gameBackgroundMusic.setAttribute("controls", "none");
gameBackgroundMusic.style.display = "none";

let explosionSoundEffect = document.createElement("audio")
explosionSoundEffect.src = `${explosionSound}`
explosionSoundEffect.setAttribute("preload", "auto");
explosionSoundEffect.setAttribute("controls", "none");
explosionSoundEffect.style.display = "none";
explosionSoundEffect.volume = .3

let shootingSoundEffect = document.createElement("audio")
shootingSoundEffect.src = `${shootingSound}`
shootingSoundEffect.setAttribute("preload", "auto");
shootingSoundEffect.setAttribute("controls", "none");
shootingSoundEffect.style.display = "none";
shootingSoundEffect.volume = .05

class World extends Component {
    state = {
        shipStatus: null,
        shipSrc: "http://www.pngmart.com/files/3/Spaceship-PNG-Image.png",
        shipSpeed: 5,
        currentDirection: 0,
        currentPosition: {
            test: false,
            left: window.innerWidth/2,
            top: window.innerHeight/2
        },
        attack: null,
        attackTravelSpeed: 7,
        attackDirection: 0,
        attackPosition: {
            left: null,
            top: null,
        },
        obstacleAppearance: true,
        obstacleSize: 20,
        obstacleCounter: 0,
        obstacleCoordinate: {
            top: 100,
            left: 0,
        },
        obstacleAppearance2: true,
        obstacleSize2: 20,
        obstacleCounter2: 0,
        obstacleCoordinate2: {
            top: 100,
            left: 800,
        },
        obstacleSpeed: 1,
        gameOverCounter: 0,
        gameScore: 0,
        gameActive: true
    }

    componentDidMount() {
        window.addEventListener("keydown", this.handleControls)
        
        var obstacleLocation =
            setInterval( () => {
                this.setState({
                obstacleCoordinate: {
                        top: this.state.obstacleCoordinate.top + this.state.obstacleSpeed,
                        left: this.state.obstacleCoordinate.left + this.state.obstacleSpeed,
                    },
                    obstacleCoordinate2: {
                        top: this.state.obstacleCoordinate2.top - this.state.obstacleSpeed,
                        left: this.state.obstacleCoordinate2.left - this.state.obstacleSpeed,
                    }
                })
        }, 100 )
    }

    moveDown = () => {
        downwardAcceleration.push(setInterval(() => {
            if (this.state.currentPosition.top > window.innerHeight)  {
                this.setState({
                    currentPosition: {
                        top: 1,
                        left: this.state.currentPosition.left
                    }
                })
            }
            else{
                this.setState({
                    currentPosition: {
                        top: this.state.currentPosition.top + this.state.shipSpeed,
                        left: this.state.currentPosition.left
                    }
                }, () => {
                    if (
                        ((this.state.currentPosition.top < this.state.obstacleCoordinate.top +220
                        && this.state.currentPosition.top > this.state.obstacleCoordinate.top)
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate.left +20
                        && this.state.currentPosition.left < this.state.obstacleCoordinate.left + 230)
                                                        &&
                        (this.state.obstacleSize === 20 && this.state.obstacleAppearance === true))
                                                        ||
                        (this.state.currentPosition.top < this.state.obstacleCoordinate2.top +220
                        && this.state.currentPosition.top > this.state.obstacleCoordinate2.top)
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate2.left +20
                        && this.state.currentPosition.left < this.state.obstacleCoordinate2.left + 230)
                                                        &&
                        (this.state.obstacleSize2 === 20 && this.state.obstacleAppearance2 === true)
                    )
                        {
                    this.gameOver();
                    return this.props.currentUser
                    }
                    else if (
                        ((this.state.currentPosition.top < this.state.obstacleCoordinate.top +100
                        && this.state.currentPosition.top > this.state.obstacleCoordinate.top)
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate.left
                        && this.state.currentPosition.left < this.state.obstacleCoordinate.left + 125)
                                                        &&
                        (this.state.obstacleSize === 10 && this.state.obstacleAppearance == true))
                                                        ||
                        (this.state.currentPosition.top < this.state.obstacleCoordinate2.top +100
                        && this.state.currentPosition.top > this.state.obstacleCoordinate2.top)
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate2.left
                        && this.state.currentPosition.left < this.state.obstacleCoordinate2.left + 125)
                                                        &&
                        (this.state.obstacleSize2 === 10 && this.state.obstacleAppearance2 == true)
                    )
                        {
                    this.gameOver();
                    return this.props.currentUser
                    }
                
                })
            }
        }, 100)
    ) // end of push
    }

    moveUp = () => {
        upwardAcceleration.push(setInterval(() => {
            if (this.state.currentPosition.top < 0)  {
                this.setState({
                    currentPosition: {
                        top: window.innerHeight,
                        left: this.state.currentPosition.left
                    }
                })
            }
            else {
                this.setState({
                    currentPosition: {
                        top: this.state.currentPosition.top - this.state.shipSpeed,
                        left: this.state.currentPosition.left
                    }
                }, () => {
                    if (
                        ((this.state.currentPosition.top < this.state.obstacleCoordinate.top +220
                        && this.state.currentPosition.top > this.state.obstacleCoordinate.top) 
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate.left
                        && this.state.currentPosition.left < this.state.obstacleCoordinate.left + 230) 
                                                        &&
                        (this.state.obstacleSize === 20 && this.state.obstacleAppearance == true))
                                                        ||
                        ((this.state.currentPosition.top < this.state.obstacleCoordinate2.top +220
                        && this.state.currentPosition.top > this.state.obstacleCoordinate2.top)
                                                        && 
                        (this.state.currentPosition.left > this.state.obstacleCoordinate2.left
                        && this.state.currentPosition.left < this.state.obstacleCoordinate2.left + 230)
                                                        &&
                        (this.state.obstacleSize2 === 20 && this.state.obstacleAppearance2 == true) )
                    ) {
                        this.gameOver();
                        return this.props.currentUser
                    }
                    else if (
                        ((this.state.currentPosition.top < this.state.obstacleCoordinate.top +100
                        && this.state.currentPosition.top > this.state.obstacleCoordinate.top)
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate.left
                        && this.state.currentPosition.left < this.state.obstacleCoordinate.left + 125)
                                                        &&
                        (this.state.obstacleSize === 10 && this.state.obstacleAppearance == true))
                                                        ||
                        ((this.state.currentPosition.top < this.state.obstacleCoordinate2.top +100
                            && this.state.currentPosition.top > this.state.obstacleCoordinate2.top)
                                                            && 
                            (this.state.currentPosition.left > this.state.obstacleCoordinate2.left
                            && this.state.currentPosition.left < this.state.obstacleCoordinate2.left + 125)
                                                            &&
                            (this.state.obstacleSize2 === 10 && this.state.obstacleAppearance2 == true) )
                    ) {
                        this.gameOver();
                        return this.props.currentUser
                    }
            
                })
            }
        }, 100)
      ) // end of push
    }

    moveLeft = () => {
        leftwardAcceleration.push(setInterval(() => {
            if (this.state.currentPosition.left < 1){
                this.setState({
                    currentPosition: {
                        top: this.state.currentPosition.top,
                        left: window.innerWidth
                    }
                })
            }
            else {
                this.setState({
                    currentPosition: {
                        top: this.state.currentPosition.top,
                        left: this.state.currentPosition.left - this.state.shipSpeed
                    }
                }, () => {
                    if (
                        ((this.state.currentPosition.top < this.state.obstacleCoordinate.top +220
                        && this.state.currentPosition.top > this.state.obstacleCoordinate.top)
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate.left +20
                        && this.state.currentPosition.left < this.state.obstacleCoordinate.left + 230)
                                                        &&
                        (this.state.obstacleSize === 20 && this.state.obstacleAppearance === true))
                                                        ||
                        (this.state.currentPosition.top < this.state.obstacleCoordinate2.top +220
                        && this.state.currentPosition.top > this.state.obstacleCoordinate2.top)
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate2.left +20
                        && this.state.currentPosition.left < this.state.obstacleCoordinate2.left + 230)
                                                        &&
                        (this.state.obstacleSize2 === 20 && this.state.obstacleAppearance2 === true)                                                            
                    )
                        {
                    this.gameOver();
                    return this.props.currentUser
                    }
                    else if (
                        ((this.state.currentPosition.top < this.state.obstacleCoordinate.top +100
                        && this.state.currentPosition.top > this.state.obstacleCoordinate.top)
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate.left
                        && this.state.currentPosition.left < this.state.obstacleCoordinate.left + 125)
                                                        &&
                        (this.state.obstacleSize === 10 && this.state.obstacleAppearance == true))
                                                        ||
                        (this.state.currentPosition.top < this.state.obstacleCoordinate2.top +100
                        && this.state.currentPosition.top > this.state.obstacleCoordinate2.top)
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate2.left
                        && this.state.currentPosition.left < this.state.obstacleCoordinate2.left + 125)
                                                        &&
                        (this.state.obstacleSize2 === 10 && this.state.obstacleAppearance2 == true)
                    )
                        {
                    this.gameOver();
                    return this.props.currentUser
                    }
                
                })
            }
        }, 100)
    )// end of push
    }

    moveRight = () => {
        rightwardAcceleration.push(setInterval(() => {
            if (this.state.currentPosition.left > window.innerWidth){
                this.setState({
                    currentPosition: {
                        top: this.state.currentPosition.top,
                        left: 1
                    }
                })
            }
            else {
                this.setState({
                    currentPosition: {
                        top: this.state.currentPosition.top,
                        left: this.state.currentPosition.left + this.state.shipSpeed
                    }
                }, () => {
                    if (
                        ((this.state.currentPosition.top < this.state.obstacleCoordinate.top +220
                        && this.state.currentPosition.top > this.state.obstacleCoordinate.top)
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate.left +20
                        && this.state.currentPosition.left < this.state.obstacleCoordinate.left + 230)
                                                        &&
                        (this.state.obstacleSize === 20 && this.state.obstacleAppearance === true))
                                                        ||
                        (this.state.currentPosition.top < this.state.obstacleCoordinate2.top +220
                        && this.state.currentPosition.top > this.state.obstacleCoordinate2.top)
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate2.left +20
                        && this.state.currentPosition.left < this.state.obstacleCoordinate2.left + 230)
                                                        &&
                        (this.state.obstacleSize2 === 20 && this.state.obstacleAppearance2 === true)
                        )
                    {
                        this.gameOver();
                        return this.props.currentUser
                }
                    else if (
                        ((this.state.currentPosition.top < this.state.obstacleCoordinate.top +100
                        && this.state.currentPosition.top > this.state.obstacleCoordinate.top)
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate.left
                        && this.state.currentPosition.left < this.state.obstacleCoordinate.left + 125)
                                                        &&
                        (this.state.obstacleSize === 10 && this.state.obstacleAppearance == true))
                                                        ||
                        (this.state.currentPosition.top < this.state.obstacleCoordinate2.top +100
                        && this.state.currentPosition.top > this.state.obstacleCoordinate2.top)
                                                        &&
                        (this.state.currentPosition.left > this.state.obstacleCoordinate2.left
                        && this.state.currentPosition.left < this.state.obstacleCoordinate2.left + 125)
                                                        &&
                        (this.state.obstacleSize2 === 10 && this.state.obstacleAppearance2 == true)
                    )
                        {
                    this.gameOver();
                    return this.props.currentUser
                    }
                
                })
            }
        }, 100)
    ) //end of push
    }

    fireUp = () => {
        if (this.state.currentDirection === 0){
            var upwardProjectile = setInterval(() => {
                this.setState({
                    attackPosition: {
                        left: this.state.attackPosition.left,
                        top: this.state.attackPosition.top - this.state.attackTravelSpeed
                    }
                    }, () => {
                        if (this.state.attackPosition.top < 0) {
                            clearInterval(upwardProjectile)
                            this.setState({
                                attack: null,
                                attackDirection: 0,
                                attackPosition: {
                                    left: 0,
                                    top: 0,
                                }
                            })
                        } //end of callback if statement
                        //firing obstacle 1 at size 20
                        else if (
                            ((this.state.attackPosition.top < this.state.obstacleCoordinate.top + 220
                              && this.state.attackPosition.top > this.state.obstacleCoordinate.top - 220)
                            ) && (this.state.attackPosition.left > this.state.obstacleCoordinate.left
                            && this.state.attackPosition.left < this.state.obstacleCoordinate.left + 340) && (this.state.obstacleSize == 20)
                        ) //entire else if (obs-size == 20)
                        {
                            clearInterval(upwardProjectile)
                            this.setState({
                                obstacleSize: this.state.obstacleSize-10,
                                attack: null,
                                attackDirection: 0,
                                attackPosition: {
                                    left: 0,
                                    top: 0,
                                },
                                gameScore: this.state.gameScore + 200,
                            })
                        }
                        //firing obstacle 2 at size 20
                        else if (
                            ((this.state.attackPosition.top < this.state.obstacleCoordinate2.top + 220
                              && this.state.attackPosition.top > this.state.obstacleCoordinate2.top - 220)
                            ) && (this.state.attackPosition.left > this.state.obstacleCoordinate2.left
                            && this.state.attackPosition.left < this.state.obstacleCoordinate2.left + 340)
                             && (this.state.obstacleSize2 == 20)
                        ) //entire else if (obs-size2 == 20)
                        {
                            clearInterval(upwardProjectile)
                            this.setState({
                                obstacleSize2: this.state.obstacleSize2-10,
                                attack: null,
                                attackDirection: 0,
                                attackPosition: {
                                    left: 0,
                                    top: 0,
                                },
                                gameScore: this.state.gameScore + 200,
                            })
                        }
                        // firing obstacle 1 at size 10
                        else if (
                            ((this.state.attackPosition.top < this.state.obstacleCoordinate.top + 110
                            && this.state.attackPosition.top > this.state.obstacleCoordinate.top - 110)
                            ) && (this.state.attackPosition.left > this.state.obstacleCoordinate.left -20
                                && this.state.attackPosition.left < this.state.obstacleCoordinate.left + 100) && (this.state.obstacleSize == 10)
                            ) //entire else if (obs-size == 10)
                        {
                            clearInterval(upwardProjectile)
                            this.setState({
                                obstacleSize: this.state.obstacleSize-10,
                                attack: null,
                                attackDirection: 0,
                                attackPosition: {
                                    left: 0,
                                    top: 0,
                                },
                                gameScore: this.state.gameScore + 100,
                            }, () => {
                                this.reRenderObstacle()
                            })
                       }
                       // firing obstacle 2 at size 10
                       else if (
                        ((this.state.attackPosition.top < this.state.obstacleCoordinate2.top + 110
                        && this.state.attackPosition.top > this.state.obstacleCoordinate2.top - 110)
                        ) && (this.state.attackPosition.left > this.state.obstacleCoordinate2.left -20
                            && this.state.attackPosition.left < this.state.obstacleCoordinate2.left + 100)
                             && (this.state.obstacleSize2 == 10)
                        ) //entire else if (obs-size2 == 10)
                    {
                        clearInterval(upwardProjectile)
                        this.setState({
                            obstacleSize2: this.state.obstacleSize2-10,
                            attack: null,
                            attackDirection: 0,
                            attackPosition: {
                                left: 0,
                                top: 0,
                            },
                            gameScore: this.state.gameScore + 100,
                        }, () => {
                            this.reRenderObstacle2()
                        })
                   }
                    } // end of callback function
                ) // end of sst in setInterval
            }, 10) // end of setInt
        this.setState({
            attack: true,
            attackDirection: 270,
            attackPosition: {
                left: this.state.currentPosition.left - 25,
                top: this.state.currentPosition.top - 65
            }
        })
            upwardProjectile
        } // end of Ship-Up if statement
    }

    fireDown = () => {
        if (this.state.currentDirection === 180){
            var downwardProjectile = setInterval(() => {
                this.setState({
                    attackPosition: {
                        left: this.state.attackPosition.left,
                        top: this.state.attackPosition.top + this.state.attackTravelSpeed
                    }
                }, () => {
                    if (this.state.attackPosition.top > window.innerHeight) {
                        clearInterval(downwardProjectile)
                            this.setState({
                                attack: null,
                                attackDirection: 0,
                                attackPosition: {
                                    left: 0,
                                    top: 0,
                                }
                            })
                    } //end of callback if statement
                    //firing obstacle 1 at size 20
                    else if (
                        (this.state.attackPosition.top < this.state.obstacleCoordinate.top + 10 
                        && this.state.attackPosition.top > this.state.obstacleCoordinate.top -10 )
                        && (this.state.attackPosition.left > this.state.obstacleCoordinate.left
                        && this.state.attackPosition.left < this.state.obstacleCoordinate.left + 205) 
                        && (this.state.obstacleSize == 20)
                    ) //entire else if (obs-size == 20)
                    {
                        clearInterval(downwardProjectile)
                        this.setState({
                            obstacleSize: this.state.obstacleSize-10,
                            attack: null,
                            attackDirection: 0,
                            attackPosition: {
                                left: 0,
                                top: 0,
                            },
                            gameScore: this.state.gameScore + 200,
                        })
                    }
                    //firing obstacle 2 at size 20
                    else if (
                        (this.state.attackPosition.top < this.state.obstacleCoordinate2.top + 10 
                        && this.state.attackPosition.top > this.state.obstacleCoordinate2.top -10 )
                        && (this.state.attackPosition.left > this.state.obstacleCoordinate2.left
                        && this.state.attackPosition.left < this.state.obstacleCoordinate2.left + 205) 
                        && (this.state.obstacleSize2 == 20)
                    ) //entire else if (obs-size2 == 20)
                    {
                        clearInterval(downwardProjectile)
                        this.setState({
                            obstacleSize2: this.state.obstacleSize2-10,
                            attack: null,
                            attackDirection: 0,
                            attackPosition: {
                                left: 0,
                                top: 0,
                            },
                            gameScore: this.state.gameScore + 200,
                        })
                    }
                    // firing obstacle 1 at size 10
                    else if (
                        (this.state.attackPosition.top < this.state.obstacleCoordinate.top + 5 
                            && this.state.attackPosition.top > this.state.obstacleCoordinate.top -5 )
                         && (this.state.attackPosition.left > this.state.obstacleCoordinate.left -20
                            && this.state.attackPosition.left < this.state.obstacleCoordinate.left + 100) && (this.state.obstacleSize == 10)
                        ) //entire else if (obs-size == 10)
                        {
                            clearInterval(downwardProjectile)
                                this.setState({
                                    obstacleSize: this.state.obstacleSize-10,
                                    attack: null,
                                    attackDirection: 0,
                                    attackPosition: {
                                        left: 0,
                                        top: 0,
                                    },
                                    gameScore: this.state.gameScore + 100,
                                }, () => {
                                    this.reRenderObstacle()
                                })
                        }
                        // firing obstacle 2 at size 10
                    else if (
                        (this.state.attackPosition.top < this.state.obstacleCoordinate2.top + 5 
                            && this.state.attackPosition.top > this.state.obstacleCoordinate2.top -5 )
                         && (this.state.attackPosition.left > this.state.obstacleCoordinate2.left -20
                            && this.state.attackPosition.left < this.state.obstacleCoordinate2.left + 100) 
                            && (this.state.obstacleSize2 == 10)
                        ) //entire else if (obs-size2 == 10)
                        {
                            clearInterval(downwardProjectile)
                                this.setState({
                                    obstacleSize2: this.state.obstacleSize2-10,
                                    attack: null,
                                    attackDirection: 0,
                                    attackPosition: {
                                        left: 0,
                                        top: 0,
                                    },
                                    gameScore: this.state.gameScore + 100,
                                }, () => {
                                    this.reRenderObstacle2()
                                })
                        }
                } // end of callback function
            ) // end of sst in setInterval
        }, 10) // end of setInt
            this.setState({
                attack: true,
                attackDirection: 90,
                attackPosition: {
                    left: this.state.currentPosition.left - 25,
                    top: this.state.currentPosition.top + 65
                }
            })
                downwardProjectile
            } // end of Fire Downward if statement
    }

    fireRight = () => {
        if (this.state.currentDirection === 90){
            var rightwardProjectile = setInterval(() => {
                this.setState({
                    attackPosition: {
                        left: this.state.attackPosition.left + this.state.attackTravelSpeed,
                        top: this.state.attackPosition.top
                    }
                }, () => {
                    if (this.state.attackPosition.left > window.innerWidth) {
                        clearInterval(rightwardProjectile)
                            this.setState({
                                attack: null,
                                attackDirection: 0,
                                attackPosition: {
                                    left: 0,
                                    top: 0,
                                }
                            })
                        } //end of callback if statement
                    //firing Obstacle 1 at size 20
                    else if (
                        (this.state.attackPosition.left < this.state.obstacleCoordinate.left + 10 
                        && this.state.attackPosition.left > this.state.obstacleCoordinate.left - 10) 
                        && (this.state.attackPosition.top > this.state.obstacleCoordinate.top
                        && this.state.attackPosition.top < this.state.obstacleCoordinate.top + 215) 
                        && (this.state.obstacleSize == 20)
                        ) //entire else if (obs-size == 20)
                        {
                        clearInterval(rightwardProjectile)
                            this.setState({
                                obstacleSize: this.state.obstacleSize-10,
                                attack: null,
                                attackDirection: 0,
                                attackPosition: {
                                    left: 0,
                                    top: 0,
                                },
                                gameScore: this.state.gameScore + 200,
                            })
                        }
                        //firing Obstacle 2 at size 20
                        else if (
                            (this.state.attackPosition.left < this.state.obstacleCoordinate2.left + 10 
                            && this.state.attackPosition.left > this.state.obstacleCoordinate2.left - 10) 
                            && (this.state.attackPosition.top > this.state.obstacleCoordinate2.top
                            && this.state.attackPosition.top < this.state.obstacleCoordinate2.top + 215) 
                            && (this.state.obstacleSize2 == 20)
                            ) //entire else if (obs-size == 20)
                            {
                            clearInterval(rightwardProjectile)
                                this.setState({
                                    obstacleSize2: this.state.obstacleSize2-10,
                                    attack: null,
                                    attackDirection: 0,
                                    attackPosition: {
                                        left: 0,
                                        top: 0,
                                    },
                                    gameScore: this.state.gameScore + 200,
                                })
                            }
                    //firing Obstacle 1 at size 10
                    else if (
                        (this.state.attackPosition.left < this.state.obstacleCoordinate.left + 5 
                        && this.state.attackPosition.left > this.state.obstacleCoordinate.left - 5)  
                        && (this.state.attackPosition.top > this.state.obstacleCoordinate.top -10
                        && this.state.attackPosition.top < this.state.obstacleCoordinate.top + 100) 
                        && (this.state.obstacleSize == 10)
                        ) //entire else if (obs-size == 10)
                        {
                            clearInterval(rightwardProjectile)
                                this.setState({
                                obstacleSize: this.state.obstacleSize-10,
                                attack: null,
                                attackDirection: 0,
                                attackPosition: {
                                    left: 0,
                                    top: 0,
                                },
                                gameScore: this.state.gameScore + 100,
                            }, () => {
                                this.reRenderObstacle()
                            })
                        }
                    //firing Obstacle 2 at size 10
                    else if (
                        (this.state.attackPosition.left < this.state.obstacleCoordinate2.left + 5 
                        && this.state.attackPosition.left > this.state.obstacleCoordinate2.left - 5)  
                        && (this.state.attackPosition.top > this.state.obstacleCoordinate2.top -10
                        && this.state.attackPosition.top < this.state.obstacleCoordinate2.top + 100) 
                        && (this.state.obstacleSize2 == 10)
                        ) //entire else if (obs-size == 10)
                        {
                            clearInterval(rightwardProjectile)
                                this.setState({
                                obstacleSize2: this.state.obstacleSize2-10,
                                attack: null,
                                attackDirection: 0,
                                attackPosition: {
                                    left: 0,
                                    top: 0,
                                },
                                gameScore: this.state.gameScore + 100,
                            }, () => {
                                this.reRenderObstacle2()
                            })
                        }
                } // end of callback function
            ) // end of sst in setInterval
        }, 10) // end of setInt
                this.setState({
                    attack: true,
                    attackDirection: 360,
                    attackPosition: {
                        left: this.state.currentPosition.left + 30,
                        top: this.state.currentPosition.top + 3
                    }
                })
                    rightwardProjectile
            } // end of Fire Right if statement
    }

    fireLeft = () => {
        if (this.state.currentDirection === 270){
            var leftwardProjectile = setInterval(() => {
                this.setState({
                    attackPosition: {
                        left: this.state.attackPosition.left - this.state.attackTravelSpeed,
                        top: this.state.attackPosition.top
                    }
                }, () => {
                    if (this.state.attackPosition.left < 0) {
                        clearInterval(leftwardProjectile)
                            this.setState({
                                attack: null,
                                attackDirection: 0,
                                attackPosition: {
                                    left: 0,
                                    top: 0,
                                }
                            })
                        } //end of callback if statement
                    // firing obstacle 1 at size 20
                    else if (
                        (this.state.attackPosition.left < this.state.obstacleCoordinate.left + 210
                        && this.state.attackPosition.left > this.state.obstacleCoordinate.left - 210) 
                        && (this.state.attackPosition.top > this.state.obstacleCoordinate.top
                        && this.state.attackPosition.top < this.state.obstacleCoordinate.top + 215) 
                        && (this.state.obstacleSize == 20)
                        ) //entire else if (obs-size == 20)
                        {
                            clearInterval(leftwardProjectile)
                            this.setState({
                                obstacleSize: this.state.obstacleSize-10,
                                attack: null,
                                attackDirection: 0,
                                attackPosition: {
                                    left: 0,
                                    top: 0,
                                },
                                gameScore: this.state.gameScore + 200,
                            })
                        }
                    //firing obstacle 2 at size 20
                    else if (
                        (this.state.attackPosition.left < this.state.obstacleCoordinate2.left + 210
                        && this.state.attackPosition.left > this.state.obstacleCoordinate2.left - 210) 
                        && (this.state.attackPosition.top > this.state.obstacleCoordinate2.top
                        && this.state.attackPosition.top < this.state.obstacleCoordinate2.top + 215) 
                        && (this.state.obstacleSize2 == 20)
                        ) //entire else if (obs-size2 == 20)
                        {
                            clearInterval(leftwardProjectile)
                            this.setState({
                                obstacleSize2: this.state.obstacleSize2-10,
                                attack: null,
                                attackDirection: 0,
                                attackPosition: {
                                    left: 0,
                                    top: 0,
                                },
                                gameScore: this.state.gameScore + 200,
                            })
                        }
                    //firing obstacle 1 at size 10    
                    else if (
                        (this.state.attackPosition.left < this.state.obstacleCoordinate.left + 105
                        && this.state.attackPosition.left > this.state.obstacleCoordinate.left - 105)  
                        && (this.state.attackPosition.top > this.state.obstacleCoordinate.top
                        && this.state.attackPosition.top < this.state.obstacleCoordinate.top + 100) 
                        && (this.state.obstacleSize == 10)
                        ) //entire else if (obs-size == 10)
                        {
                        clearInterval(leftwardProjectile)
                            this.setState({
                            obstacleSize: this.state.obstacleSize-10,
                            attack: null,
                            attackDirection: 0,
                            attackPosition: {
                                left: null,
                                top: null,
                                },
                            gameScore: this.state.gameScore + 100,
                            }, () => {
                                this.reRenderObstacle()
                            })
                        }
                    //firing obstacle 1 at size 10                                   
                    else if (
                        (this.state.attackPosition.left < this.state.obstacleCoordinate2.left + 105
                        && this.state.attackPosition.left > this.state.obstacleCoordinate2.left - 105)  
                        && (this.state.attackPosition.top > this.state.obstacleCoordinate2.top
                        && this.state.attackPosition.top < this.state.obstacleCoordinate2.top + 100) 
                        && (this.state.obstacleSize2 == 10)
                        ) //entire else if (obs-size2 == 10)
                        {
                        clearInterval(leftwardProjectile)
                            this.setState({
                            obstacleSize2: this.state.obstacleSize2-10,
                            attack: null,
                            attackDirection: 0,
                            attackPosition: {
                                left: null,
                                top: null,
                                },
                            gameScore: this.state.gameScore + 100,
                            }, () => {
                                this.reRenderObstacle2()
                            })
                        }
                } // end of callback function
            ) // end of sst in setInterval 
        }, 10) // end of setInt
                this.setState({
                    attack: true,
                    attackDirection: 180,
                    attackPosition: {
                        left: this.state.currentPosition.left - 90,
                        top: this.state.currentPosition.top + 3
                    }
                })
                    leftwardProjectile
            } // end of Fire Left if statement
    }

    obstacleReappend = () => {
        //obstacle 1
        if (this.state.obstacleCoordinate.top >= window.innerHeight){
            this.setState({
                obstacleCoordinate: {
                    top: -100,
                    left: this.state.obstacleCoordinate.left 
                }
            })
        }
        else if (this.state.obstacleCoordinate.top + 200 <= 0){
            this.setState({
                obstacleCoordinate: {
                    top: window.innerHeight,
                    left: this.state.obstacleCoordinate.left 
                }
            })
        }
        else if (this.state.obstacleCoordinate.left >= window.innerWidth){
            this.setState({
                obstacleCoordinate: {
                    top: this.state.obstacleCoordinate.top,
                    left: 0 
                }
            })
        }
        else if (this.state.obstacleCoordinate.left + 200 <= 0 ){
            this.setState({
                obstacleCoordinate: {
                    top: this.state.obstacleCoordinate.top,
                    left: window.innerWidth, 
                }
            })
        }
        //obstacle 2 re-append
        else if (this.state.obstacleCoordinate2.top >= window.innerHeight){
            this.setState({
                obstacleCoordinate2: {
                    top: -100,
                    left: this.state.obstacleCoordinate2.left 
                }
            })
        }
        else if (this.state.obstacleCoordinate2.top + 200 <= 0){
            this.setState({
                obstacleCoordinate2: {
                    top: window.innerHeight,
                    left: this.state.obstacleCoordinate2.left 
                }
            })
        }
        else if (this.state.obstacleCoordinate2.left >= window.innerWidth){
            this.setState({
                obstacleCoordinate2: {
                    top: this.state.obstacleCoordinate2.top,
                    left: 0 
                }
            })
        }
        else if (this.state.obstacleCoordinate2.left + 200 <= 0 ){
            this.setState({
                obstacleCoordinate2: {
                    top: this.state.obstacleCoordinate2.top,
                    left: window.innerWidth, 
                }
            })
        }
    }

    reRenderObstacle = () => {
        let speedConstant = (this.state.obstacleSpeed) + (this.state.gameScore/1000)
        let randomX = Math.random() * window.innerWidth/1.5;
        let randomY = Math.random() * window.innerHeight/2;
        if ((randomX < this.state.currentPosition.left + 250 
            && randomX > this.state.currentPosition.left - 250)
            && (randomY < this.state.currentPosition.top + 250 
            && randomY > this.state.currentPosition.top - 250)
            ){
                randomX = 0
                randomY = 0
            }  

             (setTimeout( () => {
                this.setState({
                    obstacleSpeed: speedConstant,
                    obstacleAppearance: true,
                    obstacleSize: 20,
                    obstacleCoordinate: {
                        top: randomY,
                        left: randomX
                    }
                })
            }, 2000))
    }
    
    reRenderObstacle2 = () => {
        let speedConstant = (this.state.obstacleSpeed) + (this.state.gameScore/1000)
        let randomX = Math.random() * window.innerWidth/1.5;
        let randomY = Math.random() * window.innerHeight/2;
        if ((randomX < this.state.currentPosition.left + 250 
            && randomX > this.state.currentPosition.left - 250)
            && (randomY < this.state.currentPosition.top + 250 
            && randomY > this.state.currentPosition.top - 250)
            ){
                randomX = 500
                randomY = 400
            }      
             (setTimeout( () => {
                this.setState({
                    obstacleSpeed: speedConstant,
                    obstacleAppearance2: true,
                    obstacleSize2: 20,
                    obstacleCoordinate2: {
                        top: randomY,
                        left: randomX
                    }
                })
            }, 2000))  
    }

    decelerate = (direction) => {
        while (direction.length !== 0) {
            var individualInterval = direction.pop();
            clearInterval(individualInterval)
        }
    }

    handleControls = (event) => {
        if([ 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
            event.preventDefault();
        }
        switch (event.keyCode) {
        case 37:
          this.setState({currentDirection: 270})
        break;

        case 39:
          this.setState({currentDirection: 90})
        break;

        case 38:
           this.setState({currentDirection: 0})
        break;

        case 40:
           this.setState({currentDirection: 180})
        break;

        //Move Up: (W)
        case 87:
            document.body.appendChild(gameBackgroundMusic)
            gameBackgroundMusic.play()
            this.obstacleReappend()
            this.decelerate(downwardAcceleration);
            this.moveUp()
           break;

        //Move Left (A)
        case 65:
            this.obstacleReappend()
            this.decelerate(rightwardAcceleration);
            this.moveLeft()
        break;

           //Move Right (D)
        case 68:
            this.obstacleReappend()
            this.decelerate(leftwardAcceleration);
            this.moveRight()
        break;

        //Move Down (S)
        case 83:
            this.obstacleReappend()
            this.decelerate(upwardAcceleration);
            this.moveDown()
        break;

        //Fire Projectiles
        case 16:
        document.body.append(shootingSoundEffect)
        shootingSoundEffect.play()
            if (this.state.attack !== true) {
                // Fire Upward
                this.fireUp()

                // Fire Downward
                this.fireDown()

                // Fire Right
                this.fireRight()

                // Fire Left
                this.fireLeft()
        } else {
            console.log("hitting this")
        }
        break;
        }
    }

      gameOver = () => {
          this.setState ({
              shipStatus: this.state.shipStatus + 1,
              shipSrc: explosion,
              gameOverCounter: this.state.gameOverCounter + 1,
              attack: true,
              attackPosition: {
                left: -100,
                top: -100,
            },
          }, () => {
            if (this.state.gameOverCounter > 0){
                this.setState({
                    gameActive: false
                }, () => {
                  gameBackgroundMusic.remove();
                  explosionSoundEffect.play()
                });
              const body = {
                  score: this.state.gameScore,
                  user_id: this.props.currentUser.id
                  }
              let config =  {
                  method:'POST',
                  headers:{
                      'Content-type':'application/json',
                      'Accept': 'application/json'
                          },
                  body:JSON.stringify(body)
                  }
              if (this.state.shipStatus < 2){
                fetch('https://space-shooter-api.herokuapp.com/games', config).then(r => r.json()).then(console.log)
              } 
            }
          })
          
      }

    render() {
        return (
            <div>
            <Ship shipSrc={this.state.shipSrc} attackDirection={this.state.attackDirection} attackPosition={this.state.attackPosition} currentPosition={this.state.currentPosition} currentDirection={this.state.currentDirection} handleControls={this.handleControls} attack={this.state.attack}/>
            {this.state.obstacleAppearance == true ? <Obstacle obstacleCoordinate={this.state.obstacleCoordinate} obstacleSize={this.state.obstacleSize}/> : null}
            {this.state.obstacleAppearance2 == true ? <Obstacle2 obstacleCoordinate2={this.state.obstacleCoordinate2} obstacleSize2={this.state.obstacleSize2}/> : null}
            <Score gameScore={this.state.gameScore}/>
            {this.state.gameActive == false ? <GameOver gameScore={this.state.gameScore}/> : null}
            </div>
        );
    }
}

export default World;

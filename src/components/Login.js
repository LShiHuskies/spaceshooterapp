import React, { Component, Fragment } from 'react';
import HighScore from "./HighScore";
import '../App.css';

class Login extends Component {
    render() {
        return (
            <div class='login'>
                <h1 style={{color: "red", textAlign: "center"}}>Please Sign In</h1>
                <form onSubmit={this.props.handleSubmit} onChange={this.props.handleChange} style={{textAlign: 'right'}}>

                    <label htmlFor="username" style={{color: 'green'}}> USER NAME: </label>
                    <input type="text" placeholder="Username" name="username" value={this.props.userNameValue}/> <br></br>
                    <label htmlFor="password" name="password" style={{color: 'green'}}>PASSWORD: </label>
                    <input type="password" placeholder="Password" name="password" style={{marginTop: '3%'}}/> <br></br>
                    <br></br>
                    <p id='line' style={{marginTop: '0px'}} >_______________________________________</p>
                    <button id='submit' type="submit">Sign In</button>
                </form>
                <div style={{textAlign: "center"}}>
                {this.props.highScoreToggle == false ? <button onClick={this.props.handleClick}>High Scores</button>
                : <button onClick={this.props.handleClick}>Remove High Scores</button>}
                {this.props.scoreFilter.length > 0 ? <HighScore scoreFilter={this.props.scoreFilter} /> : null}
                </div>
            </div>
        );
    }
}

export default Login;

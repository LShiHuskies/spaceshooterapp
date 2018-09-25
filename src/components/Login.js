import React, { Component, Fragment } from 'react';
import HighScore from "./HighScore"

class Login extends Component {
    render() {
        return (
            <Fragment>
                <h1 style={{color: "red", textAlign: "center"}}>Create Account or Log in</h1>
                <form onSubmit={this.props.handleSubmit} onChange={this.props.handleChange}style={{color: "green", textAlign: "center", fontSize: 20}} >
                    <label htmlFor="username">UserName</label> <br></br>
                    <input type="text" placeholder="Enter Username" name="username" value={this.props.userNameValue}/> <br></br>
                    <label htmlFor="password" name="password" > Password </label><br></br>
                    <input type="password" placeholder="Enter Password" name="password"/> <br></br>
                    <button type="submit">Submit</button>
                </form>
                <div style={{textAlign: "center"}}>
                {this.props.highScoreToggle == false ? <button onClick={this.props.handleClick}>High Scores</button> : <button onClick={this.props.handleClick}>Remove High Scores</button>}
                {this.props.scoreFilter.length > 0 ? <HighScore scoreFilter={this.props.scoreFilter} /> : null}
                </div>
            </Fragment>
        );
    }
}

export default Login;
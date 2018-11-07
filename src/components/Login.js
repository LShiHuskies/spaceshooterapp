import React, { Component, Fragment } from 'react';
import HighScore from "./HighScore";
import '../App.css';

class Login extends Component {

  constructor(props) {
    super(props)

    this.state = {
      signUp: false
    }
  }

  handleSignUp = (event) => {
    event.preventDefault();
    if (this.state.signUp === false) {
      this.setState({
        signUp: true
      })
    } else {
      this.setState({
        signUp: false
      })
    }
  }


    render() {
        return (
          <React.Fragment>
          {this.state.signUp === false ?
            <div class='login'>
                <h1 style={{color: "red", textAlign: "center", marginTop: '20px', marginBottom: '20px'}}>Please Sign In</h1>
                <form onSubmit={this.props.handleSubmit} onChange={this.props.handleChange} style={{textAlign: 'right'}}>

                    <label htmlFor="username" style={{color: 'green'}}> USER NAME: </label>
                    <input type="text" placeholder="Username" name="username" value={this.props.userNameValue}/> <br></br>
                    <label htmlFor="password" name="password" style={{color: 'green'}}>PASSWORD: </label>
                    <input type="password" placeholder="Password" name="password" style={{marginTop: '3%'}}
                      value={this.props.userPassword}/> <br></br>
                    <br></br>
                    <p id='line' style={{marginTop: '0px'}} >_______________________________________</p>
                    <button id='demo' type="button" onClick={this.props.handleDemo}>Demo</button>
                    <button id='submit' type="submit">Sign In</button>
                </form>
                {/*<div style={{textAlign: "center"}}>
                {this.props.highScoreToggle == false ? <button onClick={this.props.handleClick}>High Scores</button>
                : <button onClick={this.props.handleClick}>Remove High Scores</button>}
                {this.props.scoreFilter.length > 0 ? <HighScore scoreFilter={this.props.scoreFilter} /> : null}
                </div>*/}
            </div> :
            <div class='login'>
                <h1 style={{color: "red", textAlign: "center", marginTop: '20px', marginBottom: '20px'}}>Please Create Your Account</h1>
                <form onSubmit={this.props.handleCreateAccount} onChange={this.props.handleChange} id='create' style={{textAlign: 'right'}}>
                    <label htmlFor="username" style={{color: 'green'}}> USER NAME: </label>
                    <input type="text" placeholder="Username" name="username" value={this.props.userNameValue}/> <br></br>
                    <label htmlFor="password" name="password" style={{color: 'green'}}>PASSWORD: </label>
                    <input type="password" placeholder="Password" name="password" style={{marginTop: '3%'}}
                      value={this.props.userPassword}/> <br></br>
                    <br></br>
                    <p id='line' style={{marginTop: '0px'}} >_______________________________________</p>
                    <button id='demo' type="button" onClick={this.handleSignUp}>Back to Login</button>
                    <button id='submit' type="submit">Create Account</button>
                </form>
                {/*<div style={{textAlign: "center"}}>
                {this.props.highScoreToggle == false ? <button onClick={this.props.handleClick}>High Scores</button>
                : <button onClick={this.props.handleClick}>Remove High Scores</button>}
                {this.props.scoreFilter.length > 0 ? <HighScore scoreFilter={this.props.scoreFilter} /> : null}
                </div>*/}
            </div>
          }
          {this.state.signUp === false ?
          <div style={{fontSize: '14px', padding: '7px',
           color: '#ffffff', width: '300px', fontHeight: 'normal', fontStretch: 'normal',
          lineHeight: 'normal', letterSpacing: '-0.2px', textAlign: 'right',
          display: 'inline', position: 'absolute', float: 'left', top: '1.5%', display: 'inline', right: '5%'}}>
          <div style={{display: 'inline', position: 'absolute', top: '100%', left: '0%', right: '40%'}}>Need to Create an Account?</div>
            <button id='SIGNUP' type="submit" onClick={this.handleSignUp} style={{display: 'inline',
                color: 'white',
               border: 'solid, 1px, white', fontWeight: 'bold', float: 'right' }}> Sign Up</button>
           </div> :
           <div style={{fontSize: '14px', padding: '7px',
            color: '#ffffff', width: '300px', fontHeight: 'normal', fontStretch: 'normal',
           lineHeight: 'normal', letterSpacing: '-0.2px', textAlign: 'right',
           display: 'inline', position: 'absolute', float: 'left', top: '1.5%', display: 'inline', right: '5%'}}>
           <div style={{display: 'inline', position: 'absolute', top: '100%', left: '0%', right: '40%'}}>Already have an Account?</div>
             <button id='SIGNUP' type="submit" onClick={this.handleSignUp} style={{display: 'inline',
                 color: 'white',
                border: 'solid, 1px, white', fontWeight: 'bold', float: 'right' }}> Log In</button>
            </div>
          }

          <div>

          {this.props.highScoreToggle === false ? <button id='hiscore' onClick={this.props.handleClick}>High Scores</button>
          : <button id='hiscore' onClick={this.props.handleClick}>Remove High Scores</button>}
          {this.props.scoreFilter.length > 0 ? <HighScore scoreFilter={this.props.scoreFilter} /> : null}
          </div>


          </React.Fragment>
        );
    }
}

export default Login;

import React, { Component } from 'react';
import './App.css';
import World from './components/World';
import Login from './components/Login';
import NotFound from './components/NotFound';

let userArray = [];


class App extends Component {
 state = {
   loggedIn: false,
   userNameValue: "",
   userPassword: "",
   currentUser: "",
   currentGames: [],
   allUsers: [],
   infoArray: [],
   scoreFilter: [],
   highScoreToggle: false,
   notFound: false
 }

  handleChange = (event) => {
    if (event.target.type === "text") {
    this.setState({
      userNameValue: event.target.value,
      userPassword: this.state.userPassword
    })
    }
    else  {
      this.setState({
        userPassword: event.target.value,
        userNameValue: this.state.userNameValue
      })
    }

  }

  componentDidMount() {
    fetch(`http://${window.location.hostname}:3000/users`).then(r => r.json()).then(data => this.setState({
      allUsers: data
    })
    )

  }

  handleCondition = () => {
    setTimeout(() => this.setState({
      notFound: false
    }), 7000)
  }

  filterGames = (data) => {
    if (this.state.currentGames.length === 0){
    this.setState({
      currentGames: data,
      highScoreToggle: true,
    })
    this.state.allUsers.map(user => this.state.currentGames.filter(game => {
      return game.user_id === user.id ?
        this.setState({
          infoArray: [...this.state.infoArray, {user : user.username, score : game.score}]
        })
       : null
    //   if (game.user_id === user.id){
    //     let userInstance = user.username
    //     let gameScore = game.score
    //
    //     this.setState({
    //       infoArray: [...this.state.infoArray, {user : userInstance, score : gameScore}]
    //     })
    // }
    }))
    let scores = this.state.infoArray.sort (function (d, e) {
      return e.score - d.score
    })
    this.setState({
      scoreFilter: scores
    })
  }
    else {
      this.setState({
        scoreFilter: [],
        currentGames: [],
        infoArray: [],
        highScoreToggle: false,
      });
    }
  }

  handleClick = (event) => {
    fetch(`http://${window.location.hostname}:3000/games`).then(r => r.json()).then(data => this.filterGames(data))

  }

  getUsers(data) {
    data.map(user => userArray.push(user))
    let match = userArray.find(user => user.username === this.state.userNameValue)
    if (match !== undefined) {
      this.setState({
        currentUser: match,
        loggedIn: true
      })
    }
    else {
      this.setState({
        notFound: true
      }, () => this.handleCondition())
    }

  }

  handleDemo = (event) => {
    this.setState({
      userNameValue: "DEMO",
      userPassword: 'PASSWORD'
    }, () => {
      this.handleSubmit(event)
    })

  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://${window.location.hostname}:3000/users`).then(r=> r.json()).then(data => this.getUsers(data));
  }

  handleCreateAccount = (event) => {
    event.preventDefault();
    const body = {
        username: this.state.userNameValue,
        password: this.state.userPassword
    };
    let config =  {
    method:'POST',
    headers:{
        'Content-type':'application/json',
        'Accept': 'application/json'
            },
    body:JSON.stringify(body)
    }
    fetch(`http://${window.location.hostname}:3000/users`, config).then(r => r.json()).then(data => this.setState({loggedIn: true, currentUser: data}))
  }


  render() {


    return (
        <div class='App-header' style={{position: 'absolute', backgroundImage: 'url(https://www.macleans.ca/wp-content/uploads/2014/07/stars-carousel.jpg)',
          height: "100%", width: "100%"}}>
          {this.state.loggedIn === false ?
            <React.Fragment>
            <Login highScoreToggle={this.state.highScoreToggle} scoreFilter={this.state.scoreFilter}
          handleClick={this.handleClick} handleDemo={this.handleDemo} handleCreateAccount={this.handleCreateAccount}
          userNameValue={this.state.userNameValue} handleSubmit={this.handleSubmit} handleChange={this.handleChange}
          userPassword={this.state.userPassword}
          />
        {this.state.notFound === true ? <NotFound /> : null}
          </React.Fragment>
        : <World currentUser={this.state.currentUser}/>}
        </div>
    );
  }
}

export default App;

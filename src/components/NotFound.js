import React, { Component } from 'react';
import '../App.css';


class NotFound extends Component {
  render() {
    return (
      <div id='notFound'>
        <p style={{width: '400px'}}>Invalid entry. Please check your username and password or create a new account.</p>
      </div>
    )
  }
}


export default NotFound;

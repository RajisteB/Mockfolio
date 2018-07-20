import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {
  state = {
    mostActive: [],
    gainers: [],
    losers: [],
    apiDataLoaded: false
  }

  render() {
    return (
      <div className="new">
        Redo portfolio...
      </div>
    )
  }
 
}

export default App;

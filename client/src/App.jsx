import React, { Component } from 'react';
import './App.css';
import NavBar from './components/navigation/navbar.jsx';
import SearchBar from './components/query/searchbar.jsx';
import Chart from './components/query/chart.jsx';
import Trade from './components/query/trade.jsx';
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
      <div>
        <NavBar />
        {/* <br /> */}
        <SearchBar />
        <Chart />
        <Trade />
      </div>
    )
  }
 
}

export default App;

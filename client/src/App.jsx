import React, { Component } from 'react';
import './App.css';
import './styles/components/searchbar.css';
import NavBar from './components/navigation/navbar.jsx';
import SearchBar from './components/query/searchbar.jsx';
import Chart from './components/query/chart.jsx';
import Trade from './components/query/trade.jsx';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();
    this.state = {
      symbol: 'AAPL',
      price: '',
      quote: '',
      query: '',
      input: '',
      logo: '',
    }
  }

  getStockData = (symbol) => {
    axios.get(`/search/marketdata/${symbol}`)
    .then(res => {
      let marketData = res.data;
      this.setState({
        price: marketData.price,
        quote: marketData.quote,
        logo: marketData.logo.url,
      })
    })
  }

  handleQuery = async (e) => {
    await e.preventDefault();
    await this.getStockData(this.state.input);
    await this.setState({
      input: '',
    })
    await console.log(this.state.input)
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
    console.log(this.state.input);
  }


  componentDidMount() {
    this.getStockData(this.state.symbol);
    
  }

  render() {
    let { 
      price, 
      quote, 
      input,
      logo, 
    } = this.state;

    return (
      <div>
        <NavBar />
        <div className="search-container">
          <div className="portfolio-value">
            <h4>Portfolio Value</h4>
            <h1>$1,245,678.<span>21</span></h1>
            <p>+3.45 (+1.5%)</p>
          </div>
          <form action="" 
            className="query-form" 
            onSubmit={this.handleQuery}
            onChange={this.handleChange}
          >
            <input 
              className="query-input"
              type="text"
              placeholder="Search by Ticker..."
              value={input.toUpperCase()}
            />
          </form>
        </div>
        <Trade 
          price={price} 
          quote={quote}
          logo={logo}
        />
        <Chart />
      </div>
    )
  }
 
}

export default App;

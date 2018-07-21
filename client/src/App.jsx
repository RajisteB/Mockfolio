import React, { Component } from 'react';
import './App.css';
import './styles/components/searchbar.css';
import NavBar from './components/navigation/navbar.jsx';
import Chart from './components/query/chart.jsx';
import Trade from './components/query/trade.jsx';
import TopList from './components/lists/toplist.jsx';
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
      chartData: '',
      actives: '',
      gainers: '',
      losers: '',
      dataLoaded: false,
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
    .catch(err => console.log(err));
  }

  getChartData = (symbol) => {
    axios.get(`/search/chart/${symbol}`)
    .then(res => {
      let chartData = res.data;
      this.setState({
        chartData,
        dataLoaded: true
      });
    })
    .catch(err => console.log(err));
  }

  getTopStocks = () => {
    axios.get('/search/tops')
    .then(res => {
      this.setState({
        actives: res.data.topActives,
        gainers: res.data.topGainers,
        losers: res.data.topLosers,
      })
    })
    .catch(err => console.log(err));
  }

  handleQuery = (e) => {
    e.preventDefault();
    this.getStockData(this.state.input);
    this.getChartData(this.state.input);
    this.setState({
      input: '',
    })
    console.log(this.state.input)
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
    console.log(this.state.input);
  }


  componentDidMount() {
    this.getChartData(this.state.symbol);
    this.getStockData(this.state.symbol);
    this.getTopStocks();
  }

  render() {
    let { 
      price, 
      quote, 
      input,
      logo, 
      actives,
      gainers,
      losers,
      chartData,
      dataLoaded,
    } = this.state;

    let ticker = <h2 color="#fff" >Enter Ticker</h2>;
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
              placeholder="Enter Ticker..."
              value={input.toUpperCase()}
            />
          </form>
        </div>
        <Trade 
          price={price} 
          quote={quote}
          logo={logo}
        />
        <Chart data={chartData} />
        <TopList 
          actives={actives}  
          gainers={gainers}
          losers={losers}
        />
      </div>
    )
  }
 
}

export default App;

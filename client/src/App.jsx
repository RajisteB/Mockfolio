import React, { Component } from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';
import CssBaseline from '@material-ui/core/CssBaseline';
import { API_ROUTE, API_KEY } from './config_keys';
import axios from 'axios';
import SearchBar from './components/search/searchbar';


class App extends Component {
  state = {
    mostActive: [],
    gainers: [],
    losers: [],
    apiDataLoaded: false
  }

  getGainers = () => {
    return axios.get('https://api.iextrading.com/1.0/stock/market/list/gainers?displayPercent=true');
  }

  getLosers = () => {
    return axios.get('https://api.iextrading.com/1.0/stock/market/list/losers?displayPercent=true');
  }

  getListData = () => {
    axios
      .all([this.getGainers(), this.getLosers()])
      .then(axios.spread((gain, loss) => {
        console.log(gain.data);
        console.log(loss.data);
        this.setState({
          gainers: gain.data,
          losers: loss.data
        })
      }))
      .catch(err => console.log(err));
  }

  handleListClick = (sym) => {
    this.getSingleStock(sym);
    this.getChartData(sym);
  }


  getSectorData = () => {
    let sectorData = [];
    axios
      .get(`${API_ROUTE}${API_KEY}`)
      .then(res => {
        console.log(res);
        let rank = res.data["Rank A: Real-Time Performance"];
        for (let i in rank) {
          sectorData.push({ 
            name: i,
            children: [{
              sector: i, 
              pct: parseFloat(rank[`${i}`].split("").slice(0, rank[`${i}`].length - 1).join(""))
            }]
          })
        }
        this.setState({
          sector: sectorData
        })
        console.log(this.state.sector);
      })
      .catch(err => console.log(err));
  }

  // async componentDidMount() {
  //   await this.getListData();
  //   await this.getSectorData();
  //   await this.getSingleStock('AAPL');
  //   await this.getChartData('AAPL');
  //   await this.setState({
  //       apiDataLoaded: true
  //     });
  // }

  render() {
    let { 
      losers, 
      gainers,
      apiDataLoaded 
    } = this.state;
    let marketList = null;

    marketList = (lists, color) => {
      return (
        <Table size="sm" className="market-list table" style={{ 'width': '20%', 'padding': '2px' }}>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Close</th>
              <th>Change</th>
              <th>%Chg</th>
              <th>RVol</th>
            </tr>
          </thead>
          <tbody>
            {lists.map((list, idx) => (
              <tr 
                key={idx} 
                onClick={() => 
                  this.setState({ search: list.symbol }, 
                  () => this.handleListClick(list.symbol))
                }
                style={{ 'cursor': 'pointer' }}
              >
                <td className="list-item" style={{ 'color': color }}>{list.symbol}</td>
                <td className="list-item">${list.close.toFixed(2)}</td>
                <td className="list-item">$ {list.change.toFixed(2)}</td>
                <td className="list-item">{list.changePercent.toFixed(2)}%</td>
                <td className="list-item">{(list.latestVolume / list.avgTotalVolume).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    };

    
 
    if (true) {
      return (
        <React.Fragment>
          <CssBaseline />
          <div className="App">
          <SearchBar />
            {/* <h1>Mockfolio</h1>
            <br/>
            <h3>Top Gainers</h3>
            {marketList(gainers, 'green')}
            <h3>Top Losers</h3>
            {marketList(losers, 'red')} */}
          </div> 
        </React.Fragment>
      )
    } else {
      return (
        <h1>Loading...</h1>
      )
    }

  }
}

export default App;

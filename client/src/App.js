import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, FormGroup, Form, Button, Label, Input, FormText } from 'reactstrap';
import axios from 'axios';

class App extends Component {
  state = {
    mostActive: [],
    gainers: [],
    losers: [],
    search: '',
    symbolLookup: [],
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

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({ 
      search: e.target.value
    })
    console.log("searchState: " + this.state.search);
  }

  handleSubmit = (symbol, e) => {
    e.preventDefault();
    console.log('running handleSubmit function...');
    axios
      .get(`https://api.iextrading.com/1.0/stock/${symbol}/batch?types=quote,news`)
      .then(res => {
        console.log(res);
        this.setState({
          symbolLookup: res.data.quote.symbol,
          search: ''
        })
        console.log(this.state.symbolLookup);
      })
  }

  async componentDidMount() {
    await this.getListData();
    await this.setState({
        apiDataLoaded: true
      });
  }

  render() {
    let { gainers, losers, apiDataLoaded } = this.state;
    let marketList = null;

    marketList = (lists, color) => {
      return (
        <Table size="sm" className="market-list" style={{ 'width': '50%'}}>
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
              <tr key={idx}>
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
    }

 
    if (apiDataLoaded) {
      return (
        <div className="App">
          <h1>React</h1>
          <br/>
          <h3>Top Gainers</h3>
          {marketList(gainers, 'green')}
          <h3>Top Losers</h3>
          {marketList(losers, 'red')}
          <Form onSubmit={(e) => this.handleSubmit(this.state.search, e)}>
            <FormGroup>
              <Label>Search By Symbol</Label>
              <Input type="text" name="symbol" placeholder="XYZ" onChange={this.handleInputChange} value={this.state.search}/>
            </FormGroup>
            <Button onClick={(e) => this.handleSubmit(this.state.search, e)}>Search</Button>
          </Form>
          {this.state.symbolLookup}
        </div> 
      )
    } else {
      return (
        <h1>Loading...</h1>
      )
    }

  }
}

export default App;

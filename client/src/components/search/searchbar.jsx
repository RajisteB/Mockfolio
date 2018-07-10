import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Table, FormGroup, Form, Label, Input, classNamesShape } from 'reactstrap';
import { LineChart, Line, XAxis, YAxis, Legend, Treemap, Tooltip } from 'recharts';
import { Theme } from '../../themes.jsx';
import axios from 'axios';
import Results from './results.jsx';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600
  },
  button: {
    backgroundColor: Theme.palette.primary.main,
    color: Theme.palette.primary.contrastText,
  }
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      symbolQuote: {},
      symbolNews: [],
      chartData: null,
      error: false,
      input: false,
      apiDataLoaded: false

    }
  }

  getSingleStock = (sym) => {
    axios
      .get(`https://api.iextrading.com/1.0/stock/${sym}/batch?types=quote,news&displayPercent=true`)
      .then(res => {
        console.log(res.status);
        this.setState({
          symbolQuote: res.data.quote,
          symbolNews: res.data.news,
          search: '',
          input: true,
          error: false
        })
        console.log(this.state.symbolQuote);
        console.log(this.state.symbolNews);
      })
      .catch(err => {
        console.log(err);
        this.setState({ 
          input: false, 
          error: true,
          search: ''
        });
      });
  }

  getChartData = (sym) => {
    axios
      .get(`https://api.iextrading.com/1.0/stock/${sym.toLowerCase()}/chart/1y`)
      .then(res => {
        console.log(res.data);
        this.setState({
          chartData: res.data
        })
        console.log(this.state.chartData);
      })
  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({ 
      search: e.target.value,
    })
    console.log("searchState: " + this.state.search);
  }

  handleSubmit = (e) => {
    let sym = null;
    e.preventDefault();
    console.log('running handleSubmit function...');
    sym = this.state.search;
    this.getSingleStock(sym);
    this.getChartData(sym);
  }

  async componentDidMount() {
    await this.getSingleStock('AAPL');
    await this.getChartData('AAPL');
    await this.setState({
        apiDataLoaded: true
      });
  }

  render() {
    let { 
      input, 
      error, 
      symbolNews, 
      symbolQuote, 
      apiDataLoaded 
    } = this.state;
    let { classes } = this.props;
    let results = null;

    // results = () => {
    //   if (input && apiDataLoaded) {
    //     return (
    //       <div>
    //         <h1>{symbolQuote.symbol}</h1>
    //         <h4>{symbolQuote.companyName}</h4>
    //         <h6>{symbolQuote.sector}</h6>
    //         <h3>${symbolQuote.close.toFixed(2)}</h3>  
    //         <p>{symbolQuote.change.toFixed(2)}</p>
    //         <p>{symbolQuote.changePercent.toFixed(2)}%</p>
    //         <h5>52 wk high: ${symbolQuote.week52High.toFixed(2)}</h5>
    //         <h5>52 wk low: ${symbolQuote.week52Low.toFixed(2)}</h5> 
    //         <h5>
    //           Vol: {symbolQuote.latestVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
    //         </h5>
    //       </div>
    //     )
    //   } else if (error) {
    //     return (
    //       <div>
    //         Symbol not found...please try again.
    //       </div>
    //     );
    //   } else {
    //     return null;
    //   }
    // };
    console.log(Theme);

    return (
      <div className="search-bar" style={{ 'fontFamily': 'Roboto', 'fontWeight': '300' }}>
        <Form onSubmit={(e) => this.handleSubmit(e)}>
          <FormGroup>
            <TextField 
              type="search"
              label="Search by Symbol" 
              name="symbol"
              margin="normal"
              className={classes.textfield}
              onChange={this.handleInputChange} 
              value={this.state.search.toUpperCase()} 
            />
          </FormGroup>
          <Button variant="contained" className={classes.button} type="submit">Search</Button>
        </Form>
        <LineChart 
          width={600}
          height={300}
          data={this.state.chartData}
        >
        <XAxis type="category" dataKey="label" />
        <YAxis 
          dataKey="close" 
          domain={['dataMin', 'auto']} 
          allowDecimals={false}
          // interval="preserveEnd"
          />
        <Legend />
        <Line 
          type="monotone"
          dataKey="close"
          stroke="#8884d8"
          dot={false}
        />
        </LineChart>
        <Results 
          symbolQuote={symbolQuote} 
          input={input} 
          dataLoaded={apiDataLoaded} 
          error={error} 
        />
      </div>
    )
  };
}

export default withStyles(styles)(SearchBar);
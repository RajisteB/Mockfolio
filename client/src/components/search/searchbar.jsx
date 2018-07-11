import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Table, FormGroup, Form, Label, Input, classNamesShape } from 'reactstrap';
import { LineChart, Line, XAxis, YAxis, Legend, Treemap, Tooltip } from 'recharts';
import { Theme } from '../../themes.jsx';
import axios from 'axios';
import Results from './results.jsx';
import ResultsCharts from './resultsCharts.jsx';

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
      chartData,
      symbolQuote, 
      apiDataLoaded 
    } = this.state;
    let { classes } = this.props;

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
              autoComplete="off"
              className={classes.textfield}
              onChange={this.handleInputChange} 
              value={this.state.search.toUpperCase()} 
            />
          </FormGroup>
        </Form>
        <Results 
          symbolQuote={symbolQuote} 
          input={input} 
          dataLoaded={apiDataLoaded} 
          error={error} 
        />
        <br />
        <ResultsCharts 
          data={chartData}
        />
      </div>
    )
  };
}

export default withStyles(styles)(SearchBar);
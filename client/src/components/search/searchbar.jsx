import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { Table, FormGroup, Form, Label, Input, classNamesShape } from 'reactstrap';
import { LineChart, Line, XAxis, YAxis, Legend, Treemap, Tooltip } from 'recharts';
import { Theme } from '../../themes.jsx';
import axios from 'axios';
import Results from './results.jsx';
import ResultsCharts from './resultsCharts.jsx';
import Grid from '@material-ui/core/Grid';
import Summary from './summary.jsx';
import NavBar from '../navigation/navbar.jsx';
import Comments from '../comments/comments.jsx';
import Financials from './financials.jsx';
import Stats from './stats.jsx';
import Macro from './macro.jsx';
import ActivateModal from '../trade/activateModal.jsx';

// const BaseURL = 'http://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&origin=*'

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
  },
  search: {
    marginBottom: 10
  }
});

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      symbolQuote: {},
      symbolNews: [],
      financials: null,
      summary: null,
      logo: null,
      chartData: null,
      stats: null,
      error: false,
      input: false,
      apiDataLoaded: false

    }
  }

  getCompanySummmary = (sym) => {
    let desc,
        logo = null;
    axios
    .get(`https://api.iextrading.com/1.0/stock/${sym}/company`)
    .then(res => {
      desc = res.data.description;
      axios.get(`https://api.iextrading.com/1.0/stock/${sym}/logo`)
      .then(res => {
        logo = res.data.url;
        this.setState({ 
          summary: desc,
          logo: logo
        });
      })
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
  }

  getSingleStock = (sym) => {
    axios
      .get(`https://api.iextrading.com/1.0/stock/${sym}/batch?types=quote,news&displayPercent=true`)
      .then(res => {
        this.setState({
          symbolQuote: res.data.quote,
          symbolNews: res.data.news,
          search: '',
          input: true,
          error: false,
          apiDataLoaded: true
        })
        this.getCompanySummmary(this.state.symbolQuote.symbol);
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
        this.setState({
          chartData: res.data,
        });
      })
  }

  getFinancials = (sym) => {
    axios
      .get(`https://api.iextrading.com/1.0/stock/${sym.toLowerCase()}/financials`)
      .then(res => {
        this.setState({
          financials: res.data.financials[0],
        });
      })
      .catch(err => console.log(err));
  }

  getKeyStats = (sym) => {
    axios
      .get(`https://api.iextrading.com/1.0/stock/${sym.toLowerCase()}/stats`)
      .then(res => {
        console.log(res.data);
        this.setState({
          stats: res.data,
        });
      })
  }

  handleInputChange = (e) => {
    e.preventDefault();
    this.setState({ 
      search: e.target.value,
    });
  }

  handleSubmit = (e) => {
    let sym = null;
    e.preventDefault();
    sym = this.state.search;
    this.getSingleStock(sym);
    this.getChartData(sym);
    this.getFinancials(sym);
    this.getKeyStats(sym);
  }

  componentDidMount() {
    this.getSingleStock('AAPL');
    this.getChartData('AAPL');
    this.getFinancials('AAPL');
    this.getKeyStats('AAPL');
  }

  render() {
    let { 
      logo,
      input, 
      error, 
      summary,
      stats,
      chartData,
      financials,
      symbolQuote, 
      apiDataLoaded 
    } = this.state;

    let { classes } = this.props;

    return (
      <div className="search-bar" style={{ 'fontFamily': 'Roboto', 'fontWeight': '300' }}>
        <NavBar />
        <Form onSubmit={(e) => this.handleSubmit(e)} className={classes.search}>
          <FormGroup>
            <Grid container spacing={8} alignItems="flex-end" justify="center">
              <Grid item>
                <i className="material-icons">search</i>
              </Grid>
              <Grid item>
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
              </Grid>
            </Grid>
          </FormGroup>
        </Form>
        <ActivateModal symbol={symbolQuote}/>
        <Results 
          symbolQuote={symbolQuote} 
          input={input} 
          dataLoaded={apiDataLoaded} 
          error={error} 
        />
        <ResultsCharts data={chartData} />
        <Summary desc={summary} logo={logo} />
        <Financials financials={financials} />
        <Macro stats={stats} />
        <Stats stats={stats}/>
        <br/>
        <Comments />
      </div>
    )
  };
}

export default withStyles(styles)(SearchBar);
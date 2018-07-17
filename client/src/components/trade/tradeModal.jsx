import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '../../themes.jsx';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  button: {
    margin: '0 auto',
    color: '#FFF',
    fontSize: 40,
    letterSpacing: '2px',
  },
  modal: {
    margin: '0 auto',
    marginTop: 50,
    width: '90%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    width: '100%',
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  stepContainer: {
    minWidth: '100%'
  },
  completed: {
    margin: '10px 0px 10px 20px',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
  },
  tradeValue: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 20,
    width: 150,
  }
});

class TradeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tradePos: '',
      tradeSize: 0,
      tradeVal: 0,
      buy: false,
      sell: false, 
    };
  }

  handleChange = e => {
    let { symbol } = this.props;
    this.setState({
      [e.target.name]: e.target.value
    });
  } 

  handleSizeChange = e => {
    let { symbol } = this.props;
    let sizeInput = e.target.value;
    this.setState({
      [e.target.name]: e.target.value,
      tradeVal: symbol.latestPrice * sizeInput
    });
  } 


  render() {
    let { classes, symbol, open } = this.props;
    let { tradePos, tradeSize, tradeVal } = this.state;
  
    return (
      <Modal 
        open={open}
        className={classes.modal}
      >
        <Card className={classes.card}>
          <form className={classes.root} autoComplete="off">
            <TextField
              id="read-only-input"
              label="Symbol"
              defaultValue={symbol.symbol}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
              <TextField
              id="read-only-input"
              label="Current Price"
              defaultValue={`$${symbol.latestPrice}`}
              className={classes.textField}
              margin="normal"
              InputProps={{
                readOnly: true,
              }}
            />
            <FormControl className={classes.formControl}>
            <InputLabel html-for="trade-pos">Position</InputLabel>
            <Select 
              value={this.state.tradePos}
              onChange={this.handleChange}
              inputProps={{ name: 'tradePos', id: 'trade-pos' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="BUY"><em>BUY</em></MenuItem>
              <MenuItem value="SOLD">SELL</MenuItem>
              <MenuItem value="SHORT">SELL SHORT</MenuItem>
            </Select>
            <InputLabel html-for="trade-size">Position</InputLabel>
            </FormControl>
            <TextField
              id="shares"
              name="tradeSize"
              label="Share Size"
              value={tradeSize}
              onChange={this.handleSizeChange}
              type="number"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              margin="normal"
            />
            <div className={classes.tradeValue}>
              <Typography color="textSecondary">Cost</Typography>
              <Typography style={{ fontSize: '20px' }} >
                {tradeVal.toLocaleString('en-US', {
                  style: 'currency', 
                  currency: 'USD',
                  minimumFractionDigits: 2,
                })}
            </Typography>
            </div>
          </form>
        </Card>
      </Modal>
    )
  }
}

TradeModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TradeModal);
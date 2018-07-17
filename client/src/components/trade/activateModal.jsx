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
import TradeModal from './tradeModal.jsx';

const styles = {
  button: {
    margin: '0 auto',
    color: '#FFF',
    fontSize: 40,
    letterSpacing: '2px',
  },
  tradeContainer: {
    width: '80%',
    margin: '0 auto',
    heihgt: '50vh',
    padding: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  }
};

class ActivateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    console.log(props);
  }

  handleOpen = () => {
    let { symbol } = this.props;
    this.setState({ 
      open: true,
    });
  }

  handleClose = () => {
    console.log('closing...')
    this.setState({
      open: false,
    });
  }

  render() {
    let { classes, symbol } = this.props;
    let { open } = this.state;

    return (
        <div className={classes.tradeContainer}>
          <Button 
            className={classes.button} 
            variant="contained" 
            style={{ backgroundColor: Theme.palette.primary.dark}}
            onClick={this.handleOpen}
          >
            BUY
          </Button>
          <Button 
            className={classes.button} 
            variant="contained"
            style={{ backgroundColor: Theme.palette.market.closeDown}}
            onClick={this.handleOpen}
          >
            SELL
          </Button>
          <TradeModal 
            open={open}
            symbol={symbol}
          />
        </div>
    )
  }
}

ActivateModal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ActivateModal);
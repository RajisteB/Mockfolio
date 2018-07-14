import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';
import { Theme } from '../../themes.jsx';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';

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
    padding: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    height: 80,
  }
}

class ActivateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleOpen = () => {
    this.setState({ 
      open: true,
    });
  }

  handleClose = () => {
    console.log('closing...')
    this.setState({
      open: false,
    })
  }

  render() {
    let { classes } = this.props;
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
          <Modal 
            open={this.state.open}
            className={classes.modal}
          >
            <Card className={classes.card}>
              <h4 onClick={this.handleClose}>
                X
              </h4>
              <Typography>
                This is where Modal Text goes...
              </Typography>
            </Card>
          </Modal>
        </div>
    )
  }
}

export default withStyles(styles)(ActivateModal);
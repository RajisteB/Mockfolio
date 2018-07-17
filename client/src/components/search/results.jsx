import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Theme } from '../../themes.jsx';

const styles = {
  card : {
    width: '90%',
    margin: '0 auto',
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 2
  },
  price: {
    fontSize: 30,
  },
  grid: {
    padding: 10
  },
}

const Results = (props) => {
  let { symbolQuote, input, dataLoaded, error, classes } = props;
  let colors = null;

  symbolQuote.change < 0 ? 
  colors = Theme.palette.market.closeDown :
  colors = Theme.palette.market.openUp;

  if (input && dataLoaded ) {
    return (
      <Card className={classes.card}>
        <CardContent>
          <Grid 
            container 
            spacing={24}
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.grid}
          >
            <Grid>
              <Typography variant="headline" component="h1">
                {symbolQuote.symbol}
              </Typography >
              <Typography className={classes.title} color="textSecondary">
                {symbolQuote.companyName}
              </Typography>
              <Typography color="textSecondary">
                {symbolQuote.sector}
              </Typography>
              <Typography color="textSecondary">
                {
                  symbolQuote.primaryExchange.split(' ')[0] === 'New' ?
                  'NYSE' : symbolQuote.primaryExchange.split(' ')[0]
                }
              </Typography>
            </Grid>
            <Grid>
              <Typography>
                Vol: {symbolQuote.latestVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </Typography>
              <Typography>Ytd: {symbolQuote.ytdChange.toFixed(2)}%</Typography>
              <Typography>52 wk hi: ${symbolQuote.week52High.toFixed(2)}</Typography>
              <Typography>52 wk lo: ${symbolQuote.week52Low.toFixed(2)}</Typography> 
            </Grid>
            <Grid>
              <Typography style={{ color: `${colors}`}} >Chg: {symbolQuote.change.toFixed(2)}</Typography>
              <Typography style={{ color: `${colors}`}} >Chg%: {symbolQuote.changePercent.toFixed(2)}%</Typography>
              <Typography className={classes.price}>${symbolQuote.latestPrice.toFixed(2)}</Typography>  
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  } else if ( error ) {
    return (
      <div style={{ 'color': '#e74c3c' }}>
        Symbol not found...please try again.
      </div>
    )
  } else {
    return null;
  };
}

Results.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Results);
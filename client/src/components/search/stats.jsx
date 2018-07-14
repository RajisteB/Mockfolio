import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card : {
    width: '90%',
    margin: '0 auto',
    marginBottom: 8,
    padding: 10
  },
  title: {
    fontSize: 14,
  },
  type: {
    fontSize: 11,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  secondary: {
    margin: '3px 0px',
  }
}

const Stats = (props) => {
  let { classes, stats } = props;

  return (
    stats ?
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div>
          <Typography variant="headline">
            Earnings
          </Typography>
          <Typography color="textSecondary" className={classes.secondary}>
            Latest EPS
          </Typography>
          <Typography>
            ${stats.latestEPS}
          </Typography>
          <Typography color="textSecondary" className={classes.secondary}>
            Consensus EPS
          </Typography>
          <Typography>
            ${stats.consensusEPS}
          </Typography>
        </div>
        <div>
          <Typography variant="headline">
            Dividend
          </Typography>
          <Typography color="textSecondary" className={classes.secondary}>
            Rate
          </Typography>
          <Typography>
            ${stats.dividendRate}
          </Typography>
          <Typography color="textSecondary" className={classes.secondary}>
            Yield
          </Typography>
          <Typography>
            ${stats.dividendYield.toFixed(2)}%
          </Typography>
        </div>
      </CardContent>
    </Card>
    : <h5>Loading...</h5>
  );
}

export default withStyles(styles)(Stats);
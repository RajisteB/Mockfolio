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

const Macro = (props) => {
  let { classes, stats } = props;
  
  return (
    stats ?
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div>
          <Typography variant="headline">
            Overall
          </Typography>
          <Typography color="textSecondary" className={classes.secondary}>
            Market Cap
          </Typography>
          <Typography>
            ${stats.marketcap.toLocaleString()}
          </Typography>
          <Typography color="textSecondary" className={classes.secondary}>
            Beta
          </Typography>
          <Typography>
            {stats.beta.toFixed(2)}
          </Typography>
        </div>
        <div>
          <Typography variant="headline">
            Shares
          </Typography>
          <Typography color="textSecondary" className={classes.secondary}>
            Float
          </Typography>
          <Typography>
            {stats.float.toLocaleString()}
          </Typography>
          <Typography color="textSecondary" className={classes.secondary}>
            shortRatio
          </Typography>
          <Typography>
            {stats.shortRatio.toFixed(2)}%
          </Typography>
        </div>
      </CardContent>
    </Card>
    : <h5>Loading...</h5>
  );
}

export default withStyles(styles)(Macro);
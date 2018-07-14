import React from 'react';
import axios from 'axios';
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
  account: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 11
  },
  data: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  type: {
    fontSize: 11,
  }
}

const Financials = (props) => {
  let { classes, financials } = props;

  return (
    financials ? 
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="headline" component="h3">
          Financials
        </Typography>
        <Typography className={classes.title} color="textSecondary">
          Last Reported: {financials.reportDate}
        </Typography>
        <br/>
        <div className={classes.account}>
          <div className={classes.data}>
            <Typography className={classes.type}>
              Gross: ${financials.grossProfit.toLocaleString()}
            </Typography>
            <Typography className={classes.type}>
              Net: ${financials.netIncome.toLocaleString()}
            </Typography>
            <Typography className={classes.type}>
              Cashflow: ${financials.cashFlow.toLocaleString()}
            </Typography>
            <Typography className={classes.type}>
              Assets: ${financials.currentAssets.toLocaleString()}
            </Typography>
            <Typography className={classes.type}>
              Cash: ${financials.currentCash.toLocaleString()}
            </Typography>
            <Typography className={classes.type}>
              Debt: ${financials.currentDebt.toLocaleString()}
            </Typography>
          </div>
          <div className={classes.data}>
            <Typography className={classes.type}>
              Change: ${financials.cashChange.toLocaleString()}
            </Typography>
            <Typography className={classes.type}>
              Equity: ${financials.shareholderEquity.toLocaleString()}
            </Typography>
            <Typography className={classes.type}>
              Income: ${financials.operatingIncome.toLocaleString()}
            </Typography>
            <Typography className={classes.type}>
              Expense: ${financials.operatingExpense.toLocaleString()}
            </Typography>
            <Typography className={classes.type}>
              Revenue: ${financials.operatingRevenue.toLocaleString()}
            </Typography>
            <Typography className={classes.type}>
              Total Debt: ${financials.totalDebt.toLocaleString()}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card> 
    : <h5>Loading</h5>
  )
}

export default withStyles(styles)(Financials);
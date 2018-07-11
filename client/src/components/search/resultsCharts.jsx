import React from 'react';
import { AreaChart, Area, Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ChartVol from './chartVolume.jsx';
import { Theme } from '../../themes.jsx';

const styles = {
  card : {
    width: '90%',
    margin: '0 auto',
    padding: 0
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
    marginTop: 10
  },
  content: {
    width: '100%',
    margin: '0 auto',
    height: '30%'
  }
};

const ResultsCharts = (props) => {
  let { data, classes } = props;

  return (
    <div>
    <Card className={classes.card}>
      <CardContent style={{ padding: '0px'}}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart 
          margin={{ right: 20, top: 30 }}
          data={data}
        >
          <XAxis 
            hide={true}
            type="category" 
            dataKey="label" 
            tick={{ fontSize: 10 }}
            angle={-10}
            height={40}
          />
          <YAxis 
            dataKey="close" 
            domain={['dataMin', 'auto']} 
            allowDecimals={false}
            padding={{ left: 0 }}
            tick={{ fontSize: 12 }}
            width={50}
            height={80}
            // interval="preserveEnd"
            />
          <Area 
            type="monotone"
            dataKey="close"
            fill={Theme.palette.primary.light}
            stroke={Theme.palette.primary.main}
            fillOpacity={.8}
          />
        </AreaChart>
      </ResponsiveContainer>
      <ChartVol data={data} />
      </CardContent>
    </Card>
    </div>
  );
}
export default withStyles(styles)(ResultsCharts);
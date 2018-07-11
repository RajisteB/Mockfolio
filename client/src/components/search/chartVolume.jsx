import React from 'react';
import {Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import { Theme } from '../../themes';

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


const ChartVol = (props) => {
  let { data, classes } = props;

  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart
        margin={{ right: 20, top: 5, left: 50 }}
        data={data}
      >
        <XAxis 
          hide={false}
          type="category"
          dataKey="label"
          tick={{ fontSize: 10 }}
          angle={-10}
          height={40}
        />
        <YAxis 
          hide={true}
          padding={{ left: 0 }}
          tick={{ fontSize: 3 }}
          width={40}
          height={30}
        />
        <Bar 
          dataKey="volume"
          fill={Theme.palette.primary.main}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

ChartVol.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartVol);


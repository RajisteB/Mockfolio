import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Theme } from '../../themes.jsx';

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
  pos: {
    marginTop: 2
  },
  content: {
    flex: '1 0 auto',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 18
  },
}

const Summary = (props) => {
  let { desc, classes, logo } = props;

  return (
    <Card elevation={1} className={classes.card}>
      <Grid 
        container 
        spacing={0}
        alignItems= "flex-start"
        justfiy="center"
      >
        <Grid item xs container justify="center">
          <img src={logo} className={classes.image}/>
        </Grid>
        <Grid item xs={8} >
          <CardContent>
            <Typography component="p">
              {desc}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default withStyles(styles)(Summary);
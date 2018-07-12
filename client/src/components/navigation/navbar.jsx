import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
};

const NavBar = (props) => {
  let { classes } = props;
  
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ToolBar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.flex} color="inherit" variant="title" >
            Mockfolio
          </Typography>
          <Button color="inherit">Portfolio</Button>
        </ToolBar>
      </AppBar>
    </div>
  )  
}

NavBar.PropTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CommentList from './commentList.jsx';
import { Theme } from '../../themes.jsx';

const styles ={
  container: {
    width: '75%',
    margin: '0 auto',
  },
  formContainer: {
    display: 'flex',
    margin: '0 auto',
    width: '80%',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  textField: {
    width: '100%',
    margin: '0 auto',
    border: '1px solid lightgrey'
  },
  button: {
    marginRight: 50,
    marginTop: 15,
    letterSpacing: '1px',
    backgroundColor: Theme.palette.primary.dark,
    color: "#FFF"
  },
};

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      input: '',
      nameInput: '',
    }
  }

  handleCommentInput = (e) => {
    let text = e.target.value;
    this.setState({ 
      input: text
    });
  }

  handleName = (e) => {
    let named = e.target.value;
    this.setState({ 
      nameInput: named
    });
  }

  handleCommentSubmit = () => {
    let { input, comments, nameInput } = this.state;
    let time,
        localTime,
        currentDay = null;

    time = new Date;
    localTime = time.toLocaleTimeString();
    currentDay = time.toUTCString().split(' ').slice(0, -2).join(' ');

    this.setState({ 
      comments: [ {date: `${currentDay} ${localTime}`, name: nameInput, post: input}, ...comments ],
      input: '',
      nameInput: '',
    });
  }

  

  render() {
    let { classes } = this.props;
    let { comments, input, nameInput } = this.state;
    
    return (
      <div className={classes.container}>
        <form className={classes.formContainer}>
          <TextField 
            required
            margin="normal"
            className={classes.textField}
            onChange={(e) => this.handleName(e)}
            value={nameInput}
            placeholder="Name* (Required)"
            style= {{ width: "60%", marginLeft: 0, paddingLeft: 4 }}
          />
          <br/>
          <TextField 
            margin="normal"
            multiline={true}
            rows="5"
            className={classes.textField}
            onChange={(e) => this.handleCommentInput(e)}
            value={input}
          />
          <Button 
            className={classes.button}
            onClick={() => this.handleCommentSubmit()}
          >Submit</Button>
        </form>
        <CommentList comments={comments} />
      </div>
    )
  }
}

Comments.propTyepes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Comments);

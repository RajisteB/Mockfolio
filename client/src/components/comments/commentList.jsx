import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { Theme } from '../../themes.jsx';

const styles = {
  comments: {
    width: '80%',
    margin: '0 auto',
    padding: 10,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  placeholder: {
    textAlign: 'center'
  },
  timePosted: {
    fontSize: '11px',
    fontStyle: 'italic'
  },
  linepost: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    fontSize: '14px',
  },
  icons: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    cursor: 'pointer',
  },
  iconsContainer: {
    width: '80%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: Theme.palette.primary.accentColor,
  }
}


class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: 0,
      downvotes: 0,
    }
  }

  handleVotes = (direction) => {
    let { upvotes, downvotes, name } = this.state;
    direction === 'up' ? 
    this.setState({ upvotes: upvotes + 1}) :
    direction === 'down' ? 
    this.setState({ downvotes: downvotes - 1}) :
    null;
  }

  render() {
    let { classes, comments } = this.props;
    let {upvotes, downvotes } = this.state;

    return (
      this.props && comments.length > 0 ?
      comments.map((comm, idx) => {
        return (
          <div className={classes.comments} key={idx}>
            <Avatar className={classes.avatar}>
              {comm.name.split('')[0].toUpperCase()}
            </Avatar>
            <br />
            <div>{comm.post}</div>
            <div className={classes.linepost}>
              <p className={classes.timePosted}>posted: {comm.date}</p>
              <div className={classes.iconsContainer}>
                <div className={classes.icons}>                  
                  <i 
                    className="material-icons" 
                    style={{ color: 'green' }}
                    onClick={() => this.handleVotes('up')}
                  >
                    arrow_drop_up 1
                  </i>
                  { upvotes > 0 ? `+ ${upvotes}` : upvotes }
                </div>
                <div className={classes.icons}>                  
                  <i 
                    className="material-icons" 
                    style={{ color: 'red' }}
                    onClick={() => this.handleVotes('down')}          
                  >
                    arrow_drop_down 0
                  </i>
                  {downvotes}
              </div>
              </div>
            </div>
          </div>
        )
      }) :
      <h5 className={classes.placeholder}>Be the first to leave a comment.</h5>
    )
  };
}

CommentList.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CommentList);
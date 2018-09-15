import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MoreIcon from './Icons/MoreIcon';

const styles = {
  wrapper: {
    position: 'absolute',
    top: '12px',
    right: '10px',
  },
  button: {
    width: '40px',
    height: '40px',
  },
  menuItem: {
    color: '#3366b4',
    width: '90px',
    '&:hover': {
      backgroundColor: 'rgba(51, 51, 51, 0.03)',
    },
  },
};

class EditCartMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { iconColor, classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.wrapper}>
        <IconButton
          className={classes.button}
          aria-owns={open ? 'fade-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreIcon color={iconColor} />
        </IconButton>
        <Popover
          id="fade-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Fade}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={this.handleClose} className={classes.menuItem}>
            Edit
          </MenuItem>
          <MenuItem onClick={this.handleClose} className={classes.menuItem}>
            Delete
          </MenuItem>
        </Popover>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
  withRouter
)(EditCartMenu);

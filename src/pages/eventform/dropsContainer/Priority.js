import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import IncreaseIcon from 'assets/images/SvgJs/IncreaseIcon.js';
import RedArrowUp from 'assets/images/SvgJs/RedArrowUp.js';
import YellowArrowUp from 'assets/images/SvgJs/YellowArrowUp.js';
import GreenArrowUp from 'assets/images/SvgJs/GreenArrowUp.js';
import BlueArrowDown from 'assets/images/SvgJs/BlueArrowDown.js';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

const options = [
  {
    tag: 'Important',
    icon: <RedArrowUp />,
  },
  {
    tag: 'High',
    icon: <YellowArrowUp />,
  },
  {
    tag: 'Normal',
    icon: <GreenArrowUp />,
  },
  {
    tag: 'Low',
    icon: <BlueArrowDown />,
  },
];

class Priority extends Component {
  button = null;

  state = {
    anchorEl: null,
    selectedIndex: 1,
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, selectedIndex } = this.state;

    return (
      <div className={classes.root}>
        <div onClick={this.handleClickListItem} className="list-item">
          <div>
            <IncreaseIcon />
            <span className="list-item-main-text">Priority</span>
          </div>
          <div className="list-item-secondary-item">
            {options[selectedIndex].icon}
            <span className="list-item-secondary-text">{options[selectedIndex].tag}</span>
          </div>
        </div>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={`${option}${index}`}
              selected={index === selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              {` ${option.tag}`}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(Priority);

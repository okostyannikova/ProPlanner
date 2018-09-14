import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import IncreaseIcon from 'assets/images/increase-icon.svg';
import PriorityArrow from 'components/Icons/PriorityArrow.js';

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
    icon: <PriorityArrow fill="#F68181" />,
  },
  {
    tag: 'High',
    icon: <PriorityArrow fill="#f8da7c" />,
  },
  {
    tag: 'Normal',
    icon: <PriorityArrow fill="#64C37D" />,
  },
  {
    tag: 'Low',
    icon: <PriorityArrow fill="#00BCD4" direction="180" />,
  },
];

class Priority extends Component {
  button = null;

  state = {
    anchorEl: null,
    selectedIndex: 1,
  };

  handleClickListItem = (event, view) => {
    if (view) {
      return;
    }
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, view } = this.props;
    const { anchorEl, selectedIndex } = this.state;

    const viewMode = view ? 'list-item-view' : 'list-item';

    return (
      <div className={classes.root}>
        <div onClick={event => this.handleClickListItem(event, view)} className={viewMode}>
          <div>
            <img src={IncreaseIcon} alt="IncreaseIcon" />
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

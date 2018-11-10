import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PriorityArrow from 'components/Icons/PriorityArrow.js';
import { priorityOptions } from 'config';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

const options = [
  {
    tag: 'High',
    icon: <PriorityArrow fill={priorityOptions.high.color} />,
  },
  {
    tag: 'Normal',
    icon: <PriorityArrow fill={priorityOptions.normal.color} />,
  },
  {
    tag: 'Low',
    icon: (
      <PriorityArrow fill={priorityOptions.low.color} direction={priorityOptions.low.direction} />
    ),
  },
];

class Priority extends Component {
  button = null;

  state = {
    anchorEl: null,
    selectedIndex: this.props.priority,                                    //eslint-disable-line
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = index => {
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
        <div onClick={event => this.handleClickListItem(event)} onChange={this.handle}>   {/*  eslint-disable-line */}
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
              onClick={() => this.handleMenuItemClick(index, option.tag)}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              {` ${option.tag}`}                                                        {/*  eslint-disable-line */}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

Priority.propTypes = {
  classes: PropTypes.object.isRequired,
  priority: PropTypes.number.isRequired,
};

export default withStyles(styles)(Priority);

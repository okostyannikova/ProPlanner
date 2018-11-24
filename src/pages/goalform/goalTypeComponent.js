import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import TypeSquare from 'components/Icons/TypeSquare.js';
import { typesOptions } from 'config';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

const options = [
  {
    tag: 'Work',
    icon: <TypeSquare fill={typesOptions.work} />,
  },
  {
    tag: 'Personal',
    icon: <TypeSquare fill={typesOptions.personal} />,
  },
  {
    tag: 'Entertainment',
    icon: <TypeSquare fill={typesOptions.entertainment} />,
  },
  {
    tag: 'Other',
    icon: <TypeSquare fill={typesOptions.other} />,
  },
];

class Type extends Component {
  button = null;

  state = {
    anchorEl: null,
    selectedIndex: this.props.type,
  };

  componentWillReceiveProps(newProps) {
    const index = options.findIndex(
      option => option.tag.toLowerCase() === newProps.input.value.toLowerCase()
    );
    index !== -1 ? this.setState({ selectedIndex: index }) : this.setState({ selectedIndex: 1 });
  }

  handleClickListItem = (event, view) => {
    if (view) {
      return;
    }
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index, input, tag) => {
    input.onChange(tag);
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, view, input } = this.props;
    const { anchorEl, selectedIndex } = this.state;

    const viewMode = view ? 'list-item-view' : 'list-item';

    return (
      <div className={classes.root}>
        <p className="type-component">Type</p>
        <div
          onClick={event => this.handleClickListItem(event, view)}
          className={viewMode}
          onChange={this.handle}
        >
          <div className="list-item-secondary-item">
            {options[selectedIndex].icon}
            <span className="list-item-secondary-text">{options[selectedIndex].tag}</span>
          </div>
        </div>
        <Menu
          id="type-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map((option, index) => (
            <MenuItem
              key={`${option}${index}`}
              selected={index === selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index, input, option.tag)}
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

export default withStyles(styles)(Type);

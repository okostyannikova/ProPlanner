import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  state = {
    anchorEl: null,
    selectedIndex: this.props.type,                                  /*  eslint-disable-line */
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = index => {
    const { handleTypeChange } = this.props;
    handleTypeChange(index);
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
        <div onClick={event => this.handleClickListItem(event)} onChange={this.handle}>     {/*  eslint-disable-line */}
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
              onClick={() => this.handleMenuItemClick(index, option.tag)}
            >
              <ListItemIcon>{option.icon}</ListItemIcon>
              {` ${option.tag}`}                                                           {/*  eslint-disable-line */}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

Type.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.number.isRequired,
  handleTypeChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(Type);

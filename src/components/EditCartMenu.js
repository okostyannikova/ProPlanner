import React, { Component } from 'react';
import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MoreIcon from './Icons/MoreIcon';

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

  handleEdit = () => {};

  render() {
    const { color } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <EditCartWrapper>
        <StyledButton
          aria-owns={open ? 'fade-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreIcon color={color} />
        </StyledButton>
        <Menu
          id="fade-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={this.handleClose}>Edit</MenuItem>
          <MenuItem onClick={this.handleClose}>Delete</MenuItem>
        </Menu>
      </EditCartWrapper>
    );
  }
}

export default EditCartMenu;

const StyledButton = styled(IconButton)`
  width: 40px !important;
  height: 40px !important;
`;

const EditCartWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 10px;
`;

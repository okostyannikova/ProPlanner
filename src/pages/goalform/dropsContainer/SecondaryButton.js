import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const mainPopupButtonStyle = {
  borderRadius: '2px',
  width: '43%',
  maxWidth: '130px',
  height: '36px',
  marginRight: '18px',
  background: '#00BCD4',
  color: '#FFFFFF',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
};

const secondaryPopupButtonStyle = {
  borderRadius: '2px',
  width: '43%',
  maxWidth: '130px',
  height: '36px',
  background: 'linear-gradient(0deg, rgba(52, 70, 98, 0.15), rgba(52, 70, 98, 0.15)), #FFFFFF',
  color: 'rgba(52, 70, 98, 0.5)',
  boxShadow: '0px 2px 2px rgba(52, 70, 98, 0.24), 0px 0px 2px rgba(52, 70, 98, 0.12)',
};

export default class SecondaryButton extends Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { view, reset, history, link, id, deleteHandle } = this.props;

    const secondaryButtonStyle = view
      ? {
          borderRadius: '2px',
          width: '43%',
          maxWidth: '130px',
          height: '36px',
          background:
            'linear-gradient(0deg, rgba(246, 129, 129, 0.1), rgba(246, 129, 129, 0.1)), #FFFFFF',
          color: '#F68181',
          boxShadow: '0px 2px 2px rgba(246, 129, 129, 0.24), 0px 0px 2px rgba(246, 129, 129, 0.12)',
        }
      : {
          borderRadius: '2px',
          width: '43%',
          maxWidth: '130px',
          height: '36px',
          background:
            'linear-gradient(0deg, rgba(52, 70, 98, 0.15), rgba(52, 70, 98, 0.15)), #FFFFFF',
          color: 'rgba(52, 70, 98, 0.5)',
          boxShadow: '0px 2px 2px rgba(52, 70, 98, 0.24), 0px 0px 2px rgba(52, 70, 98, 0.12)',
        };

    const secondaryButtonText = view ? 'DELETE' : 'CANCEL';

    const goalDeleteHandler = () => {
      this.setState({ open: false });
      deleteHandle(id);
      !view && reset();
      history.push(link);
    };

    const clickHandle = () => {
      if (view) {
        this.setState({ open: true });
        return;
      }

      !view && reset();
      history.push(link);
    };

    return (
      <React.Fragment>
        <Button
          variant="contained"
          color="secondary"
          style={secondaryButtonStyle}
          className="drops-list-button"
          onClick={() => clickHandle()}
        >
          {secondaryButtonText}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Do you really want to delete goal?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Goal will be deleted with all it related events and tasks
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button style={secondaryPopupButtonStyle} onClick={this.handleClose}>
              CANCEL
            </Button>
            <Button onClick={goalDeleteHandler} style={mainPopupButtonStyle}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

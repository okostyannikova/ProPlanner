import React, { Component } from 'react';
import CloseIcon from 'components/Icons/CloseIcon.js';
import ImageIcon from 'components/Icons/ImageIcon.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const mainButtonStyle = {
  borderRadius: '2px',
  width: '43%',
  maxWidth: '130px',
  height: '36px',
  marginRight: '18px',
  background: '#00BCD4',
  color: '#FFFFFF',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
};

const mainButtonStyleDisabled = {
  borderRadius: '2px',
  width: '43%',
  maxWidth: '130px',
  height: '36px',
  marginRight: '18px',
  background: '#8ec4cc',
  color: '#FFFFFF',
  boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
};

const secondaryButtonStyle = {
  borderRadius: '2px',
  width: '43%',
  maxWidth: '130px',
  height: '36px',
  background: 'linear-gradient(0deg, rgba(52, 70, 98, 0.15), rgba(52, 70, 98, 0.15)), #FFFFFF',
  color: 'rgba(52, 70, 98, 0.5)',
  boxShadow: '0px 2px 2px rgba(52, 70, 98, 0.24), 0px 0px 2px rgba(52, 70, 98, 0.12)',
};

export default class ImageDropzone extends Component {
  state = {
    fileURL: '',
    imagePreviewUrl: '',
    active: false,
    open: false,
  };

  componentWillReceiveProps = newProps => {
    if (newProps.input.value) {
      this.setState({ imagePreviewUrl: newProps.input.value });
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, fileURL: '' });
  };

  handleSubmit = () => {
    const { fileURL } = this.state;
    this.setState({ open: false, fileURL: '', imagePreviewUrl: fileURL, active: false });
    this.props.input.onChange(fileURL);
  };

  handleImageURLChange = e => {
    const regularExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+(?:png|jpg|jpeg)+$/;
    const isValidURL = e.target.value.match(regularExp);

    isValidURL
      ? this.setState({ fileURL: e.target.value, active: true })
      : this.setState({ fileURL: e.target.value, active: false });
  };

  closeImage = () => {
    this.setState({ imagePreviewUrl: '' });
    this.props.input.onChange('');
  };

  render() {
    const { open, fileURL, active, imagePreviewUrl } = this.state;
    const { view } = this.props;
    const imagePreview = imagePreviewUrl ? (
      <img src={imagePreviewUrl} alt="probably best pic ever" className="dropzone-image" />
    ) : null;

    return (
      <div>
        {view ? (
          <div className="dropzone-view">{imagePreview || null}</div>
        ) : (
          <React.Fragment>
            <div className="dropzone" onClick={this.handleClickOpen}>
              {imagePreview || (
                <React.Fragment>
                  <ImageIcon />
                  <p className="dropzone_text">add image</p>
                </React.Fragment>
              )}
            </div>
            <button
              className={`dropzone_close ${imagePreview ? '' : 'dropzone_close_hide'}`}
              onClick={this.closeImage}
            >
              <CloseIcon />
            </button>
          </React.Fragment>
        )}

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">Enter the URL of picture</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              URL of picture must be in PNG or JPEG format
            </DialogContentText>
            <Input
              autoFocus
              margin="dense"
              id="name"
              type="url"
              fullWidth
              value={fileURL}
              onChange={this.handleImageURLChange}
              disableUnderline
              style={{
                marginTop: '15px',
                borderBottom: '1px solid black',
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button style={secondaryButtonStyle} onClick={this.handleClose}>
              DISCARD
            </Button>
            <Button
              onClick={this.handleSubmit}
              style={active ? mainButtonStyle : mainButtonStyleDisabled}
              disabled={!active}
            >
              ACCEPT
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

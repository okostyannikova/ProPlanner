import React, { Component } from 'react';
import CloseIcon from 'components/Icons/CloseIcon.js';
import ImageIcon from 'components/Icons/ImageIcon.js';
import Dropzone from 'react-dropzone';

export default class ImageDropzone extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };

    this.onDrop = this.onDrop.bind(this);
    this.closeImage = this.closeImage.bind(this);
  }

  onDrop(acceptedFiles) {
    this.setState({
      files: acceptedFiles,
    });
  }

  closeImage() {
    this.setState({ files: '' });
  }

  render() {
    const getImage = !!this.state.files[0];
    const image = getImage ? this.state.files[0].preview : '';

    return (
      <div className="dropzone">
        <Dropzone
          onDrop={this.onDrop}
          className={`dropzone-plugin ${getImage ? 'dropzone-plugin-index' : ''}`}
          multiple={false}
          accept="image/jpeg, image/png"
        >
          <div className={getImage ? 'dropzone_image_center' : 'dropzone_center'}>
            {getImage ? (
              <img src={image} alt="event" className="dropzone-picture" />
            ) : (
              <div>
                <ImageIcon />
                <p className="dropzone_text">add image</p>
              </div>
            )}
          </div>
        </Dropzone>
        <span
          className={`dropzone_close ${getImage ? '' : 'dropzone_close_hide'}`}
          onClick={this.closeImage}
        >
          <CloseIcon />
        </span>
      </div>
    );
  }
}

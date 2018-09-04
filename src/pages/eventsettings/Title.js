import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

class Title extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <p className="title-component">Title</p>
        <div className="text-field">
          <FormControl fullWidth>
            <Input
              disableUnderline
              placeholder="Add a title..."
              id="custom-css-input"
              className="input-field"
            />
          </FormControl>
        </div>
      </div>
    );
  }
}

export default Title;

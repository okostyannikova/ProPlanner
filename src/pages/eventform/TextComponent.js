import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

class TextComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { headerClass, headerContent, placeholder, multiline } = this.props;

    return (
      <div>
        <p className={headerClass || ''}>{headerContent || ''}</p>
        <div className="text-field">
          <FormControl fullWidth>
            <Input
              multiline={multiline || false}
              rows="2"
              disableUnderline
              placeholder={placeholder || ''}
              className="input-field"
            />
          </FormControl>
        </div>
      </div>
    );
  }
}

export default TextComponent;

import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

class TextComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { headerClass = '', headerContent = '', placeholder = '', ...restProps } = this.props;

    return (
      <div>
        <p className={headerClass}>{headerContent}</p>
        <div className="text-field">
          <FormControl fullWidth>
            <Input
              rows="2"
              disableUnderline
              placeholder={placeholder}
              className="input-field"
              {...restProps}
            />
          </FormControl>
        </div>
      </div>
    );
  }
}

export default TextComponent;

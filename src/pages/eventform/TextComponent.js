import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

class TextComponent extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const {
      headerClass = '',
      headerContent = '',
      placeholder = '',
      view = false,
      ...restProps
    } = this.props;

    const viewMode = view ? 'text-field-view' : 'text-field';

    return (
      <div>
        <p className={headerClass}>{headerContent}</p>
        <div className={viewMode}>
          <FormControl fullWidth>
            <Input
              rows="2"
              disableUnderline
              disabled={view}
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

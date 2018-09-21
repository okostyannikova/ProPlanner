import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

class TextComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };
  }

  componentDidMount() {
    this.setState({ text: this.props.value });
  }

  render() {
    const {
      value = '',
      headerClass = '',
      headerContent = '',
      placeholder = '',
      input,
      ...restProps
    } = this.props;

    return (
      <div>
        <p className={headerClass}>{headerContent}</p>
        <div className="text-field">
          <FormControl fullWidth>
            <Input
              value={value}
              rows="2"
              disableUnderline
              placeholder={placeholder}
              className="input-field"
              {...input}
              {...restProps}
            />
          </FormControl>
        </div>
      </div>
    );
  }
}

export default TextComponent;

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
    // if (this.props.label) {
    this.setState({ text: this.props.value });
    // }
  }

  render() {
    const {
      value = '',
      headerClass = '',
      headerContent = '',
      placeholder = '',
      view = false,
      input,
      ...restProps
    } = this.props;

    const viewMode = view ? 'text-field-view' : 'text-field';
    // console.log(this.props.value);
    // console.log('state', this.state);
    return (
      <div>
        <p className={headerClass}>{headerContent}</p>
        <div className={viewMode}>
          <FormControl fullWidth>
            <Input
              value={value}
              rows="2"
              disableUnderline
              disabled={view}
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

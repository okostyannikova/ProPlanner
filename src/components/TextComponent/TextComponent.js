import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

import './styles.css';

const getValidityClassName = meta => {
  if (!meta) {
    return;
  }

  // if (meta.active) {
  //   return;
  // }

  if (meta.dirty && meta.invalid) {
    return 'text-field--error';
  }

  // if (meta.touched && meta.valid) {
  //   return 'valid';
  // }
};

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
      view = false,
      meta,
      input,
      ...restProps
    } = this.props;

    const viewMode = view ? 'text-field-view' : 'text-field';
    const additionalClass = getValidityClassName(meta);

    return (
      <div>
        <p className={headerClass}>{headerContent}</p>
        <div className={`${viewMode} ${additionalClass}`}>
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
        {meta ? meta.error && meta.dirty && <div className="error-text">{meta.error}</div> : null}
      </div>
    );
  }
}

export default TextComponent;

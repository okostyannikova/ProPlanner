import React, { Component } from 'react';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

import './styles.css';

const getValidityClassName = (meta, isaddpath, dirty) => {
  if (!meta) {
    return;
  }

  if (isaddpath && dirty && meta.error) {
    return 'text-field--error';
  }

  if (meta.dirty && meta.invalid) {
    return 'text-field--error';
  }
};

class TextComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      dirty: false,
    };
  }

  componentDidMount() {
    this.setState({ text: this.props.value });
  }

  isDirty = () => {
    const { dirty } = this.state;

    if (dirty) {
      return;
    }
    this.setState({ dirty: true });
  };

  render() {
    const {
      value = '',
      headerClass = '',
      headerContent = '',
      placeholder = '',
      view = false,
      meta,
      input,
      isaddpath,
      ...restProps
    } = this.props;

    const { dirty } = this.state;

    const viewMode = view ? 'text-field-view' : 'text-field';
    const additionalClass = getValidityClassName(meta, isaddpath, dirty);
    const addPath = meta
      ? meta.error && dirty && <div className="error-text">{meta.error}</div>
      : null;

    const noAddPath = meta
      ? meta.error && meta.dirty && <div className="error-text">{meta.error}</div>
      : null;

    return (
      <div>
        <p className={headerClass}>{headerContent}</p>
        <div className={`${viewMode} ${additionalClass}`}>
          <FormControl fullWidth onChange={this.isDirty}>
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

        {isaddpath ? addPath : noAddPath}
      </div>
    );
  }
}

export default TextComponent;

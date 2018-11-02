import React, { Component } from 'react';

class SmartItem extends Component {
  state = {
    value: '',
    defaultValue: '',
  };

  componentWillReceiveProps = newProps => {
    this.setState({ value: newProps.input.value, defaultValue: newProps.input.value });
  };

  changeHandle = e => {
    this.setState({ value: e.target.value });
  };

  acceptHandle = () => {
    const { input, clickHandler, index } = this.props;
    input.onChange(this.state.value);
    clickHandler(index);
  };

  resetHandle = () => {
    const { clickHandler, index } = this.props;
    const { defaultValue } = this.state;

    this.setState({ value: defaultValue });
    clickHandler(index);
  };

  render() {
    const { isOpen, clickHandler, icon, text, input, view, index } = this.props;
    const { value } = this.state;

    return (
      <li className="list__block">
        <div
          className={`list__header ${isOpen ? 'list__header--active' : ''} ${
            view ? 'list__header--view' : ''
          }`}
          onClick={() => clickHandler(index)}
        >
          <span className="list__header-icon">{icon}</span>
          <span className="list__header-text">{text}</span>
        </div>

        {view ? (
          <div className={isOpen ? 'displayed' : 'hidden-block'}>
            <div className="list__view">
              <div className="list__description list__description--view ">
                <p>{input.value}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className={isOpen ? 'displayed' : 'hidden-block'}>
            <div className="list__edit">
              <div className="list__description">
                <p>What do I want to accomplish?</p>
                <p>Which resources or limits are involved?</p>
              </div>
              <textarea
                className="list__text-area"
                rows="2"
                placeholder="Specify your requirement"
                value={value}
                onChange={this.changeHandle}
              />
              <div className="list__buttons">
                <div className="list__button list__button--cancel" onClick={this.resetHandle}>
                  CANCEL
                </div>
                <div className="list__button list__button--accept" onClick={this.acceptHandle}>
                  ACCEPT
                </div>
              </div>
            </div>
          </div>
        )}
      </li>
    );
  }
}

export default SmartItem;

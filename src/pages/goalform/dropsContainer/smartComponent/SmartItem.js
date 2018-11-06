import React, { Component } from 'react';

class SmartItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };
  }

  componentWillReceiveProps = newProps => {
    this.setState({ value: newProps.input.value });
  };

  changeHandle = e => {
    const { input } = this.props;

    input.onChange(e.target.value);
    this.setState({ value: e.target.value });
  };

  nextCriteriaHandle = e => {
    const { clickHandler, index } = this.props;
    if (e.shiftKey && e.keyCode === 9) {
      if (index - 1 !== -1) {
        e.preventDefault();
        clickHandler(index - 1);
      }
      return;
    }

    if (index + 1 !== 5 && e.keyCode === 9) {
      clickHandler(index + 1);
      e.preventDefault();
    }
  };

  render() {
    const { isOpen, clickHandler, icon, text, input, view, index, tabToched } = this.props;
    const { value } = this.state;

    const headerTitle = value.length > 20 ? `${value.slice(0, 20)}...` : value;
    const touched = !tabToched && index === 0;

    return (
      <li className="list__block" onKeyDown={this.nextCriteriaHandle} tabIndex="-1">
        <div
          className={`list__header ${isOpen ? 'list__header--active' : ''} ${
            view ? 'list__header--view' : ''
          }`}
          onClick={() => clickHandler(index)}
        >
          <span className="list__header-icon">{icon}</span>
          <span className="list__header-text">{view && !isOpen ? headerTitle : text}</span>
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
                ref={input => {
                  if (input != null && !touched) {
                    input.focus();
                  }
                }}
              />
            </div>
          </div>
        )}
      </li>
    );
  }
}

export default SmartItem;

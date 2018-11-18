import React, { Component } from 'react';

import { required, maxDescriptionLength } from 'utils/validate';

import { Field } from 'redux-form';
import SpecificIcon from 'components/Icons/smartIcons/SpecificIcon';
import MeasurableIcon from 'components/Icons/smartIcons/MeasurableIcon.js';
import AchievableIcon from 'components/Icons/smartIcons/AchievableIcon.js';
import RelevantIcon from 'components/Icons/smartIcons/RelevantIcon.js';
import TimeFramedIcon from 'components/Icons/smartIcons/TimeFramedIcon.js';
import SmartItem from './smartComponent/SmartItem.js';

const items = [
  { icon: <SpecificIcon />, text: 'Specific', field: 'specific' },
  { icon: <MeasurableIcon />, text: 'Measurable', field: 'measurable' },
  { icon: <AchievableIcon />, text: 'Achievable', field: 'achievable' },
  { icon: <RelevantIcon />, text: 'Relevant', field: 'relevant' },
  { icon: <TimeFramedIcon />, text: 'Time - framed', field: 'timeFramed' },
];

class SmartComponent extends Component {
  state = {
    openIndex: 0,
    tabToched: false,
    errors: [false, false, false, false, false],
  };

  errorHandler = (index, error, view) => {
    if (view) {
      this.setState({ errors: [false, false, false, false, false] });
      return;
    }
    const { errors } = this.state;
    const tempArray = [...errors];
    tempArray[index] = !!error;
    this.setState({ errors: tempArray });
  };

  clickHandler = index => {
    if (index === this.state.openIndex) {
      this.setState({ openIndex: 5, tabToched: true });
      return;
    }

    this.setState({ openIndex: index, tabToched: true });
  };

  render() {
    const { openIndex, tabToched, errors } = this.state;
    const { view } = this.props;
    const isError = errors.filter(error => !!error);

    return (
      <div>
        <ul className="smart-list">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Field
                name={item.field}
                component={SmartItem}
                text={item.text}
                icon={item.icon}
                key={index}
                index={index}
                isOpen={isOpen}
                clickHandler={this.clickHandler}
                view={view}
                tabToched={tabToched}
                validate={[required, maxDescriptionLength]}
                errorHandler={this.errorHandler}
                error={errors[index]}
              />
            );
          })}
        </ul>
        {isError.length && !view ? (
          <p className="error-text">All SMART-criteria fields must be filled</p>
        ) : null}
      </div>
    );
  }
}

export default SmartComponent;

import React, { Component } from 'react';

import { required, maxDescriptionLength } from 'utils/validate';

import { Field } from 'redux-form';
import SpecificIcon from 'components/Icons/smartIcons/SpecificIcon';
import MeasurableIcon from 'components/Icons/smartIcons/MeasurableIcon.js';
import AchievableIcon from 'components/Icons/smartIcons/AchievableIcon.js';
import RelevantIcon from 'components/Icons/smartIcons/RelevantIcon.js';
import TimeFramedIcon from 'components/Icons/smartIcons/TimeFramedIcon.js';
import SmartItem from './smartComponent/SmartItem.js';

const description = [
  <React.Fragment>
    <p>What exactly do you want to achieve?</p>
    <p>The more specific your description, the bigger the chance you'll get exactly that.</p>
  </React.Fragment>,
  <React.Fragment>
    <p>
      Measurable goals means that you identify exactly what it is you will see, hear and feel when
      you reach your goal.
    </p>
  </React.Fragment>,
  <React.Fragment>
    <p>Is your goal attainable? </p>
    <p>That means investigating whether the goal really is acceptable to you.</p>
  </React.Fragment>,
  <React.Fragment>
    <p>Is reaching your goal relevant to you?</p>
    <p>Why do you want to reach this goal?</p>{' '}
    <p>What is the objective behind the goal, and will this goal really achieve that?</p>
  </React.Fragment>,
  <React.Fragment>
    <p>Make a tentative plan of everything you do.</p>
    <p>Keep the timeline realistic and flexible, that way you can keep morale high.</p>
  </React.Fragment>,
];

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
                description={description[index]}
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

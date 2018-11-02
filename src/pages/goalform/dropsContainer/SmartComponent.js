import React, { Component } from 'react';

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
  };

  clickHandle = index => {
    if (index === this.state.openIndex) {
      this.setState({ openIndex: 5 });
      return;
    }

    this.setState({ openIndex: index });
  };

  render() {
    const { openIndex } = this.state;
    const { view } = this.props;

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
                clickHandler={this.clickHandle}
                view={view}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default SmartComponent;

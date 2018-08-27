import React, { Component } from 'react';
import moment from 'moment';

const eventList = [
  {
    id: 1,
    name: 'Fake event',
    description:
      'Nobis odio necessitatibus expedita vitae amet error eum mollitia, non voluptas? Ex magnam recusandae iure voluptates officia fugit itaque nemo illo velit.',
    type: 'work',
    priority: 'important',
    start: moment()
      .hour(9)
      .minutes(0)
      .valueOf(),
    end: moment()
      .hour(12)
      .minutes(0)
      .valueOf(),
    status: 'pending',
  },
  {
    id: 2,
    name: 'Fake event',
    description:
      'Nobis odio necessitatibus expedita vitae amet error eum mollitia, non voluptas? Ex magnam recusandae iure voluptates officia fugit itaque nemo illo velit.',
    type: 'education',
    priority: 'important',
    start: moment()
      .hour(12)
      .minutes(30)
      .valueOf(),
    end: moment()
      .hour(13)
      .minutes(0)
      .valueOf(),
    status: 'pending',
  },
  {
    id: 3,
    name: 'Fake event',
    description:
      'Nobis odio necessitatibus expedita vitae amet error eum mollitia, non voluptas? Ex magnam recusandae iure voluptates officia fugit itaque nemo illo velit.',
    type: 'work',
    priority: 'important',
    start: moment()
      .hour(14)
      .minutes(0)
      .valueOf(),
    end: moment()
      .hour(15)
      .minutes(30)
      .valueOf(),
    status: 'pending',
  },
  {
    id: 4,
    name: 'Fake event',
    description:
      'Nobis odio necessitatibus expedita vitae amet error eum mollitia, non voluptas? Ex magnam recusandae iure voluptates officia fugit itaque nemo illo velit.',
    type: 'family',
    priority: 'important',
    start: moment()
      .hour(17)
      .minutes(0)
      .valueOf(),
    end: moment()
      .hour(19)
      .minutes(30)
      .valueOf(),
    status: 'pending',
  },
];

const colorList = {
  work: '#A9EFEA',
  education: '#FFE07F',
  family: '#FFBFD4',
};

export default OriginalComponent =>
  class RenderEventsContainer extends Component {
    constructor(props) {
      super(props);
      this.state = {
        hourHeight: 50,
        pixelsInMinute: null,
      };
      this.displayStartTime = 8;
    }

    componentDidMount = () => {
      setTimeout(() => {
        const { hourHeight } = this.state;
        this.wrapperRef.scrollTop = hourHeight * this.displayStartTime;
      });
    };

    setHeight = height =>
      this.setState(() => ({ hourHeight: height, pixelsInMinute: height / 60 }));

    setWrapperRef = node => {
      this.wrapperRef = node;
    };

    getHeight = (start, end) => {
      const { pixelsInMinute } = this.state;
      return Math.floor((end - start) / 60000) * pixelsInMinute;
    };

    startTime = date => {
      const time = moment(date);
      const { pixelsInMinute } = this.state;
      return (time.hours() * 60 + time.minutes()) * pixelsInMinute;
    };

    hours = () => {
      const { hourHeight } = this.state;
      const hours = Array(...Array(25)).map((_, i) => (
        <li key={i} style={{ paddingBottom: hourHeight - 19 }}>
          {i < 10 ? `0${i}` : i}
          :00
        </li>
      ));

      return hours;
    };

    render() {
      const {
        props,
        state: { hourHeight },
        setHeight,
        hours,
        startTime,
        getHeight,
        setWrapperRef,
      } = this;

      return (
        <OriginalComponent
          {...props}
          setHeight={setHeight}
          hours={hours}
          startTime={startTime}
          getHeight={getHeight}
          setWrapperRef={setWrapperRef}
          hourHeight={hourHeight}
          eventList={eventList}
          colorList={colorList}
        />
      );
    }
  };

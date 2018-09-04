import React, { Component } from 'react';
import moment from 'moment';

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
      const { pixelsInMinute } = this.state;
      return (date.hours() * 60 + date.minutes()) * pixelsInMinute;
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
        />
      );
    }
  };

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const RenderEventsContainer = OriginalComponent =>
  class RenderEvents extends Component {
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
        const { workingStartTime } = this.props;
        this.wrapperRef.scrollTop = hourHeight * workingStartTime - 4;
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

    handleShow = id => () => {
      const { history } = this.props;
      history.push(`/event/${id}`);
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
        handleShow,
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
          handleShow={handleShow}
        />
      );
    }
  };

RenderEventsContainer.propTypes = {
  workingStartTime: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired,
};

export default RenderEventsContainer;

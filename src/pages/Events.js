import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loadEvents } from 'modules/Events/actions';
import EventCart from './events/EventCart';

class Events extends Component {
  componentDidMount = () => {
    const { loadEvents } = this.props;
    loadEvents();
  };

  render() {
    const { events } = this.props;
    return (
      <PageContainer className="page-content events-list">
        Events:
        <EventsList>
          {events
            ? events.map(event => {
                const {
                  title,
                  'start-date': startDate,
                  'end-date': endDate,
                  description,
                  priority,
                } = event.attributes;
                return (
                  <EventCart
                    key={event.id}
                    title={title}
                    startDate={startDate}
                    endDate={endDate}
                    description={description}
                    priority={priority}
                  />
                );
              })
            : null}
        </EventsList>
      </PageContainer>
    );
  }
}

export default connect(
  state => ({
    events: state.events.eventsList,
  }),
  { loadEvents }
)(Events);

const PageContainer = styled.div`
  background-color: #f2f6ff;
  padding: 34px 36px 10px 44px;
  @media (max-width: 1200px) {
    padding: 34px 30px 0 30px;
  }
  @media (max-width: 992px) {
    padding: 34px 20px 10px 20px;
  }
`;

const EventsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-right: -2%;
  @media (max-width: 992px) {
    margin-right: -3%;
  }
  @media (max-width: 737px) {
    margin-right: -2%;
  }
  @media (max-width: 500px) {
    margin-right: 0;
  }
`;

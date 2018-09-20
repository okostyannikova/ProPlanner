import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RoundButton from 'components/RoundButton';
import Loader from 'components/Loader';
import { eventsOperations } from '../modules/Events';
import EventCard from './events/EventCard';

class Events extends Component {
  componentDidMount = () => {
    const { loadEvents } = this.props;
    loadEvents();
  };

  getBody = () => {
    const { events, loading, deleteEvent, history } = this.props;
    if (loading) {
      return <Loader />;
    }
    if (events) {
      return events.map(event => {
        const {
          title,
          'start-date': startDate,
          'end-date': endDate,
          description,
          priority,
        } = event.attributes;
        return (
          <EventCard
            key={event.id}
            id={event.id}
            title={title}
            startDate={startDate}
            endDate={endDate}
            description={description}
            priority={priority}
            deleteEvent={deleteEvent}
            history={history}
          />
        );
      });
    }
    if (!loading && !events) {
      return (
        <NoEventsMessage>
          Unfortunately you have no events yet.
          <AddEventLink to="/event/add">Create new event</AddEventLink>
        </NoEventsMessage>
      );
    }
  };

  render() {
    return (
      <PageContainer className="page-content events-list">
        <Header>
          <Title>The Events</Title>
          <RoundButton to="/event/add" dataQa="add-event-btn" />
        </Header>
        <EventsList>{this.getBody()}</EventsList>
      </PageContainer>
    );
  }
}

Events.defaultProps = {
  events: null,
};

Events.propTypes = {
  history: PropTypes.object.isRequired,
  // from connect
  events: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  loadEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    events: state.events.eventsList,
    loading: state.events.loading,
  }),
  {
    loadEvents: eventsOperations.loadEvents,
    deleteEvent: eventsOperations.deleteEvent,
  }
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

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(51, 102, 180, 0.87);
`;
const Title = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const EventsList = styled.div`
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

const NoEventsMessage = styled.p`
  color: rgba(52, 70, 98, 0.8);
  font-size: 18px;
`;

const AddEventLink = styled(Link)`
  color: #00bcd4;
  padding-left: 5px;
  text-decoration: underline;
  white-space: nowrap;
  &:hover {
    text-decoration: none;
  }
`;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import RoundButton from 'components/RoundButton';
import Loader from 'components/Loader';
import NoItemsMessage from 'components/NoItemsMessage';
import throttle from 'lodash.throttle';
import { eventsOperations } from '../modules/Events';
import EventCard from './events/EventCard';

class Events extends Component {
  constructor(props) {
    super(props);
    this.cardHeight = 219;
    this.state = {
      page: 1,
    };
  }

  componentDidMount = () => {
    this.fetchEvents();
    document.addEventListener('scroll', this.checkMoreData());
  };

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.checkMoreData());
  };

  getBody = () => {
    const { events, loading, deleteEvent, history } = this.props;
    if (events.length) {
      return (
        <TransitionGroup component={null}>
          {events.map(event => {
            const {
              title,
              'start-date': startDate,
              'end-date': endDate,
              'event-type': type,
              description,
              priority,
            } = event.attributes;
            return (
              <CSSTransition key={event.id} in appear classNames="card" timeout={400}>
                <EventCard
                  key={event.id}
                  id={event.id}
                  type={type}
                  title={title}
                  startDate={startDate}
                  endDate={endDate}
                  description={description}
                  priority={priority}
                  deleteEvent={deleteEvent}
                  history={history}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      );
    }
    if (!loading && !events.length) {
      return (
        <NoItemsMessage item="event" url="/event/add">
          Unfortunately you have no events yet.
        </NoItemsMessage>
      );
    }
  };

  fetchEvents = () => {
    const { loadEvents, lastPageNumber } = this.props;
    const { page } = this.state;
    if (page <= lastPageNumber) {
      loadEvents(page, 20);
      this.setState(prevState => ({ page: prevState.page + 1 }));
    }
  };

  checkMoreData = () =>
    throttle(ev => {
      const elem = ev.target.documentElement;
      if (elem.scrollHeight - elem.scrollTop - this.cardHeight <= elem.clientHeight) {
        this.fetchEvents();
      }
    }, 300);

  render() {
    const { loading } = this.props;
    return (
      <PageContainer className="page-content events-list">
        <Header>
          <Title>The Events</Title>
          <RoundButton to="/event/add" dataQa="add-event-btn" />
        </Header>
        <EventsList>{this.getBody()}</EventsList>
        {loading && <Loader />}
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
  lastPageNumber: PropTypes.number.isRequired,
  loadEvents: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    events: state.events.eventsList,
    loading: state.events.loading,
    lastPageNumber: state.events.lastPageNumber,
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
    flex-direction: column;
    align-items: center;
  }
`;

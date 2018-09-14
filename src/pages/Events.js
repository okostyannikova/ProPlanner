import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadEvents } from 'modules/Events/actions';
import AddNewUnitBtn from 'components/AddNewUnitBtn';
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
        <Header>
          <Title>The Events</Title>
          <Link to="/event/add">
            <AddNewUnitBtn />
          </Link>
        </Header>
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
                    id={event.id}
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

import React, { Component } from 'react';
import styled from 'styled-components';
import EventCart from './events/EventCart';

const eventsList = [1, 2, 3, 4, 5, 6, 7];

export default class Events extends Component {
  render() {
    return (
      <PageContainer className="page-content events-list">
        Events:
        <EventsList>
          {eventsList.map(id => (
            <EventCart key={id} />
          ))}
        </EventsList>
      </PageContainer>
    );
  }
}

const PageContainer = styled.div`
  background-color: #f2f6ff;
  padding: 34px 36px 0 44px;
`;

const EventsList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

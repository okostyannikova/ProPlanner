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
  @media (max-width: 1200px) {
    padding: 34px 30px 0 30px;
  }
  @media (max-width: 992px) {
    padding: 34px 20px 0 20px;
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
  @media (max-width: 512px) {
    margin-right: 0;
  }
`;

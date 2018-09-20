import React from 'react';
import styled from 'styled-components';
import { priorityOptions } from 'config';
import { Link } from 'react-router-dom';
import TypeLabel from 'components/TypeLabel';
import EditCardMenu from 'components/EditCardMenu';
import PriorityArrow from 'components/Icons/PriorityArrow';
import tasksSummaryIcon from 'assets/images/events/summary-tasks-icon.svg';

const cutDescription = description =>
  description.length > 50 ? `${description.slice(0, 51)}...` : description;

const EventCard = ({ id, title, startDate, endDate, description, priority }) => (
  <CartWrapper>
    <EditCardMenu iconColor="#8eaad4" id={id} />
    <Cart to={`/event/${id}`}>
      <TypeLabel color="#FFE07F">Personal</TypeLabel>
      <div>
        <Title>{title}</Title>
        <TimeWrapper>
          <TimeItem>
            <Day>{startDate.format('DD')}</Day>
            <Date>
              {startDate.format('MMMM')}
              <br />
              {startDate.format('HH:mm')}
            </Date>
          </TimeItem>
          <Separator />
          <TimeItem>
            <Day>{endDate.format('DD')}</Day>
            <Date>
              {endDate.format('MMMM')}
              <br />
              {endDate.format('HH:mm')}
            </Date>
          </TimeItem>
        </TimeWrapper>
        <Description>{cutDescription(description)}</Description>
        <Footer>
          <Priority>
            <PriorityArrow
              fill={priorityOptions[priority].color}
              direction={priorityOptions[priority].direction}
            />
            {priority}
          </Priority>
          <TasksSummary>
            3/6 <img src={tasksSummaryIcon} alt="task summary" />
          </TasksSummary>
        </Footer>
      </div>
    </Cart>
  </CartWrapper>
);
export default EventCard;

const CartWrapper = styled.div`
  position: relative;
  flex-basis: 23%;
  min-height: 220px;
  margin: 39px 2% 12px 0;
  background-color: #fff;
  transform: scale(1, 1);
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  &:hover {
    cursor: pointer;
    transform: scale(1.02, 1.02);
  }
  box-sizing: border-box;
  border-radius: 2px;
  box-shadow: 4px 6px 8px rgba(0, 0, 0, 0.12), -4px -4px 8px rgba(0, 0, 0, 0.12);
  @media (max-width: 1285px) {
    flex-basis: 31%;
  }
  @media (max-width: 737px) {
    flex-basis: 48%;
  }
  @media (max-width: 500px) {
    flex-basis: 100%;
    margin: 30px 0 0 0;
  }
  @media (min-width: 1500px) {
    flex-basis: 249px;
  }
`;

const Cart = styled(Link)`
  display: block;
  color: #3366b4;
  font-weight: 400;
  font-size: 16px;
  padding: 24px 16px 20px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 400;
  margin: 0;
`;

const TimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 8px 0;
  color: rgba(51, 102, 180, 0.5);
  border: 1px solid rgba(52, 70, 98, 0.3);
  border-radius: 2px;
`;
const TimeItem = styled.div`
  padding: 0 1% 0 3%;
  width: 50%;
  box-sizing: border-box;
`;
const Day = styled.span`
  color: #3366b4;
  font-size: 24px;
`;
const Date = styled.div`
  display: inline-block;
  margin-left: 4px;
  font-size: 10px;
  text-transform: uppercase;
`;

const Separator = styled.div`
  width: 1px;
  height: 32px;
  background-color: #c4c4c4;
`;

const Description = styled.p`
  margin-top: 7px;
  margin-bottom: 0;
  height: 38px;
  line-height: 19px;
  color: rgba(51, 102, 180, 0.5);
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 24px;
`;

const Priority = styled.span`
  text-transform: capitalize;
  & :first-child {
    margin-right: 8px;
  }
`;
const TasksSummary = styled.span`
  font-weight: 700;
  color: rgba(51, 102, 180, 0.5);
  vertical-align: middle;
  & :last-child {
    vertical-align: bottom;
    margin-left: 5px;
  }
`;

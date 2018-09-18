import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import TypeLabel from 'components/TypeLabel';
import EditCardMenu from 'components/EditCardMenu';
import eventsSummaryIcon from 'assets/images/goals/summary-events-icon.svg';
import { colorTypes, smartOptions } from '../../config';

const cutDescription = description =>
  description.length > 50 ? `${description.slice(0, 51)}...` : description;

class GoalCard extends Component {
  handleEdit = id => () => {
    const { history } = this.props;
    history.push(`/goal/${id}/edit`);
  };

  handleDelete = id => () => {
    const { deleteGoal } = this.props;
    deleteGoal(id);
  };

  render() {
    const {
      goal: {
        id,
        attributes: {
          title,
          'goal-type': type,
          'picture-link': pictureLink,
          description,
          s,
          m,
          a,
          r,
          t,
        },
      },
    } = this.props;
    const smart = { s, m, a, r, t };
    return (
      <CardWrapper>
        <EditCardMenu
          iconColor="rgba(52, 70, 98, 0.87)"
          handleDelete={this.handleDelete(id)}
          handleEdit={this.handleEdit(id)}
        />
        <Card to={`/goal/${id}`}>
          <TypeLabel color={colorTypes[type]}>{type}</TypeLabel>
          <div>
            <Title>{title}</Title>

            <ImgWrapper>
              <Img src={pictureLink} />
            </ImgWrapper>

            <SmartCover>
              {Object.keys(smart).map(el => (
                <SmartLetter key={el} color={smart[el] ? smartOptions[el].color : '#f5f5f5'}>
                  {el}
                </SmartLetter>
              ))}
            </SmartCover>

            <Description>{cutDescription(description)}</Description>
            <Footer>
              <EventsSummary>
                3 <img src={eventsSummaryIcon} alt="events summary" />
              </EventsSummary>
            </Footer>
          </div>
        </Card>
        <AddEventLink to="/event/add">add event</AddEventLink>
      </CardWrapper>
    );
  }
}

GoalCard.defaultProps = {
  goal: null,
};

GoalCard.propTypes = {
  history: PropTypes.object.isRequired,
  goal: PropTypes.object,
  deleteGoal: PropTypes.func.isRequired,
};

export default GoalCard;

const CardWrapper = styled.div`
  position: relative;
  flex-basis: 23%;
  min-height: 393px;
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

const Card = styled(Link)`
  display: block;
  color: #344662;
  font-weight: 400;
  font-size: 16px;
  padding: 24px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 400;
  margin: 0;
`;

const ImgWrapper = styled.div`
  width: 100%;
  margin-top: 14px;
`;

const Img = styled.img`
  width: 100%;
  height: 145px;
`;

const SmartCover = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;
const SmartLetter = styled.div(
  ({ color }) => css`
    width: 29px;
    text-align: center;
    font-size: 14px;
    text-transform: uppercase;
    color: ${color};
    padding-bottom: 5px;
    border-bottom: 3px solid ${color};
  `
);

const Description = styled.p`
  color: rgba(52, 70, 98, 0.87);
  margin-top: 16px;
  margin-bottom: 0;
  height: 38px;
  line-height: 19px;
`;

const Footer = styled.footer`
  margin-top: 11px;
  color: rgba(52, 70, 98, 0.5);
`;

const EventsSummary = styled.div`
  text-align: right;
  padding-bottom: 10px;
  border-bottom: 1px solid #c4c4c4;
  & :last-child {
    vertical-align: top;
    margin-left: 3px;
  }
`;

const AddEventLink = styled(Link)`
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(52, 70, 98, 0.5);
  &:hover {
    text-decoration: underline;
  }
`;

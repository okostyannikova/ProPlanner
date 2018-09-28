import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import TypeLabel from 'components/TypeLabel';
import EditCardMenu from 'components/EditCardMenu';
import eventsSummaryIcon from 'assets/images/goals/summary-events-icon.svg';
import defaultPicture from 'assets/images/goals/goal-default-picture.png';
import { colorTypes, smartOptions } from 'config';
import { cutText } from 'utils/helpers';

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
    const { id, title, type, pictureLink, description, smart } = this.props;
    return (
      <CardWrapper>
        <EditCardMenu
          iconColor="rgba(52, 70, 98, 0.87)"
          type="goal"
          handleDelete={this.handleDelete(id)}
          handleEdit={this.handleEdit(id)}
        />
        <Card to={`/goal/${id}`} data-qa="goal-card">
          <TypeLabel color={colorTypes[type]}>{type}</TypeLabel>
          <div>
            <Title>{title}</Title>

            <ImgWrapper>
              <Img src={pictureLink || defaultPicture} />
            </ImgWrapper>

            <SmartCover>
              {Object.keys(smart).map(el => (
                <SmartLetter key={el} color={smart[el] ? smartOptions[el].color : '#f5f5f5'}>
                  {el}
                </SmartLetter>
              ))}
            </SmartCover>

            <Description>{cutText(description, 55)}</Description>
            <Footer>
              <EventsSummary>
                3 <img src={eventsSummaryIcon} alt="events summary" />
              </EventsSummary>
            </Footer>
          </div>
        </Card>
        <AddEventLink to="/event/add" data-qa="add-event-link">
          add event
        </AddEventLink>
      </CardWrapper>
    );
  }
}

GoalCard.defaultProps = {
  pictureLink: defaultPicture,
  description: '',
};

GoalCard.propTypes = {
  history: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  pictureLink: PropTypes.string,
  description: PropTypes.string,
  smart: PropTypes.objectOf(PropTypes.string).isRequired,
  deleteGoal: PropTypes.func.isRequired,
};

export default GoalCard;

const CardWrapper = styled.div`
  position: relative;
  width: 23%;
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
    width: 31%;
  }
  @media (max-width: 737px) {
    width: 48%;
  }
  @media (max-width: 500px) {
    width: 290px;
    margin: 30px 0 0 0;
  }
  @media (max-width: 376px) {
    width: 100%;
  }
  @media (min-width: 1500px) {
    width: 249px;
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
  height: 21px;
  font-size: 18px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
  margin-right: 25px;
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

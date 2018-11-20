import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import RoundButton from 'components/RoundButton';
import Loader from 'components/Loader';
import NoItemsMessage from 'components/NoItemsMessage';
import CardsPagination from 'components/hocs/CardsPagination';
import SearchInput from 'components/Navigation/SearchInput.js';
import { goalsOperations } from '../modules/Goals';
import GoalCard from './goals/GoalCard';

class Goals extends Component {
  getBody = () => {
    const { goals, loading, deleteGoal, history } = this.props;
    if (goals.length) {
      return (
        <TransitionGroup component={null}>
          {goals.map(goal => {
            const {
              title,
              'goal-type': type,
              picture,
              description,
              s,
              m,
              a,
              r,
              t,
            } = goal.attributes;
            const smart = { s, m, a, r, t };
            return (
              <CSSTransition key={goal.id} in appear classNames="card" timeout={400}>
                <GoalCard
                  key={goal.id}
                  id={goal.id}
                  title={title}
                  type={type}
                  picture={picture}
                  description={description}
                  smart={smart}
                  deleteGoal={deleteGoal}
                  history={history}
                  events={goal.events}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      );
    }
    if (!loading && !goals.length) {
      return (
        <NoItemsMessage item="goal" url="/goal/add">
          Unfortunately you have no goals yet.
        </NoItemsMessage>
      );
    }
  };

  render() {
    const { loading, loadData, restoreData, lastPageNumber, setSearch, search } = this.props;
    return (
      <PageContainer className="page-content goals-list">
        <Header>
          <Title>My Goals</Title>
          <InputWrapper>
            <SearchInput search={setSearch} />
          </InputWrapper>
          <RoundButton to="/goal/add" type="goal" />
        </Header>
        <CardsPagination
          restoreData={restoreData}
          loadData={loadData}
          lastPageNumber={lastPageNumber}
          cardHeight={393}
          numberOfCards={15}
          search={search}
        >
          <GoalsList>{this.getBody()}</GoalsList>
        </CardsPagination>
        {loading && <Loader />}
      </PageContainer>
    );
  }
}

Goals.defaultProps = {
  goals: null,
  search: null,
};

Goals.propTypes = {
  history: PropTypes.object.isRequired,
  // from connect
  goals: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool.isRequired,
  search: PropTypes.string,
  loadData: PropTypes.func.isRequired,
  deleteGoal: PropTypes.func.isRequired,
  restoreData: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
  lastPageNumber: PropTypes.number.isRequired,
};

export default connect(
  state => ({
    goals: state.goals.goalsList,
    loading: state.goals.loading,
    lastPageNumber: state.goals.lastPageNumber,
    search: state.goals.search,
  }),
  {
    loadData: goalsOperations.loadGoals,
    deleteGoal: goalsOperations.deleteGoal,
    restoreData: goalsOperations.restoreGoals,
    setSearch: goalsOperations.setSearch,
  }
)(Goals);

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

const InputWrapper = styled.div`
  margin-left: auto;
  margin-right: 70px;
`;

const GoalsList = styled.div`
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

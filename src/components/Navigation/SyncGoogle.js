import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { eventsOperations } from 'modules/Events';
import CircularProgress from '@material-ui/core/CircularProgress';
import SyncGCIcon from '../Icons/SyncGCIcon';
import './styles.css';

const SyncGoogle = ({ syncWithGoogle, synchronising }) => (
  <Button type="button" onClick={syncWithGoogle} title="Sync with Google Calendar">
    {!synchronising ? (
      <SyncGCIcon color="rgba(51,102,180,0.87)" />
    ) : (
      <LoaderWrapper>
        <Loader thickness={5} style={{ color: 'rgba(51,102,180,0.87)' }} size={20} />
      </LoaderWrapper>
    )}
  </Button>
);

SyncGoogle.defaultProps = {
  synchronising: false,
};

SyncGoogle.propTypes = {
  syncWithGoogle: PropTypes.func.isRequired,
  synchronising: PropTypes.bool,
};

export default connect(
  state => ({ synchronising: state.events.synchronising }),
  { syncWithGoogle: eventsOperations.syncWithGoogle }
)(SyncGoogle);

const Button = styled.button`
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0 10px;
  height: 60px;
  &:hover {
    opacity: 0.75;
  }
`;

const LoaderWrapper = styled.span`
  display: flex;
  width: 27px;
  height: 27px;
  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
`;
const Loader = styled(CircularProgress)`
  margin: auto;
`;

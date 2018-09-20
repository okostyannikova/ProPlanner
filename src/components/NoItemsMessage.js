import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NoItemsMessage = ({ url, item, children }) => (
  <NoItemsText>
    {children}
    <AddItemLink to={url}>Create new {item}</AddItemLink>
  </NoItemsText>
);

NoItemsMessage.propTypes = {
  url: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const NoItemsText = styled.p`
  color: rgba(52, 70, 98, 0.8);
  font-size: 18px;
`;

const AddItemLink = styled(Link)`
  color: #00bcd4;
  padding-left: 5px;
  text-decoration: underline;
  white-space: nowrap;
  &:hover {
    text-decoration: none;
  }
`;

export default NoItemsMessage;

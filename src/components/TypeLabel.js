import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const TypeLabel = ({ children, color }) => <Label color={color}>{children}</Label>;

const Label = styled.span(
  ({ color }) => css`
    position: absolute;
    left: 8px;
    top: -12px;
    min-width: 110px;
    height: 28px;
    padding: 5px 3px 8px;
    text-align: center;
    color: #fff;
    background-color: ${color};
    border-radius: 2px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
  `
);

TypeLabel.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
};

export default TypeLabel;

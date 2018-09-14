import React from 'react';
import styled from 'styled-components';

const TypeLabel = ({ children, color }) => <Label color={color}>{children}</Label>;

const Label = styled.span`
  position: absolute;
  left: 8px;
  top: -12px;
  min-width: 110px;
  height: 28px;
  padding: 5px 3px 8px;
  text-align: center;
  color: #fff;
  background-color: ${props => props.color};
  border-radius: 2px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
`;

export default TypeLabel;

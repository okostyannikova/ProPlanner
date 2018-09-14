import React from 'react';
import styled from 'styled-components';

const Loader = () => <LoaderText>Loading...</LoaderText>;

export default Loader;

const LoaderText = styled.div`
  color: rgba(52, 70, 98, 0.8);
  font-size: 18px;
`;

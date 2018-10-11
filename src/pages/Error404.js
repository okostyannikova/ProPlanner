import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import monkey from 'assets/images/error/monkey-error-page.svg';
import shadowTop from 'assets/images/error/shadow-top.svg';
import shadowBottom from 'assets/images/error/shadow-bottom.svg';

const Error404 = () => (
  <PageWrapper>
    <TextWrapper>
      <AccentText>Oops</AccentText>
      <Text>The page you are looking for can't be found.</Text>
      <StyledLink to="/">Go to home</StyledLink>
    </TextWrapper>
    <ErrorNumber>404</ErrorNumber>
    <ImageWrapper>
      <StyledImage src={monkey} />
    </ImageWrapper>
  </PageWrapper>
);

export default Error404;

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background: url(${shadowTop}) -10px -20px no-repeat, url(${shadowBottom}) bottom right no-repeat;
  @media (max-height: 576px) and (orientation: landscape) {
    height: auto;
    min-height: 550px;
  }
`;
const TextWrapper = styled.div`
  text-align: center;
  padding-top: 64px;
  @media (max-width: 576px) {
    padding-top: 30px;
  }
`;
const AccentText = styled.p`
  font-weight: 500;
  line-height: 90px;
  font-size: 64px;
  color: #dd4b39;
  margin: 0;
  @media (max-width: 576px) {
    font-size: 45px;
  }
`;
const Text = styled.p`
  color: rgba(52, 70, 98, 0.8);
  font-size: 30px;
  font-weight: 400;
  margin-top: 10px;
  @media (max-width: 576px) {
    font-size: 20px;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 150px;
  height: 36px;
  padding: 10px;
  color: #fff;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  background-color: #dd4b39;
  border-radius: 2px;
  box-sizing: border-box;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12);
  &:hover {
    box-shadow: inset 0px 0px 30px rgba(0, 0, 0, 0.24);
  }
`;

const ErrorNumber = styled.p`
  font-weight: bold;
  font-size: 400px;
  text-align: center;
  letter-spacing: 0.025em;
  text-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
  color: rgba(52, 70, 98, 0.2);
  margin: 0 0 0 -15%;
  @media (max-width: 992px) {
    font-size: 300px;
    margin: 0;
  }
  @media (max-width: 576px) {
    font-size: 170px;
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 7%;
  @media (max-width: 992px) and (orientation: portrait), (orientation: portrait) {
    left: -30%;
    width: 130%;
  }
  @media (max-width: 576px), (max-width: 576px) and (orientation: portrait) {
    left: -60%;
    width: 160%;
  }
  @media (max-height: 576px) and (orientation: landscape) {
    bottom: 0;
  }
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
`;

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import monkey from 'assets/images/error/monkey-error-page.svg';
import shadowTop from 'assets/images/error/shadow-top.svg';
import shadowBottom from 'assets/images/error/shadow-bottom.svg';

const Error404 = () => (
  <PageWrapper>
    <TextWrapper>
      <Text>
        <AccentText>Oops, </AccentText>
        the page you are looking for <br /> can't be found.
      </Text>
      <StyledLink to="/">Go to home</StyledLink>
    </TextWrapper>
    <ErrorWrapper>
      <ErrorNumber>404</ErrorNumber>
      <ImageWrapper>
        <StyledImage src={monkey} />
      </ImageWrapper>
    </ErrorWrapper>
  </PageWrapper>
);

export default Error404;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: url(${shadowTop}) -10px -20px no-repeat, url(${shadowBottom}) bottom right no-repeat;
  @media (max-height: 576px) and (orientation: landscape) {
    height: auto;
    min-height: 550px;
  }
`;
const TextWrapper = styled.div`
  text-align: center;
  padding-top: 96px;
  @media (max-width: 576px) {
    padding-top: 90px;
  }
`;
const AccentText = styled.span`
  font-weight: 500;
  font-size: 36px;
  color: rgba(52, 70, 98, 0.8);
  @media (min-width: 1500px) {
    font-size: 48px;
  }
  @media (max-width: 576px) {
    font-size: 24px;
  }
`;
const Text = styled.p`
  color: rgba(52, 70, 98, 0.8);
  font-size: 24px;
  font-weight: 400;
  line-height: 40px;
  margin: 0;
  @media (min-width: 1500px) {
    font-size: 36px;
  }
  @media (max-width: 576px) {
    font-size: 18px;
    line-height: 1.5em;
  }
`;

const StyledLink = styled(Link)`
  display: inline-block;
  width: 150px;
  height: 36px;
  padding: 10px;
  margin-top: 16px;
  margin-bottom: 0;
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

const ErrorWrapper = styled.div`
  overflow: hidden;
  @media (max-width: 670px) {
    margin-top: 62px;
  }
`;

const ErrorNumber = styled.p`
  font-weight: bold;
  font-size: 400px;
  text-align: center;
  letter-spacing: 0.025em;
  line-height: 1em;
  text-shadow: 0px 6px 10px rgba(0, 0, 0, 0.2);
  color: rgba(52, 70, 98, 0.2);
  margin: 0 0 0 -17%;
  @media (min-width: 1500px) {
    font-size: 560px;
  }
  @media (max-width: 992px) {
    font-size: 300px;
  }
  @media (max-width: 670px) {
    margin: 0;
    font-size: 250px;
  }
  @media (max-width: 576px) {
    font-size: 196px;
  }
`;

const ImageWrapper = styled.div`
  width: 109%;
  margin: -366px 0 0 -5px;
  @media (min-width: 1500px) {
    width: 100%;
    margin: -497px 0 0 0;
  }
  @media (max-width: 1170px) {
    margin: -325px 0 0 -5px;
  }
  @media (max-width: 992px) {
    margin-top: -267px;
  }
  @media (max-width: 830px) {
    width: 130%;
    margin: -261px 0 0 -10%;
  }
  @media (max-width: 670px) {
    width: 140%;
    margin: -120px 0 0 -28%;
  }
  @media (max-width: 576px) {
    width: 160%;
    margin: -102px 0 0 -49%;
  }
  @media (max-width: 375px) {
    width: 200%;
    margin: -102px 0 0 -70%;
  }
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
`;

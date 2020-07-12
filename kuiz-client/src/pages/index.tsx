import React, { useState } from "react";
import { NextPage } from "next";
import Layout from "../components/Layout";
import styled from "styled-components";

type Props = {};

const IndexPage: NextPage<Props> = props => {
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(true);
  };
  const handleLeave = () => {
    setHover(false);
  };
  return (
    <MainLayout>
      <h1
        className={`animate__animated ${hover ? "animate__rubberBand" : ""}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}>
        Kuiz
      </h1>
      <div></div>
    </MainLayout>
  );
};

const MainLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-family: ${props => props.theme.fonts.second};
    font-weight: 100;
    text-shadow: 2px 2px 3px #000, -1px -1px 0 #000, 1px -1px 0 #000,
      -1px 1px 0 #000, 1px 1px 0 #000;
    color: ${props => props.theme.colors.main}90;
    font-size: 10rem;
    cursor: pointer;
  }
`;

export default IndexPage;

import React from "react";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import styled from "styled-components";
import QuestionListCreator from "../../containers/QuestionListCreator";

type Props = {};

const CreateGame: NextPage<Props> = props => {
  return (
    <MainLayout>
      <h1 className="h-font animate__bounceInDown animate__animated">
        문제 만들기
      </h1>
      <p className="sm-font animate__animated animate__flipInX">
        문제 를 생성 해 주세요! (최대 20문제)
      </p>
      <QuestionListCreator />
    </MainLayout>
  );
};

const MainLayout = styled(Layout)`
  padding: 40px;
  font-size: 1.8rem;
  .h-font {
    ${props => props.theme.shadow.type1}
    font-weight: bold;
    font-size: 1.7rem;
  }

  .sm-font {
    ${props => props.theme.shadow.type2}
    font-weight: 300;
    font-size: 1.3rem;
  }
`;

export default CreateGame;

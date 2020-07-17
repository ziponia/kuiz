import React, { useState } from "react";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import styled from "styled-components";
import QuestionListCreator from "../../containers/QuestionListCreator";
import { useSession } from "next-auth/client";

type Props = {};

const CreateGame: NextPage<Props> = props => {
  const [maxQuestion, setMaxQuestion] = useState(20);
  const [session, loading] = useSession();
  return (
    <MainLayout>
      <h1 className="h-font animate__bounceInDown animate__animated">
        문제 만들기
      </h1>
      <p className="sm-font animate__animated animate__flipInX">
        문제 를 생성 해 주세요! (최대 {maxQuestion}문제)
      </p>
      <div className="action-block">
        <button className="action-btn create-game-btn">Create Game!</button>
      </div>
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

  .action-block {
    margin: 10px 0;
    text-align: right;
  }

  .create-game-btn {
    font-size: 0.8rem;
    box-sizing: border-box;
  }
`;

export default CreateGame;

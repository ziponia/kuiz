import React, { useState } from "react";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import styled from "styled-components";
import QuestionListCreator from "../../containers/QuestionListCreator";
import { useSession } from "next-auth/client";
import gql from "graphql-tag";
import { Mutation } from "@apollo/react-components";
import { useMutation } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../module";

type Props = {};

const ADD_GAME = gql`
  mutation AddGamne($input: [AddGameInput!]!) {
    addGame(input: $input) {
      id
    }
  }
`;

const CreateGame: NextPage<Props> = props => {
  const [maxQuestion, setMaxQuestion] = useState(20);
  const { games } = useSelector((store: RootState) => store.game);
  const [session, loading] = useSession();
  const [addGame, { data }] = useMutation(ADD_GAME);

  const handleCreateGame = async () => {
    if (games.length <= 2) {
      // ...TODO 게임은 2개 이상 생성 해주세여
      return console.log("");
    }

    const { data } = await addGame({
      variables: {
        input: games,
      },
    });
  };

  return (
    <MainLayout>
      <h1 className="h-font animate__bounceInDown animate__animated">
        문제 만들기
      </h1>
      <p className="sm-font animate__animated animate__flipInX">
        문제 를 생성 해 주세요! (최대 {maxQuestion}문제)
      </p>
      <div className="action-block">
        <button
          className="action-btn create-game-btn"
          onClick={handleCreateGame}>
          Create Game!
        </button>
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

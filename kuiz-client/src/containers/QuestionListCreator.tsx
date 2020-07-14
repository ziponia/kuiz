import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import gameSlice from "../module/game";
import { RootState } from "../module";

type QuestionListCreatorProps = {};

const QuestionListCreator: React.FC<QuestionListCreatorProps> = props => {
  const { games } = useSelector((store: RootState) => store.game);
  const dispatch = useDispatch();

  const { actions } = gameSlice;

  const handleAnswerNext = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.keyCode === 9) {
      // tab
      const findNextIndex = games.find(item => item.index > currentIndex);
      if (typeof findNextIndex === "undefined") {
        dispatch(
          actions.addGame({
            index: currentIndex + 1,
            question: "",
            answer: "",
          })
        );
      }
    }
  };

  const handleRowRemove = (currentIndex: number) => {
    dispatch(actions.removeGame(currentIndex));
  };

  const handleQChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentIndex = parseInt(e.target.getAttribute("data-seq"), 10);
    const question = e.target.value;
    dispatch(
      actions.setQuestionVal({
        index: currentIndex,
        question,
        answer: games[currentIndex].answer,
      })
    );
  };

  const handleAChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentIndex = parseInt(e.target.getAttribute("data-seq"), 10);
    const answer = e.target.value;
    dispatch(
      actions.setQuestionVal({
        index: currentIndex,
        question: games[currentIndex].question,
        answer,
      })
    );
  };

  return (
    <div>
      <Ul>
        <Li>
          <Cell>Question</Cell>
          <Cell>Answer</Cell>
          <Cell />
        </Li>
        {games.map(game => (
          <Li
            key={game.index}
            className="animate__backInDown animate__animated">
            <Cell>
              <Input
                data-seq={game.index}
                placeholder="Q."
                onChange={handleQChange}
              />
            </Cell>
            <Cell>
              <Input
                data-seq={game.index}
                placeholder="A."
                onKeyDown={e => handleAnswerNext(e, game.index)}
                onChange={handleAChange}
              />
            </Cell>
            <Cell>
              {game.index > 0 && (
                <button
                  className="remove-btn"
                  tabIndex={-1}
                  onClick={() => handleRowRemove(game.index)}>
                  Remove
                </button>
              )}
            </Cell>
          </Li>
        ))}
      </Ul>
    </div>
  );
};

const Ul = styled.ul`
  display: table;
  width: 100%;
  & li:nth-child(1) {
    span {
      border-bottom: 4px dashed #756c6c30;
    }
  }

  & li span:nth-child(1) {
    width: 800px;
  }
`;

const Li = styled.li`
  display: table-row;
  width: 100%;
`;

const Cell = styled.span`
  display: table-cell;
  font-size: 1.2rem;
  ${props => props.theme.shadow.type2};

  .remove-btn {
    color: #333;
    font-size: 0.8rem;
    background-color: transparent;
    border: 0;
    font-family: ${props => props.theme.fonts.korean};
    cursor: pointer;
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
  background-color: transparent;
  font-size: 0.8rem;
  padding: 8px;
  font-family: ${props => props.theme.fonts.korean};
  color: #333;

  /* box-sizing: border-box; */
  font-weight: bold;
  box-sizing: content-box;
  letter-spacing: 2.2px;

  &::placeholder {
    color: #333;
  }
`;

export default QuestionListCreator;

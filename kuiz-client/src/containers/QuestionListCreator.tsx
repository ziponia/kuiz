import React, { useState } from "react";
import styled from "styled-components";

type QuestionListCreatorProps = {};

type QuestionType = {
  question: string;
  answer: string;
  index: number;
};

const initialState: QuestionType[] = [
  {
    index: 0,
    question: "",
    answer: "",
  },
];
const QuestionListCreator: React.FC<QuestionListCreatorProps> = props => {
  const [questions, setQuestion] = useState<QuestionType[]>(initialState);

  const handleAnswerNext = (e: React.KeyboardEvent, currentIndex: number) => {
    if (e.keyCode === 9) {
      // tab
      const findNextIndex = questions.find(item => item.index > currentIndex);
      if (typeof findNextIndex === "undefined") {
        setQuestion(
          questions.concat({
            index: currentIndex + 1,
            question: "",
            answer: "",
          })
        );
      }
    }
  };

  return (
    <div>
      <Ul>
        <Li>
          <Cell>Question</Cell>
          <Cell>Answer</Cell>
          <Cell />
        </Li>
        {questions.map(question => (
          <Li
            key={question.index}
            className="animate__backInDown animate__animated">
            <Cell>
              <Input placeholder="Q." />
            </Cell>
            <Cell>
              <Input
                placeholder="A."
                onKeyDown={e => handleAnswerNext(e, question.index)}
              />
            </Cell>
            <Cell>
              <button className="remove-btn">Remove</button>
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
    color: inherit;
    font-size: 0.8rem;
    background-color: transparent;
    border: 0;
    ${props => props.theme.shadow.type2};
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
    color: #ffffff;
    text-shadow: 1px 1px 2px #ffffff, -1px -1px 0 #ffffff, 1px -1px 0 #ffffff,
      -1px 1px 0 #ffffff, 1px 1px 0 #ffffff;
  }
`;

export default QuestionListCreator;

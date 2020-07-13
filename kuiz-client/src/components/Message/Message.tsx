import React from "react";
import { Subscription } from "@apollo/react-components";
import { gql } from "apollo-boost";

const query = gql`
  subscription {
    messageReceive {
      messageId
      message
    }
  }
`;
const Message: React.FC = props => {
  return (
    <Subscription subscription={query}>
      {({ loading, error, data }) => {
        if (error) return <p>ERROR!: {JSON.stringify(error)}</p>;
        return <p>data: {JSON.stringify(data)}</p>;
      }}
    </Subscription>
  );
};

export default Message;

import React from "react";
import { gql } from "apollo-boost";
import { Query } from "@apollo/react-components";

const query = gql`
  query {
    user {
      id
      email
    }
  }
`;

const UserInfo: React.FC = (props) => {
  return (
    <Query query={query}>
      {({ data, loading, error }) => {
        if (loading) return <p>user loading....</p>;
        if (data) {
          return <p>{JSON.stringify(data)}</p>;
        }
      }}
    </Query>
  );
};

export default UserInfo;

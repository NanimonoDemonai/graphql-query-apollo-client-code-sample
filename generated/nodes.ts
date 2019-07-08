import { DocumentNode } from "graphql";
import gql from "graphql-tag";

export const TweetAutorBody: DocumentNode = gql`
  query TweetAutorBody($id: ID!) {
    Tweet(id: $id) {
      Author {
        username
      }
      body
    }
  }
`;

export const TweetMeta: DocumentNode = gql`
  query TweetMeta {
    TweetsMeta {
      count
    }
  }
`;

export const Tweet: DocumentNode = gql`
  query Tweet($id: ID!) {
    Tweet(id: $id) {
      body
      date
      Author {
        full_name
      }
    }
  }
`;

export const CreateTweet: DocumentNode = gql`
  mutation CreateTweet($body: String) {
    createTweet(body: $body) {
      id
    }
  }
`;

export const SubscComment: DocumentNode = gql`
  subscription SubscComment($repoFullName: String!) {
    commentAdded(repoFullName: $repoFullName) {
      id
      content
    }
  }
`;

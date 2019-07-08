import * as Type from "./types";
import * as Node from "./nodes";
import * as ApolloType from "apollo-client";
import ApolloClient from "apollo-client";
export interface ClientClass {
  readonly client: ApolloClient<any>;
}

export class CheckClient implements ClientClass {
  constructor(readonly client: ApolloClient<any>) {}

  tweetAutorBody = (
    options?: Omit<
      ApolloType.QueryOptions<Type.TweetAutorBodyQueryVariables>,
      "query"
    >
  ) =>
    this.client.query<
      Type.TweetAutorBodyQuery,
      Type.TweetAutorBodyQueryVariables
    >({ ...options, ...{ query: Node.TweetAutorBody } });
}

export class TweetClient implements ClientClass {
  constructor(readonly client: ApolloClient<any>) {}

  tweetMeta = (
    options?: Omit<
      ApolloType.QueryOptions<Type.TweetMetaQueryVariables>,
      "query"
    >
  ) =>
    this.client.query<Type.TweetMetaQuery, Type.TweetMetaQueryVariables>({
      ...options,
      ...{ query: Node.TweetMeta }
    });

  tweet = (
    options?: Omit<ApolloType.QueryOptions<Type.TweetQueryVariables>, "query">
  ) =>
    this.client.query<Type.TweetQuery, Type.TweetQueryVariables>({
      ...options,
      ...{ query: Node.Tweet }
    });

  createTweet = (
    options?: Omit<
      ApolloType.MutationOptions<
        Type.CreateTweetMutation,
        Type.CreateTweetMutationVariables
      >,
      "mutation"
    >
  ) =>
    this.client.mutate<
      Type.CreateTweetMutation,
      Type.CreateTweetMutationVariables
    >({ ...options, ...{ mutation: Node.CreateTweet } });

  subscComment = (
    options?: Omit<
      ApolloType.SubscriptionOptions<Type.SubscCommentSubscriptionVariables>,
      "query"
    >
  ) =>
    this.client.subscribe<
      Type.SubscCommentSubscription,
      Type.SubscCommentSubscriptionVariables
    >({ ...options, ...{ query: Node.SubscComment } });
}

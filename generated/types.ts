export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: "Comment";
  id?: Maybe<Scalars["String"]>;
  content?: Maybe<Scalars["String"]>;
};

export type Meta = {
  __typename?: "Meta";
  count?: Maybe<Scalars["Int"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  createTweet?: Maybe<Tweet>;
  deleteTweet?: Maybe<Tweet>;
  markTweetRead?: Maybe<Scalars["Boolean"]>;
};

export type MutationCreateTweetArgs = {
  body?: Maybe<Scalars["String"]>;
};

export type MutationDeleteTweetArgs = {
  id: Scalars["ID"];
};

export type MutationMarkTweetReadArgs = {
  id: Scalars["ID"];
};

export type Notification = {
  __typename?: "Notification";
  id?: Maybe<Scalars["ID"]>;
  date?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  Tweet?: Maybe<Tweet>;
  Tweets?: Maybe<Array<Maybe<Tweet>>>;
  TweetsMeta?: Maybe<Meta>;
  User?: Maybe<User>;
  Notifications?: Maybe<Array<Maybe<Notification>>>;
  NotificationsMeta?: Maybe<Meta>;
};

export type QueryTweetArgs = {
  id: Scalars["ID"];
};

export type QueryTweetsArgs = {
  limit?: Maybe<Scalars["Int"]>;
  skip?: Maybe<Scalars["Int"]>;
  sort_field?: Maybe<Scalars["String"]>;
  sort_order?: Maybe<Scalars["String"]>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type QueryNotificationsArgs = {
  limit?: Maybe<Scalars["Int"]>;
};

export type Stat = {
  __typename?: "Stat";
  views?: Maybe<Scalars["Int"]>;
  likes?: Maybe<Scalars["Int"]>;
  retweets?: Maybe<Scalars["Int"]>;
  responses?: Maybe<Scalars["Int"]>;
};

export type Subscription = {
  __typename?: "Subscription";
  commentAdded?: Maybe<Comment>;
};

export type SubscriptionCommentAddedArgs = {
  repoFullName: Scalars["String"];
};

export type Tweet = {
  __typename?: "Tweet";
  id: Scalars["ID"];
  body?: Maybe<Scalars["String"]>;
  date?: Maybe<Scalars["String"]>;
  Author?: Maybe<User>;
  Stats?: Maybe<Stat>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  username?: Maybe<Scalars["String"]>;
  first_name?: Maybe<Scalars["String"]>;
  last_name?: Maybe<Scalars["String"]>;
  full_name?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  avatar_url?: Maybe<Scalars["String"]>;
};
export type TweetAutorBodyQueryVariables = {
  id: Scalars["ID"];
};

export type TweetAutorBodyQuery = { __typename?: "Query" } & {
  Tweet: Maybe<
    { __typename?: "Tweet" } & Pick<Tweet, "body"> & {
        Author: Maybe<{ __typename?: "User" } & Pick<User, "username">>;
      }
  >;
};

export type TweetMetaQueryVariables = {};

export type TweetMetaQuery = { __typename?: "Query" } & {
  TweetsMeta: Maybe<{ __typename?: "Meta" } & Pick<Meta, "count">>;
};

export type TweetQueryVariables = {
  id: Scalars["ID"];
};

export type TweetQuery = { __typename?: "Query" } & {
  Tweet: Maybe<
    { __typename?: "Tweet" } & Pick<Tweet, "body" | "date"> & {
        Author: Maybe<{ __typename?: "User" } & Pick<User, "full_name">>;
      }
  >;
};

export type CreateTweetMutationVariables = {
  body?: Maybe<Scalars["String"]>;
};

export type CreateTweetMutation = { __typename?: "Mutation" } & {
  createTweet: Maybe<{ __typename?: "Tweet" } & Pick<Tweet, "id">>;
};

export type SubscCommentSubscriptionVariables = {
  repoFullName: Scalars["String"];
};

export type SubscCommentSubscription = { __typename?: "Subscription" } & {
  commentAdded: Maybe<
    { __typename?: "Comment" } & Pick<Comment, "id" | "content">
  >;
};

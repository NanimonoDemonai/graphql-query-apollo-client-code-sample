# graphql-query-apollo-client-code-sample
convert graphql query to typed apollo client class

GraphQLのクエリーを書けば、上手に型をつけてApolloClientでクエリを飛ばすやつを自動で生成したいと思ったので、Typescriptを書き出すJavascriptを書いた

### 1.スキーマの例
こんなスキーマがあるとして、

```Graphql:schema.graphql
type Tweet {
  id: ID!
  body: String
  date: String
  Author: User
  Stats: Stat
}

type User {
  id: ID!
  username: String
  first_name: String
  last_name: String
  full_name: String
  name: String @deprecated
  avatar_url: String
}

type Stat {
  views: Int
  likes: Int
  retweets: Int
  responses: Int
}

type Notification {
  id: ID
  date: String
  type: String
}

type Meta {
  count: Int
}

type Comment {
  id: String
  content: String
}

type Query {
  Tweet(id: ID!): Tweet
  Tweets(limit: Int, skip: Int, sort_field: String, sort_order: String): [Tweet]
  TweetsMeta: Meta
  User(id: ID!): User
  Notifications(limit: Int): [Notification]
  NotificationsMeta: Meta
}

type Mutation {
  createTweet(body: String): Tweet
  deleteTweet(id: ID!): Tweet
  markTweetRead(id: ID!): Boolean
}

type Subscription {
  commentAdded(repoFullName: String!): Comment
}
```

**参考:** https://github.com/marmelab/GraphQL-example/blob/master/schema.graphql

### 2.クエリの例
こんなクエリを書いたgraphqlファイルを作るとする。

```graphql:tweet.graphql
query TweetMeta {
  TweetsMeta {
    count
  }
}

query Tweet($id: ID!) {
  Tweet(id: $id) {
    body
    date
    Author {
      full_name
    }
  }
}

mutation CreateTweet($body: String) {
  createTweet(body: $body) {
    id
  }
}

subscription SubscComment($repoFullName: String!) {
  commentAdded(repoFullName: $repoFullName) {
    id
    content
  }
}
```

### 3. 生成例
するとこんな感じに`ts`を吐いてくれる。（監視対象の`.graphql`ごとにクラスを生やしてくれる）

```ts:generated/class.ts
import * as Type from "./types";
import * as Node from "./nodes";
import * as ApolloType from "apollo-client";
import ApolloClient from "apollo-client";
export interface ClientClass {
  readonly client: ApolloClient<any>;
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
```

### 4. 使い道

gqlタグとか書かずに、補完バリバリで気持ちよく書ける。嬉しい。

```ts:main.ts
import { TweetClient } from "./generated/class";
import ApolloClient from "apollo-boost";
import "isomorphic-fetch";

const client = new TweetClient(
  new ApolloClient({ uri: "http://localhost:4000/" })
);

async function main() {
  const hoge = await client.tweetMeta();
  console.log(JSON.stringify(hoge.data.TweetsMeta));

  const huga = await client.createTweet({
    variables: {
      body: "aaa"
    }
  });
  //dataはnullチェックしないと怒られる
  console.log(JSON.stringify(huga.data && huga.data.createTweet));

  const piyo = await client.tweet({ variables: { id: "hoga" } });
  console.log(JSON.stringify(piyo.data));
}

main();
```

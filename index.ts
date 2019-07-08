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

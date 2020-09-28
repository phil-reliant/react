import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./assets/scss/index.scss";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { createHttpLink } from "apollo-link-http";
import { render } from "react-dom";
import {
  IntrospectionFragmentMatcher,
  InMemoryCache
} from "apollo-cache-inmemory";
import introspectionQueryResultData from "./apollo-schema/json/fragmentTypes.json";
import App from "./App";

const env = process.env.NODE_ENV;
let uriMod = `dev`;
if (env === `production`) {
	uriMod = `test`;
}

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
});
const httpLink = createHttpLink({
  uri: `https://cms.reliant-technology.com/graphql`
});
const cache = new InMemoryCache({ fragmentMatcher });
const client = new ApolloClient({
  cache,
  link: httpLink,
  credentials: "include"
});

render(
	<Router>
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	</Router>,
	document.getElementById("root")
);

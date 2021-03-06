import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import App from './app';

const networkInterface = createNetworkInterface('/graphql');

// Use middleware to append the file to the post request somehow
networkInterface.use([{
  applyMiddleware(req, next) {
    console.log(req);
    next();
  },
}]);

const client = new ApolloClient({
  networkInterface,
});

Meteor.startup(() => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    , document.getElementById('render-target'));
});

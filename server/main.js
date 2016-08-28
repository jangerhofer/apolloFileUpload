import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';

const typeDefs = `
type fileMetadata {
  originalname : String
  mimetype : String
  encoding : String
  destination : String
  filename : String
  path : String
  size : Int
}

type RootQuery {
  test : String
}

type RootMutation {
  uploadFile(fileSaveName : String) : fileMetadata
}

schema {
  query : RootQuery
  mutation : RootMutation
}
`;

const resolvers = {
  RootMutation: {
    uploadFile: (root, args) => {
      // Do something with root.file.buffer here
      // e.g. fs.writeFile(args.fileSaveName, root.file.buffer)
      console.log('Query arguments:', args);
      return root.file;
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

let graphQLServer = express();

// Configure multer to accept a single file per post
const storage = multer.memoryStorage();
graphQLServer.use(multer({
  storage,
}).single('file'));

graphQLServer.use('/graphql', bodyParser.json(), apolloExpress((req) => ({
  schema,
  rootValue: req,
})
));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

WebApp.connectHandlers.use(Meteor.bindEnvironment(graphQLServer));

import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';
import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';
import fs from 'fs';

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

type Query {
  randomNum : Int
}

type Mutation {
  uploadFile(fileSaveName : String = "test", fileBase : String) : fileMetadata
}

schema {
  query : Query
  mutation : Mutation
}
`;

const resolvers = {
  Query: {
    randomNum: () => Math.floor((Math.random() * 100) + 1),
  },
  Mutation: {
    uploadFile: (root, args) => {
      var base64Data = args.fileBase.replace(/^data:image\/png;base64,/, '');

      fs.writeFile('savedFile.png', base64Data, 'base64', function (err) {
        console.log(err);
      });
      return;
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

graphQLServer.use('/graphql', bodyParser.json({ limit: '50mb' }), apolloExpress((req) => {
  console.log(req.body);
  return {
    schema,
    rootValue: req,
  };
}
));

graphQLServer.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

WebApp.connectHandlers.use(Meteor.bindEnvironment(graphQLServer));

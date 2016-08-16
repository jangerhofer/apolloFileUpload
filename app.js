import { apolloExpress, graphiqlExpress } from 'apollo-server'
import { makeExecutableSchema } from 'graphql-tools';
import multer from 'multer'
import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'

// Create schema
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
`

const resolvers = {
    RootMutation: {
        uploadFile: (root, args, context) => {
            // Do something with root.file.buffer here
            // e.g. fs.writeFile(args.fileSaveName, root.file.buffer)

            // Return file metdata
            return root.file
        }
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

var app = express()
app.use(bodyParser.json())

// Configure multer to accept a single file per post
const storage = multer.memoryStorage();
app.use(multer({
    storage
}).single('file'));

app.use('/graphql', apolloExpress((req) => {
    return {
        schema,
        rootValue: req
    }
}))

app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
}));

app.listen(3000)

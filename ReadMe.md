# Apollo File Upload Example
##### A little demo of how Apollo Server can handle file uploads.

This demo uses [Apollo Server](http://docs.apollostack.com/apollo-server/) and [Multer](https://github.com/expressjs/multer) to show one way to handle file uploads to an Apollo app.  It is adapted from [the tests](https://github.com/graphql/express-graphql/blob/0bf6aac9ec1c02d42f5de93ff068182c304d56a4/src/__tests__/http-test.js#L676) written for Express-GraphQL.

## Usage
  - After installing the dependencies, run `npm run build` to do a quick Babel compile.
  - `npm start` will start the Express+GraphQL server.
  - Post to `localhost:3000` with something along the lines of these fields:
    - `query` : `mutation newFile($fileName : String) {   uploadFile(fileSaveName : $fileName) { originalname, mimetype}}`
    - `operationName` : `newFile`
    - `variables` : `{"fileName": "SaveNameForNewFile"}`
    - `file` : Attach a file to be uploaded.
    This is most easily done using a "REST Client" like [Postman](https://www.getpostman.com/).
  - The file will be saved in the project root directory under whatever filename is provided in the variable "fileName".

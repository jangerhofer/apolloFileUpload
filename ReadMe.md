# Apollo File Upload Example
##### A little demo of how Apollo Server can handle file uploads.

This demo uses [Meteor](https://www.meteor.com/), [Apollo Client+Server](http://apollostack.com/) and [Multer](https://github.com/expressjs/multer) to show one way to handle file uploads to an Apollo app.  It is adapted from [the tests](https://github.com/graphql/express-graphql/blob/0bf6aac9ec1c02d42f5de93ff068182c304d56a4/src/__tests__/http-test.js#L676) written for Express-GraphQL.

## Usage
  - After installing the dependencies, run `meteor` to get up and running.
  - Post to `localhost:3000/graphql` with something along the lines of these post body key/value pairs:
    - `query` : `mutation newFile($fileName : String) {   uploadFile(fileSaveName : $fileName) { originalname, mimetype}}`
    - `operationName` : `newFile`
    - `variables` : `{"fileName": "SaveNameForNewFile"}`
    - `file` : Attach a file to be uploaded.
    This is most easily done using a "REST Client" like [Postman](https://www.getpostman.com/).
  - **In the future**, the file upload field currently in the UI should hook into Apollo Client and perform the upload.  At the moment, that file uploader is pretty useless.

#### Example Postman request.
![An example request.](/exampleRequest.png)

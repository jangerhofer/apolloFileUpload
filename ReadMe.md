# Apollo File Upload Example
##### A little demo of how Apollo Server can handle file uploads.

This demo uses [Meteor](https://www.meteor.com/) and [Apollo Client+Server](http://apollostack.com/) to show a functional, though less than ideal, way to handle file uploads to an Apollo app.  It is adapted from [the tests](https://github.com/graphql/express-graphql/blob/0bf6aac9ec1c02d42f5de93ff068182c304d56a4/src/__tests__/http-test.js#L676) written for Express-GraphQL.

## Usage
  - After installing the dependencies, run `meteor` to get up and running.
  - Open `localhost:3000` and drag a `PNG` file to the "Upload File" box.
  - Check `.meteor/local/build/programs/server/savedFile.png` to see your uploaded image.

## WARNING
  This is a _very_ hacky solution. This method was just the result of frustration in making Multer play nicely with Apollo.  It encodes the uploaded file into Base64 and then uses the encoding as a string-argument to Apollo.  This is really quite a lot less than ideal for a number of reasons, including the transfer size, lack of 'resume' functionality, and the loss of metadata.  You could recreate that metadata with mutation arguments, but it would still be a terrible way to handle uploads.

#### Example Postman request.
![An example request.](/exampleRequest.png)

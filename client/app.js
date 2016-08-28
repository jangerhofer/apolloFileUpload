import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import FileInput from 'react-file-input';

// App component - represents the whole app
class App extends Component {

  fileHandler(e) {
    console.log('File to upload: ', e.target.files[0]);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    const someVar = this;
    reader.addEventListener('load', function () {
      let encodedFile = reader.result;
      someVar.props.mutate({ variables: { fileName: 'NOT A TEST', encoding: encodedFile } });
    }, false);
  }

  render() {
    return (
      <div>
        <p>Random number: {this.props.data.randomNum}</p>
        <hr />
        <form>
        <FileInput
          name="fileUpload"
          accept=".png"
          placeholder="Upload File"
          onChange={this.fileHandler.bind(this)}
        />
      </form>
      </div>
    );
  }
}

const GET_NUM = gql`
  query getRandNum {
    randomNum
  }
`;
const withNum = graphql(GET_NUM);
const AppWithNum = withNum(App);

const UPLOAD_FILE = gql`
  mutation upload($fileName : String, $encoding : String!) {
    uploadFile(fileSaveName : $fileName, fileBase : $encoding) {
      size
    }
  }
`;
const withFileMutation = graphql(UPLOAD_FILE);
const AppWithData = withFileMutation(AppWithNum);

export default AppWithData;

App.propTypes = {
  data: React.PropTypes.object,
};

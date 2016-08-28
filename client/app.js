import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import FileInput from 'react-file-input';

// App component - represents the whole app
class App extends Component {

  fileHandler(e) {
    console.log('File to upload: ', e.target.files[0]);
  }

  render() {
    return (
      <div>
        <p>Random number: {this.props.data.randomNum}</p>
        <hr />
        <form>
        <FileInput
          name="myImage"
          accept="*"
          placeholder="Upload File"
          className="inputClass"
          onChange={this.fileHandler}
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
const AppWithData = withNum(App);

export default AppWithData;

App.propTypes = {
  data: React.PropTypes.object,
};

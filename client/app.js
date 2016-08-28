import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

// App component - represents the whole app
class App extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <div>Hi, there!</div>
        <p>Random number: {this.props.data.randomNum}</p>
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

import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Feedback from '../Feedback/Feedback';
import CodeInput from '../CodeInput/CodeInput';
import TestOutput from '../TestOutput/TestOutput';
import Server from './Connection/Server';

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.server = new Server();
    this.state = {
      repairs: [],
      loading: false,
      failedTest: '',
      obtained: '',
      expected: '',
      studentCode: ''
    };
  }

  componentDidUpdate(props) {
    if (props.assignment !== this.props.assignment) {
      this.resetState();
    }
  }

  resetState = () => {
    const state = {
      repairs: [],
      loading: false,
      failedTest: '',
      obtained: '',
      expected: '',
      studentCode: ''
    };

    this.setState(state);
  }

  assertCode = (studentCode) => {
    this.toggleLoader();
    this.setStudentCode(studentCode);

    const submission = {
      register: 'defaultUser',
      studentCode: studentCode,
      assignment: this.props.assignment
    };

    this.server.assert(submission, this);
  }

  assertHandler(result) {
    if (result.syntaxError) {
      this.toggleLoader();
      this.props.syntaxError();
      return;
    }

    if (result.isCorrect) {
      this.toggleLoader();
      this.props.modalCongrats();
    } else {
      const callback = this.repairHandler;
      this.server.repairCode(result, callback);
      this.showTestOutput(result);
    }
  }

  showTestOutput = (assert) => {
    this.setState({
      expected: assert.expected,
      obtained: assert.obtained,
      failedTest: assert.failedTest
    });
  }

  repairHandler = (result) => {
    this.toggleLoader();

    if (result.repaired) {
      this.setRepairs(result.repairs)
    } else {
      this.props.repairsFail()
    }
  }

  setRepairs = (repairs) => {
    this.setState({ repairs: repairs });
  }

  setStudentCode = (studentCode) => {
    this.setState({ studentCode: studentCode });
  }

  toggleLoader = () => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  render() {
    const currentCode = this.state.studentCode ?
      this.state.studentCode : this.props.initialCode

    return (
      <div>
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={8}>
              <CodeInput
                studentCode={currentCode}
                assertCode={this.assertCode}
                isLoading={this.state.loading} />
            </Grid.Column>

            <Grid.Column width={8}>
              <Grid.Row>
                <TestOutput failedTest={this.state.failedTest}
                  obtained={this.state.obtained}
                  expected={this.state.expected} />
              </Grid.Row>
              <br />

              <Grid.Row>
                <Feedback repairs={this.state.repairs} />
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Workspace;
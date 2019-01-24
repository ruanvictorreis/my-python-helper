import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header/Header';
import Selection from './Selection/Selection';
import Descriptor from './Descriptor/Descriptor';
import CodeInput from './CodeInput/CodeInput';
import TestOutput from './TestOutput/TestOutput';
import { Grid } from 'semantic-ui-react';

class App extends Component {
  state = {
    assignment: 'sum_of_squares',
    server: '18.231.184.37',
    description: '',
    studentCode: '',
    failedTest: '',
    obtained: '',
    expected: '',
    loading: false,
  }

  componentDidMount() {
    const { assignment } = this.state;
    this.setDescription(assignment);
    this.getCodeLayout(assignment);
  }

  setAssignment = (e, { assignment }) => {
    this.setState({ assignment: assignment });
    this.setDescription(assignment);
    this.getCodeLayout(assignment);
  }

  setDescription = (assignment) => {
    axios.get(`data/assignment/${assignment}.txt`)
      .then((response) => {
        this.setState({ description: response.data })
      });
  }

  getCodeLayout = (assignment) => {
    axios.get(`data/initial/${assignment}.py`)
      .then((response) => {
        this.setStudentCode(response.data)
      });
  }

  toggleLoading() {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  submitCode = (studentCode) => {
    this.setStudentCode(studentCode);
    this.toggleLoading();

    var submission = {
      register: 'default',
      studentCode: studentCode,
      assignment: this.state.assignment
    };

    this.assert(submission);
  }

  setStudentCode = (newCode) => {
    this.setState({ studentCode: newCode });
  }

  assert = (submission) => {
    const output = this.startTestOutput;

    axios.post(`http://${this.state.server}:8081/api/assert/`, submission)
      .then(function (response) {

        const assertResult = response.data;

        if (assertResult.isCorrect) {
          // Correct
        } else {
          output(assertResult);
        }
      });
  }

  startTestOutput = (assertResult) => {
    this.setState({
      expected: assertResult.expected,
      obtained: assertResult.obtained,
      failedTest: assertResult.failedTest,
    });

    this.toggleLoading();
  }

  render() {
    return (
      <div>
        <Header title='My Python Helper' imageSrc='./logo.png' />

        <Grid centered style={{ margin: '5.0em' }}>
          <Grid.Row>
            <Selection changeSelection={this.setAssignment}
              selection={this.state.assignment} />
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={14}>
              <Descriptor description={this.state.description} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={7}>
              <CodeInput studentCode={this.state.studentCode}
                submitCode={this.submitCode} isLoading={this.state.loading} />
            </Grid.Column>

            <Grid.Column width={7}>
              <TestOutput failedTest={this.state.failedTest}
                obtained={this.state.obtained}
                expected={this.state.expected} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;

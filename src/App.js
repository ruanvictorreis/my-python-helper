import React, { Component } from 'react';
import axios from 'axios';
import AlertContainer from 'react-alert';
import MenuBar from './MenuBar/MenuBar';
import Selection from './Selection/Selection';
import Descriptor from './Descriptor/Descriptor';
import CodeInput from './CodeInput/CodeInput';
import TestOutput from './TestOutput/TestOutput';
import Feedback from './Feedback/Feedback';
import { Grid } from 'semantic-ui-react';
import Congrats from './Congrats/Congrats';

class App extends Component {
  state = {
    assignment: 'sum_of_squares',
    server: '18.231.184.37',
    description: '',
    studentCode: '',
    failedTest: '',
    obtained: '',
    expected: '',
    repairs: [],
    loading: false,
    showCongrats: false,
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

  setRepairs = (repairs) => {
    this.setState({ repairs: repairs });
  }

  setDescription = (assignment) => {
    axios.get(`data/assignment/${assignment}.txt`)
      .then((response) => {
        this.setState({ description: response.data })
      });
  }

  setStudentCode = (newCode) => {
    this.setState({ studentCode: newCode });
  }

  getCodeLayout = (assignment) => {
    axios.get(`data/initial/${assignment}.py`)
      .then((response) => {
        this.setStudentCode(response.data)
      });
  }

  toggleLoader = () => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  toggleCongrats = () => {
    const { showCongrats } = this.state;
    this.setState({ showCongrats: !showCongrats });
  }

  submitCode = (studentCode) => {
    this.setStudentCode(studentCode);
    this.toggleLoader();

    var submission = {
      register: 'default',
      studentCode: studentCode,
      assignment: this.state.assignment
    };

    this.assertSubmission(submission);
  }

  assertSubmission = (submission) => {
    const { toggleLoader, toggleCongrats,
      showTestOutput, repairsGeneration } = this;

    axios.post(`http://${this.state.server}:8081/api/assert/`, submission)
      .then(function (response) {
        const assertResult = response.data;

        if (assertResult.isCorrect) {
          toggleCongrats();
          toggleLoader();
        } else {
          showTestOutput(assertResult);
          repairsGeneration(assertResult);
        }
      });
  }

  showTestOutput = (assertResult) => {
    if (assertResult.syntaxError) {
      this.syntaxError();
      this.toggleLoader();
      return;
    }

    this.setState({
      expected: assertResult.expected,
      obtained: assertResult.obtained,
      failedTest: assertResult.failedTest,
    });
  }

  repairsGeneration = (submission) => {
    if (submission.syntaxError) {
      return;
    }

    const { toggleLoader, setRepairs, repairsFail } = this;

    axios.post(`http://${this.state.server}:8081/api/clara/python/`, submission)
      .then(function (response) {
        const repairResult = response.data
        toggleLoader();

        if (repairResult.isRepaired) {
          setRepairs(repairResult.repairs)
        } else {
          repairsFail()
        }
      });
  }

  syntaxError = () => {
    this.msg.error('Your code has syntax errors');
  }

  repairsFail = () => {
    this.msg.info('We can not repair your code');
  }

  render() {
    const alertOptions = {
      offset: 15,
      position: 'bottom left',
      theme: 'light',
      time: 10000,
      transition: 'scale'
    }

    return (
      <div>
        <MenuBar title='My Python Helper'
          imageSrc='./logo.png' />

        <AlertContainer ref={a => this.msg = a}
          {...alertOptions} />

        <Congrats view={this.state.showCongrats}
          close={this.toggleCongrats} />

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
              <CodeInput
                studentCode={this.state.studentCode}
                submitCode={this.submitCode}
                isLoading={this.state.loading} />
            </Grid.Column>

            <Grid.Column width={7}>
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

export default App;

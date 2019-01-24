import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header/Header'
import Selection from './Selection/Selection'
import Descriptor from './Descriptor/Descriptor'
import CodeInput from './CodeInput/CodeInput'
import { Grid } from 'semantic-ui-react'

class App extends Component {
  state = {
    assignment: 'sum_of_squares',
    description: '',
    studentCode: '',
    loading: false
  }

  componentDidMount() {
    const { assignment } = this.state
    this.setDescription(assignment)
    this.getCodeLayout(assignment)
  }

  setAssignment = (e, { assignment }) => {
    this.setState({ assignment: assignment })
    this.setDescription(assignment)
    this.getCodeLayout(assignment)
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

  toggleLoading(){
    const { loading } = this.state
    this.setState({loading: !loading})
  }

  submitCode = (studentCode) => {
    this.setStudentCode(studentCode)
    this.toggleLoading()
  }

  setStudentCode = (newCode) => {
    this.setState({ studentCode: newCode })
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
                submitCode={this.submitCode} isLoading={this.state.loading}/>
            </Grid.Column>

            <Grid.Column width={7}>
              <h1>Hello World</h1>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;

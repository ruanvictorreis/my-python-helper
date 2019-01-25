import React, { Component } from 'react';
import axios from 'axios';
import AlertContainer from 'react-alert';
import MenuBar from './MenuBar/MenuBar';
import Selection from './Selection/Selection';
import Descriptor from './Descriptor/Descriptor';
import { Grid } from 'semantic-ui-react';
import Congrats from './Congrats/Congrats';
import Workspace from './Workspace/Workspace';

class App extends Component {
  state = {
    assignment: 'sum_of_squares',
    description: '',
    initialCode: '',
    showCongrats: false,
  }

  componentDidMount() {
    const { assignment } = this.state;
    this.setDescription(assignment);
    this.setInitialCode(assignment);
  }

  setAssignment = (e, { assignment }) => {
    this.setState({ assignment: assignment });
    this.setDescription(assignment);
    this.setInitialCode(assignment);
  }

  setDescription = (assignment) => {
    axios.get(`data/assignment/${assignment}.txt`)
      .then((response) => {
        this.setState({ description: response.data })
      });
  }

  setInitialCode = (assignment) => {
    axios.get(`data/initial/${assignment}.py`)
      .then((response) => {
        this.setState({ initialCode: response.data })
      });
  }

  toggleCongrats = () => {
    const { showCongrats } = this.state;
    this.setState({ showCongrats: !showCongrats });
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

        <Congrats show={this.state.showCongrats}
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
            <Grid.Column width={14}>
              <Workspace assignment={this.state.assignment}
                initialCode={this.state.initialCode}
                syntaxError={this.syntaxError}
                repairsFail={this.repairsFail}
                modalCongrats={this.toggleCongrats} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;

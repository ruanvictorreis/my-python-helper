import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header/Header'
import Selection from './Selection/Selection'
import Descriptor from './Descriptor/Descriptor'
import { Grid } from 'semantic-ui-react'

class App extends Component {
  state = {
    selection: 'sum_of_squares',
    description: ''
  }

  componentDidMount() {
    const { selection } = this.state
    this.setDescription(selection)
  }

  setSelection = (e, { assignment }) => {
    this.setState({ selection: assignment })
    this.setDescription(assignment)
  }

  setDescription = (assignment) => {
    axios.get(`data/assignment/${assignment}.txt`)
      .then((response) => {
        this.setState({ description: response.data })
      });
  }

  render() {
    return (
      <div>
        <Header title='My Python Helper' imageSrc='./logo.png' />

        <Grid centered style={{ marginTop: '5.0em' }}>
          <Grid.Row>
            <Selection changeSelection={this.setSelection}
              selection={this.state.selection} />
          </Grid.Row>

          <Grid.Row>
              <Descriptor description={this.state.description} />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;

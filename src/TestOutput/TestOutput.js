import React from 'react';
import { Grid, Segment, Header, Icon, Divider } from 'semantic-ui-react'
import Highlight from 'react-highlight';

const TestOutput = (props) => {
  return (
    <div>
      <Segment>
        <Header as='h4'>
          <Icon name='bug' />
          <Header.Content>Test</Header.Content>
        </Header>

        <Divider />

        <Grid centered>
          <Grid.Column width={8}>
            <Highlight className="python">
              {`# Result:\n${props.failedTest}\n>>> ${props.obtained}`}
            </Highlight>
          </Grid.Column>
          <Grid.Column width={8}>
            <Highlight className="python">
              {`# Expected:\n${props.failedTest}\n>>> ${props.expected}`}
            </Highlight>
          </Grid.Column>
        </Grid>
      </Segment>
    </div>
  );
}

export default TestOutput;
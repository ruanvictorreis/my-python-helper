import React from 'react';
import { Grid, Segment } from 'semantic-ui-react'
import Highlight from 'react-highlight';

const testOutput = (props) => {
  return (
    <div>
      <Segment>
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

export default testOutput;
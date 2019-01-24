import React from 'react';
import Highlight from 'react-highlight';
import { Container, Divider, Segment } from 'semantic-ui-react'

const descriptor = (props) => {

  return (
    <div>
      <Segment>
        <Container textAlign='justified'>
          <b>Problem Description</b>
          <Divider />
          <Highlight className="python">
            {props.description}
          </Highlight>
        </Container>
      </Segment>
    </div>
  );
}

export default descriptor;
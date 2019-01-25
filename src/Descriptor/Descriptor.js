import React from 'react';
import Highlight from 'react-highlight';
import { Container, Divider, Segment, Header, Icon } from 'semantic-ui-react'

const Descriptor = (props) => {

  return (
    <div>
      <Segment>
        <Header as='h4'>
          <Icon name='bullhorn' />
          <Header.Content>Problem Description</Header.Content>
        </Header>

        <Divider />

        <Container textAlign='justified'>
          <Highlight className="python">
            {props.description}
          </Highlight>
        </Container>
      </Segment>
    </div>
  );
}

export default Descriptor;
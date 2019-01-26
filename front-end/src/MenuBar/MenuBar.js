import React from 'react';
import { Menu, Container, Image } from 'semantic-ui-react';

const MenuBar = (props) => {
  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='h3' header>
            <Image size='mini' src={props.imageSrc} style={{ marginRight: '1.5em' }} />
            {props.title}
          </Menu.Item>
        </Container>
      </Menu>
    </div>
  );
}

export default MenuBar;
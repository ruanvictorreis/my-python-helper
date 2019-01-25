import React from 'react';
import { Modal, Icon, Header, Button } from 'semantic-ui-react';

const Congrats = (props) => {
	const inlineStyle = {
		modal: {
			marginTop: '0px !important',
			marginLeft: 'auto',
			marginRight: 'auto'
		}
	};

	return (
		<div>
			<Modal
				size='small'
				open={props.view}
				style={inlineStyle.modal}
				closeOnEscape={false}
				closeOnRootNodeClick={false}>

				<Modal.Header>Congrats!</Modal.Header>

				<Modal.Content image>
					<Icon name="check circle outline" color='teal' size='massive' />
					<Modal.Description>
						<Header>Your code is correct! Now you can try another problems.</Header>
					</Modal.Description>
				</Modal.Content>

				<Modal.Actions>
					<Button color='teal' icon='close' labelPosition='right'
						content="Close"
						onClick={props.close} />
				</Modal.Actions>
			</Modal>
		</div>
	);
}

export default Congrats;
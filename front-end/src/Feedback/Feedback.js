import React from 'react';
import { Segment, Icon, List, Header, Divider } from 'semantic-ui-react'

const Feedback = (props) => {

	let repairsList = null

	if (props.repairs.length > 0) {
		repairsList = props.repairs.map(repair => {
			return (
				<List.Item key={repair} as='a'>
					<Icon name='right triangle' />
					<List.Content>
						<List.Header>{repair}</List.Header>
					</List.Content>
				</List.Item>
			);
		});
	}

	return (
		<div>
			<Segment>
				<Header as='h4'>
					<Icon name='student' />
					<Header.Content>Helper</Header.Content>
				</Header>

				<Divider />

				<List>
					{repairsList}
				</List>
			</Segment>
		</div>
	);
}

export default Feedback
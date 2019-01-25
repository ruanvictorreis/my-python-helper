import React from 'react';
import { Segment, Button, Header, Divider, Icon } from 'semantic-ui-react'
import { UnControlled as CodeMirror } from 'react-codemirror2'
require('codemirror/mode/xml/xml');
require('codemirror/mode/python/python');

const CodeInput = (props) => {
	const options = {
		mode: 'python',
		lineNumbers: true
	};

	var studentCode = props.studentCode

	return (
		<div>
			<Segment>
				<Header as='h4'>
					<Icon name='code' />
					<Header.Content>Your Code</Header.Content>
				</Header>

				<Divider />

				<CodeMirror
					value={studentCode}
					options={options}
					onChange={(editor, data, value) => studentCode = value} />

				<br />

				<Button primary loading={props.isLoading}
					onClick={() => props.submitCode(studentCode)}>
					Submit
       </Button>
			</Segment>
		</div>
	);
}

export default CodeInput;
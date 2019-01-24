import React from 'react';
import { Segment, Button } from 'semantic-ui-react'
import { UnControlled as CodeMirror } from 'react-codemirror2'
require('codemirror/mode/xml/xml');
require('codemirror/mode/python/python');

const codeInput = (props) => {
	const options = {
		mode: 'python',
		lineNumbers: true
	};

	var studentCode = props.studentCode

	return (
		<div>
			<Segment>
				<CodeMirror
					value={studentCode}
					options={options}
					onChange={(editor, data, value) => {
						studentCode = value
					}} />

				<br />

				<Button primary loading={props.isLoading} 
					onClick={() => props.submitCode(studentCode)}>
					Submit
       </Button>
			</Segment>
		</div>
	);
}

export default codeInput;
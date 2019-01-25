import React, { Component } from 'react';
import axios from 'axios';
import { Grid } from 'semantic-ui-react';
import Feedback from '../Feedback/Feedback';
import CodeInput from '../CodeInput/CodeInput';
import TestOutput from '../TestOutput/TestOutput';

class Workspace extends Component {
	constructor(props) {
		super(props);
		this.state = {
			repairs: [],
			loading: false,
			failedTest: '',
			obtained: '',
			expected: '',
			studentCode: '',
			server: '18.231.184.37',
		}
	}

	componentDidUpdate(props) {
		if (props.assignment !== this.props.assignment) {
			this.reset();
		}
	}

	reset = () => {
		const state = {
			repairs: [],
			loading: false,
			failedTest: '',
			obtained: '',
			expected: '',
			studentCode: ''
		};

		this.setState(state);
	}

	submitCode = (studentCode) => {
		this.toggleLoader();
		this.setStudentCode(studentCode);

		const submission = {
			register: 'default',
			studentCode: studentCode,
			assignment: this.props.assignment
		};

		this.assertSubmission(submission);
	}

	assertSubmission = (submission) => {
		const { modalCongrats } = this.props;
		const { toggleLoader, showTestOutput, repairsGeneration } = this;

		axios.post(`http://${this.state.server}:8081/api/assert/`, submission)
			.then(function (response) {
				const result = response.data;

				if (result.isCorrect) {
					toggleLoader();
					modalCongrats();
				} else {
					showTestOutput(result);
					repairsGeneration(result);
				}
			});
	}

	showTestOutput = (asserts) => {
		if (asserts.syntaxError) {
			this.props.syntaxError();
			this.toggleLoader();
			return;
		}

		this.setState({
			expected: asserts.expected,
			obtained: asserts.obtained,
			failedTest: asserts.failedTest,
		});
	}

	repairsGeneration = (submission) => {
		if (submission.syntaxError) {
			return;
		}

		const { toggleLoader, setRepairs } = this;
		const { repairsFail } = this.props;

		axios.post(`http://${this.state.server}:8081/api/clara/python/`, submission)
			.then(function (response) {
				const result = response.data
				toggleLoader();

				if (result.isRepaired) {
					setRepairs(result.repairs)
				} else {
					repairsFail()
				}
			});
	}

	setRepairs = (repairs) => {
		this.setState({ repairs: repairs });
	}

	setStudentCode = (studentCode) => {
		this.setState({ studentCode: studentCode });
	}

	toggleLoader = () => {
		const { loading } = this.state;
		this.setState({ loading: !loading });
	}

	render() {
		const currentCode = this.state.studentCode !== '' ?
			this.state.studentCode : this.props.initialCode

		return (
			<div>
				<Grid centered>
					<Grid.Row>
						<Grid.Column width={8}>
							<CodeInput
								studentCode={currentCode}
								submitCode={this.submitCode}
								isLoading={this.state.loading} />
						</Grid.Column>

						<Grid.Column width={8}>
							<Grid.Row>
								<TestOutput failedTest={this.state.failedTest}
									obtained={this.state.obtained}
									expected={this.state.expected} />
							</Grid.Row>
							<br />

							<Grid.Row>
								<Feedback repairs={this.state.repairs} />
							</Grid.Row>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default Workspace;
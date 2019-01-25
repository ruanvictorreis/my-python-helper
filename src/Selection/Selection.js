import React from 'react';
import { Button } from 'semantic-ui-react'

const Selection = (props) => {
	const fibonacci = 'fibonacci'
	const sumOfSquares = 'sum_of_squares'
	const isPrimeNumber = 'is_prime_number'

	return (
		<div>
			<Button.Group size='medium'>
				<Button basic assignment={sumOfSquares}
					onClick={props.changeSelection}
					color={props.selection === sumOfSquares ? 'black' : 'grey'}>
					Sum of Squares
					</Button>

				<Button basic assignment={isPrimeNumber}
					onClick={props.changeSelection}
					color={props.selection === isPrimeNumber ? 'black' : 'grey'}>
					Prime Numbers
					</Button>

				<Button basic assignment={fibonacci}
					onClick={props.changeSelection}
					color={props.selection === fibonacci ? 'black' : 'grey'}>
					Fibonacci
					</Button>
			</Button.Group>
		</div>
	);
}

export default Selection;
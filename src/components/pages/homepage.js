import React, { Component } from 'react'
import Observer from 'react-intersection-observer'
import Puppy from '../Puppy'

class Homepage extends Component {
	render() {
		return (
			<div>
				<Puppy src="./images/puppy-0.jpg" />
				<Puppy src="./images/puppy-1.jpg" />
				<Puppy src="./images/puppy-2.jpg" />
				<Puppy src="./images/puppy-3.jpg" />
				<Puppy src="./images/puppy-4.jpg" />
				<Puppy src="./images/puppy-5.jpg" />
			</div>
		)
	}
}

export default Homepage

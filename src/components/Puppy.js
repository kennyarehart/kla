import React, { Component } from 'react'
import Observer from 'react-intersection-observer'

class Puppy extends Component {
	state = {
		visibility: 'hidden',
		show: false
	}

	handleChange = inView => {
		console.log('handleChange()', inView, this)

		this.setState({
			visibility: inView ? 'visible' : 'invisible',
			show: inView
		})
	}

	render() {
		let img
		console.log(this.state)
		if (this.state.show) {
			console.log('add it')
			img = <img src={this.props.src} />
		}
		return (
			<div>
				<Observer onChange={this.handleChange} triggerOnce={true}>
					<div className={`box ${this.state.visibility}`}>{img}</div>
				</Observer>
			</div>
		)
	}
}

export default Puppy

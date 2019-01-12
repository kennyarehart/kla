import React, { Component } from 'react'
import engagement from '../../images/engagement.jpg'

class Homepage extends Component {
	render() {
		return (
			<div className="home-page">
				<h2>We're getting married!!!</h2>
				<img src={engagement} className="large-img postcard" alt="engagement" />
				<br />
			</div>
		)
	}
}

export default Homepage

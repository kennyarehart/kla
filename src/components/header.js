import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import logo from '../logo.svg'
import Device from './device'

class Header extends Component {
	render() {
		return (
			<div className="App-header">
				<Link to="/">
					<h1>
						Ashley Weber +<br className="mobile-br" /> Kenny Arehart
					</h1>
				</Link>
				{/*
				<img src={logo} className="App-logo" alt="logo" />
				*/}
				{Device.type === 'mobile' ? null : (
					<nav>
						{/* <Link to="/">Home / Our Story</Link> */}
						<Link to="/when-where">When & Where</Link>
						<Link to="/accomodation">Accomodations</Link>
						{/* <Link to="/registry">Registry</Link>
						<Link to="/in-town">Fun in Oregon</Link>
						<Link to="/gallery">Gallery</Link> */}
					</nav>
				)}
			</div>
		)
	}
}

export default Header

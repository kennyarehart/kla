import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import logo from '../logo.svg'

class Header extends Component {
	render() {
		return (
			<div className="App-header">
				<h1>Ashley Weber + Kenny Arehart</h1>
				{/*
				<img src={logo} className="App-logo" alt="logo" />
				*/}
				<nav>
					<Link to="/">Home / Our Story</Link>
					<Link to="/when-where">When & Where</Link>
					<Link to="/accomodation">Accomodations</Link>
					{/* <Link to="/registry">Registry</Link>
					<Link to="/in-town">Fun in Oregon</Link>
					<Link to="/gallery">Gallery</Link> */}
				</nav>
			</div>
		)
	}
}

export default Header

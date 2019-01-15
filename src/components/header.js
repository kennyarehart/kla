import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Device from './device'
import siteData from '../data/siteData.json'

class Header extends Component {
	createLinks = () => {
		return siteData.sections.active.map((val, i) => {
			return (
				<Link to={val.path} key={i}>
					{val.label}
				</Link>
			)
		})
	}
	render() {
		return (
			<div className="App-header">
				<Link to="/">
					<h1>
						Ashley Weber +<br className="mobile-br" /> Kenny Arehart
					</h1>
				</Link>
				{Device.type === 'mobile' ? null : <nav>{this.createLinks()}</nav>}
			</div>
		)
	}
}

export default Header

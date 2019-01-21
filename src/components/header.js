import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Device from './fat/lib/Device'
import siteData from '../data/siteData.json'

import ScrollWatcher from '../js/ScrollWatcher'

class Header extends Component {
	componentDidMount() {
		const T = this
		ScrollWatcher.register(T.scrollRef, 'lock')
	}

	createLinks() {
		return siteData.sections.active.map((val, i) => {
			return (
				<Link to={val.path} key={i}>
					{val.label}
				</Link>
			)
		})
	}

	render() {
		const title = (
			<h1>
				Ashley Weber +<br className="mobile-br" /> Kenny Arehart
			</h1>
		)
		let mock = null
		let nav = null
		if (Device.type === 'mobile') {
			mock = title
		} else {
			mock = <Link to="/">{title}</Link>
			nav = <nav>{this.createLinks()}</nav>
		}

		return (
			<div className="App-header" ref={div => (this.scrollRef = div)}>
				{mock}
				{nav}
			</div>
		)
	}
}

export default Header

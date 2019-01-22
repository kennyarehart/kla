import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Device from '../js/fat/lib/Device'
import siteData from '../data/siteData.json'
import ScrollWatcher from '../js/ScrollWatcher'
import GlobalManager from '../js/GlobalManager'

class Header extends Component {
	// getSnapshotBeforeUpdate(prevProps, prevState) {
	// 	console.log('BRO')
	// }

	// deprecated. Find alt solution later
	componentWillMount() {
		GlobalManager.registerHeader(this, this.updateMe)
	}

	componentDidMount() {
		const T = this
		ScrollWatcher.register(T.scrollRef, 'lock')
	}

	updateMe(isLocked) {
		const T = this
		if (isLocked) {
			T.scrollRef.classList.add('lock-over')
		} else {
			T.scrollRef.classList.remove('lock-over')
		}
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
		let lock = null
		if (Device.type === 'mobile') {
			mock = title
		} else {
			// lock = 'lock-over'
			mock = <Link to="/">{title}</Link>
			nav = <nav>{this.createLinks()}</nav>
		}

		return (
			<div className="header" id={lock} ref={div => (this.scrollRef = div)}>
				{mock}
				{nav}
			</div>
		)
	}
}

export default Header

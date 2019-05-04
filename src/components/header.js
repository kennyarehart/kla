import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import Device from '../js/fat/lib/Device'
import ScrollWatcher from '../js/ScrollWatcher'
import GlobalManager from '../js/GlobalManager'
import sectionData from '../data/sectionData.json'
import { getHeaderText } from '../js/utils'

class Header extends Component {
	constructor(props) {
		super(props)
		this.txt = ReactHtmlParser(getHeaderText())
	}

	// deprecated. Find alt solution later
	componentWillMount() {
		const T = this
		GlobalManager.registerHeader(T, T.updateMe)
	}

	updateMe(isLocked) {
		const T = this
		if (isLocked) {
			T.scrollRef.classList.add('lock-over')
		} else {
			T.scrollRef.classList.remove('lock-over')
		}
	}

	componentDidMount() {
		const T = this
		ScrollWatcher.register(T.scrollRef, 'lock')
	}

	createLinks() {
		return sectionData.active.map((val, i) => {
			if (val.url) {
				return (
					<a href={val.url} target="_blank" key={i}>
						{val.label}
					</a>
				)
			} else {
				return (
					<Link to={val.path} key={i}>
						{val.label}
					</Link>
				)
			}
		})
	}

	render() {
		const title = <h1>{this.txt}</h1>
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

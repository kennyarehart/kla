import React, { Component } from 'react'
import styles from './styles/index.scss'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/header'
import Homepage from './components/pages/homepage'
import WhenWhere from './components/pages/whenwhere'
import Accomodation from './components/pages/accomodation'
import Registry from './components/pages/registry'
import InTown from './components/pages/in-town'
import Gallery from './components/pages/gallery'
import InfiniteScroll from 'react-infinite-scroller'
import Device from './js/fat/lib/Device'
import sectionData from './data/sectionData.json'
import ScrollWatcher from './js/ScrollWatcher'

console.log(styles)

const classes = { Homepage, WhenWhere, Accomodation, Registry, InTown, Gallery }
function dynamicClass(name) {
	return classes[name]
}

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			hasMoreItems: true,
			count: 0,
			initialCount: 2
		}
		this.sections = []
	}

	componentDidMount() {
		const T = this
		console.log('APP mounted:')
		if (Device.type === 'mobile') {
			window.onscroll = T.handleScroll.bind(T)
		}
	}

	handleScroll(event) {
		// console.log('scroll', window.pageYOffset, window.innerHeight, window.visualViewport.height)
		ScrollWatcher.toggle(window.pageYOffset > window.innerHeight)
	}

	loadItems(page) {
		var T = this
		console.log('loadItems()', page)
		if (T.state.count < sectionData.active.length) {
			T.setState({
				count: page
			})
		} else {
			T.setState({
				hasMoreItems: false
			})
		}
	}

	render() {
		let loader
		let selectedItems = []
		const isMobile = Device.type === 'mobile'
		let header = null
		if (isMobile) {
			loader = (
				<div className="loader" key={'loader'}>
					Loading ...
				</div>
			)
			this.sections = []
			for (var i = 0; i < this.state.count; i++) {
				var item = sectionData.active[i]
				var Temp = dynamicClass(item.class)
				if (i === 1) {
					selectedItems.push(<Header ref={div => (this.headerRef = div)} key="header" />)
					selectedItems.push(<Temp key={item.label} scrollWatch ref={div => (this.postHeaderRef = div)} />)
				} else {
					selectedItems.push(<Temp key={item.label} />)
				}
			}
		} else {
			header = <Header />
			selectedItems = sectionData.active.map((item, i) => {
				return <Route exact path={item.path} component={dynamicClass(item.class)} key={item.label} />
			})
		}
		//basename={'/_staging/'}
		return (
			<Router>
				<div className="App">
					{header}
					<div className="content-container">
						{isMobile ? (
							<InfiniteScroll
								id="scroll-container"
								pageStart={0}
								// initialLoad={false}
								loadMore={this.loadItems.bind(this)}
								hasMore={this.state.hasMoreItems}
								loader={loader}
							>
								<div>{selectedItems}</div>
							</InfiniteScroll>
						) : (
							<div>{selectedItems}</div>
						)}
					</div>
				</div>
			</Router>
		)
	}
}

export default App

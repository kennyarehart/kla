import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/header'
import Homepage from './components/pages/homepage'
import WhenWhere from './components/pages/whenwhere'
import Accomodation from './components/pages/accomodation'
import Registry from './components/pages/registry'
import InTown from './components/pages/in-town'
import Gallery from './components/pages/gallery'

import InfiniteScroll from 'react-infinite-scroller'
import Device from './components/device'
import siteData from './data/siteData.json'

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
	}

	// componentDidMount() {
	// 	console.warn('App Did Mount')
	// 	const script = document.createElement('script')
	// 	script.src = 'https://s0.2mdn.net/ads/studio/cached_libs/draggable_2.0.1_min.js'
	// 	document.body.appendChild(script)
	// }

	loadItems(page) {
		var T = this
		console.log('loadItems()', page)
		// if (page == this.state.initialCount) {
		// 	T.setState({
		// 		hasMoreItems: false
		// 	})
		// }

		if (T.state.count < siteData.sections.active.length) {
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
		if (isMobile) {
			loader = (
				<div className="loader" key={'loader'}>
					Loading ...
				</div>
			)
			for (var i = 0; i < this.state.count; i++) {
				var item = siteData.sections.active[i]
				var Temp = dynamicClass(item.class)
				selectedItems.push(<Temp key={item.label} />)
			}
		} else {
			selectedItems = siteData.sections.active.map((item, i) => {
				return <Route exact path={item.path} component={dynamicClass(item.class)} key={item.label} />
			})
		}
		return (
			<Router>
				<div className="App">
					{/* <Header /> */}
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

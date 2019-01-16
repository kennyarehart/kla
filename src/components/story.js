import React, { Component } from 'react'
import siteData from '../data/siteData.json'
// import Device from './device'

import ProgressiveImage from 'react-progressive-image'
import { TweenLite } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { FrameRate } from './fat'
import { Sine } from 'gsap'

const path = './images/story/'

// add to not get babeled
ScrollToPlugin

class Story extends Component {
	constructor(props) {
		super(props)
		const T = this
		T.state = {
			image: props.placeholder,
			loading: true,
			srcSetData: { srcSet: '', sizes: '' },
			current: 2
		}
		T.galleryRef = null
		T.storyRef = null
		T.scrollTimer = null
		T.hasTouchEnded = false
		T.postScrollTick = 0
		T.frTick = 0
	}

	componentDidMount() {
		const T = this
		window.ontouchstart = T.handleTouchStart.bind(T)
		window.ontouchend = T.handleTouchEnd.bind(T)
		// window.addEventListener(
		// 	'touchmove',
		// 	function(event) {
		// 		event.preventDefault()
		// 	},
		// 	{ passive: false }
		// )
	}

	handleScroll(event) {
		console.log('SCROLL')
		const T = this
		if (T.hasTouchEnded) {
			T.postScrollTick = T.postScrollTick + 1
		}
		// check location for next load
		const mid = window.innerWidth * (T.state.current - 1) - window.innerWidth / 2
		if (T.galleryRef.scrollLeft > mid) {
			if (T.state.current < siteData.story.images.length) {
				T.setState({
					current: T.state.current + 1
				})
			}
			// console.log(T.galleryRef, T.galleryRef.scrollLeft, window.innerWidth)
		}
	}

	handleTouchStart(event) {
		// console.log('START')
		const T = this
		T.postScrollTick = T.frTick = 0
		T.hasTouchEnded = false
	}
	handleTouchEnd(event) {
		// console.log('\t END')
		const T = this
		FrameRate.register(this, this.handleTick, 30)
		T.hasTouchEnded = true

		// // TODO - move this? only needed a fraction of the time
		// if (T.scrollTimer !== null) {
		// 	clearTimeout(T.scrollTimer)
		// }
		// T.scrollTimer = setTimeout(() => {
		// 	console.log('timeout hit')
		// 	T.handleSnap()
		// }, 150)
	}

	handleTick() {
		const T = this
		// console.log('TICK', T.postScrollTick, T.frTick)

		if (T.postScrollTick == T.frTick) {
			FrameRate.unregister(this, this.handleTick, 30)
			// it has stopped scrolling here:
			T.handleSnap()
		}
		T.frTick = T.postScrollTick
	}

	// handleKill(event) {
	// 	event.preventDefault()
	// }

	handleSnap() {
		// console.log('handleSnap()')
		const T = this
		const location = Math.round(T.galleryRef.scrollLeft / window.innerWidth) * window.innerWidth
		const distance = Math.abs(location - T.galleryRef.scrollLeft)
		const center = window.innerWidth / 2
		const maxTime = 1
		const time = (distance / center) * maxTime
		console.log('location:', location, '| distance:', distance, '| time:', time)
		TweenLite.to(T.galleryRef, 1, {
			scrollTo: {
				x: location
			},
			ease: Sine.easeInOut
		})
	}

	render() {
		const images = []
		for (var i = 0; i < this.state.current; i++) {
			const val = siteData.story.images[i]
			images.push(
				<ProgressiveImage src={path + val.mobile} placeholder={path + val.thumb} key={i}>
					{(src, loading) => {
						console.log(src, loading, i)
						return <img style={{ opacity: loading ? 0.2 : 1 }} src={src} alt={val.mobile} />
					}}
				</ProgressiveImage>
			)
		}

		// const text = siteData.story.text.map((val, i) => {
		// 	// console.log(i, val)
		// 	return val.map((obj, k) => {
		// 		return <div key={i + '-' + k}>{obj.text}</div>
		// 	})
		// })
		// console.log('text:', text)

		return (
			<div
				className="story"
				ref={div => (this.storyRef = div)}
				onScroll={this.handleScroll.bind(this)}
				// onTouchStart={this.handleTouchStart.bind(this)}
				// onTouchEnd={this.handleTouchEnd.bind(this)}
			>
				<div className="gallery" ref={div => (this.galleryRef = div)}>
					{images}
					{/* {text} */}
				</div>
			</div>
		)
	}
}

export default Story

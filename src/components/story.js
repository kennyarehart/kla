import React, { Component } from 'react'
import siteData from '../data/siteData.json'
// import Device from './device'

import ProgressiveImage from 'react-progressive-image'
import { TweenLite, TimelineLite } from 'gsap'
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { FrameRate } from './fat'
import { Sine } from 'gsap'

const path = './images/story/'

// add to not get babeled
// ScrollToPlugin

class Story extends Component {
	constructor(props) {
		super(props)
		const T = this
		T.state = {
			image: props.placeholder,
			loading: true,
			srcSetData: { srcSet: '', sizes: '' },
			current: 4
		}
		T.galleryRef = null
		T.storyRef = null
		// T.scrollTimer = null
		// T.hasTouchEnded = false
		// T.postScrollTick = 0
		// T.frTick = 0

		this.tl = new TimelineLite({ paused: true })
		this.tl_images = []
		this.tl_texts = []
		this.tl_count = 0

		this.startX = null
		this.startT = null
	}

	componentDidMount() {
		const T = this
		// window.ontouchstart = T.handleTouchStart.bind(T)
		// window.ontouchend = T.handleTouchEnd.bind(T)
		T.hitbox.ontouchstart = T.handleTouchStart.bind(T)
		T.hitbox.ontouchend = T.handleTouchEnd.bind(T)
		T.hitbox.ontouchmove = T.handleTouchMove.bind(T)

		console.log(this.tl_images)
		console.log(this.tl_texts)
		this.tl_count = 0
		for (var i = 0; i < 3; i++) {
			for (var k = 0; k < 2; k++) {
				var label = 'step' + this.tl_count
				var target = k === 0 ? this.tl_texts : this.tl_images
				this.tl.add(label, this.tl_count)
				// console.log(i, k, target[i], target[i + 1])
				// TODO - add delay or offset for each section
				this.tl.to(target[i], 1, { x: '-=100%' }, label)
				this.tl.to(target[i + 1], 1, { x: '-=100%' }, label)
				this.tl_count++
			}
		}
		this.percentPerSlide = 1 / this.tl_count
	}

	// handleScroll(event) {
	// 	console.log('SCROLL')
	// 	const T = this
	// 	if (T.hasTouchEnded) {
	// 		T.postScrollTick = T.postScrollTick + 1
	// 	}
	// 	// check location for next load
	// 	const mid = window.innerWidth * (T.state.current - 1) - window.innerWidth / 2
	// 	if (T.galleryRef.scrollLeft > mid) {
	// 		if (T.state.current < siteData.story.images.length) {
	// 			T.setState({
	// 				current: T.state.current + 1
	// 			})
	// 		}
	// 		// console.log(T.galleryRef, T.galleryRef.scrollLeft, window.innerWidth)
	// 	}

	// 	// TODO - move this? only needed a fraction of the time
	// 	if (T.scrollTimer !== null) {
	// 		clearTimeout(T.scrollTimer)
	// 	}
	// 	T.scrollTimer = setTimeout(() => {
	// 		console.log('timeout hit')
	// 		T.handleSnap()
	// 	}, 150)
	// }

	handleTouchStart(event) {
		console.log('START', event)
		const T = this
		T.postScrollTick = T.frTick = 0
		T.hasTouchEnded = false

		// T.startT = event.timeStamp
		T.startX = event.changedTouches[0].clientX
		T.startP = T.tl.progress()
	}
	handleTouchEnd(event) {
		console.log('\t END', event)
		const T = this
		// FrameRate.unregister(T, T.handleDrag, 18)

		// FrameRate.register(this, this.handleTick, 30)
		T.hasTouchEnded = true

		// T.endT = event.timeStamp
		// T.endX = event.changedTouches[0].clientX

		// T.distance = T.endX - T.startX
		// T.distancePercentPerSlide = T.distance / window.innerWidth
		// T.distancePercentAll = T.percentPerSlide * T.distancePercentPerSlide

		// T.currentProgress = this.tl.progress()
		// this.tl.progress(-T.distancePercentAll + T.currentProgress)

		// console.warn(T)
		// TODO - tween to snap location from here
		//		- store tween to cancel it to allow for control
	}
	handleTouchMove(event) {
		// console.log('MOVE')
		const T = this

		T.currentProgress = this.tl.progress()

		T.endX = event.changedTouches[0].clientX
		T.distance = T.endX - T.startX
		T.distancePercentPerSlide = T.distance / window.innerWidth
		T.distancePercentAll = T.percentPerSlide * T.distancePercentPerSlide
		// restrict the progress between 0 - 1

		this.tl.progress(Math.max(0, Math.min(1, -T.distancePercentAll + T.currentProgress)))

		T.startX = T.endX
	}

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
		// this.tl
		// 	.kill()
		// 	.clear()
		// 	.pause(0)

		const images = []
		for (let i = 0; i < this.state.current; i++) {
			const val = siteData.story.images[i]
			images.push(
				<ProgressiveImage src={path + val.mobile} placeholder={path + val.thumb} key={i}>
					{(src, loading) => {
						console.log(src, loading, i)
						return (
							<img
								style={{ opacity: loading ? 0.2 : 1 }}
								src={src}
								alt={val.mobile}
								ref={div => (this.tl_images[i] = div)}
							/>
						)
					}}
				</ProgressiveImage>
			)
		}

		const text = siteData.story.text.map((val, j) => {
			console.log(j, val)
			return (
				<div ref={div => (this.tl_texts[j] = div)} className="txt-item" key={'txt-item' + j}>
					{val.map((obj, k) => {
						return <div key={j + '-' + k}>{obj.text}</div>
					})}
				</div>
			)
		})
		console.log('.....', text)

		return (
			<div
				className="story"
				ref={div => (this.storyRef = div)}
				// onScroll={this.handleScroll.bind(this)}
			>
				<div className="gallery" ref={div => (this.galleryRef = div)}>
					{images}
				</div>
				<div
					className="gallery"
					ref={div => {
						this.wordsRef = div
					}}
				>
					{text}
				</div>
				<div className="hitbox" ref={div => (this.hitbox = div)} />
			</div>
		)
	}
}

export default Story

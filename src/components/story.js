import React, { Component } from 'react'
import siteData from '../data/siteData.json'
// import Device from './device'
import ProgressiveImage from 'react-progressive-image'
import { TweenLite, TimelineLite } from 'gsap'
import { rel } from './fat/lib/MathUtils'

const path = './images/story/'

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

		T.tl = new TimelineLite({ paused: true })
		T.tl_images = []
		T.tl_texts = []
		T.tl_count = 0
		T.xStart = null
		T.settle = null
	}

	componentDidMount() {
		const T = this
		// add listeners for touch
		T.hitbox.ontouchstart = T.handleTouchStart.bind(T)
		T.hitbox.ontouchend = T.handleTouchEnd.bind(T)
		T.hitbox.ontouchmove = T.handleTouchMove.bind(T)

		console.log(T.tl_images)
		console.log(T.tl_texts)
		// iterate through images and texts to make a timeline
		T.tl_count = 0
		// TODO - make 3 = total json length
		for (var i = 0; i < 3; i++) {
			for (var k = 0; k < 2; k++) {
				// alternate image & text layers
				var target = k === 0 ? T.tl_texts : T.tl_images
				// create a label
				var label = 'step' + T.tl_count
				T.tl.add(label, T.tl_count)
				// add both tweens at same label to play simultaniously
				// TODO - add delay or offset for each section
				T.tl.to(target[i], 1, { x: '-=100%' }, label)
				T.tl.to(target[i + 1], 1, { x: '-=100%' }, label)
				T.tl_count++
			}
		}
		// store percent (0-1) of timeline that a single slide takes
		T.percentPerSlide = 1 / T.tl_count
	}

	handleTouchStart(event) {
		console.log('START', event)
		const T = this
		// kill the settling tween
		if (T.settle) T.settle.kill()

		// store starting x position of touch
		T.xStart = T.xPrev = event.changedTouches[0].clientX
	}

	handleTouchMove(event) {
		// console.log('MOVE')
		const T = this

		// get timeline progress
		T.currentProgress = this.tl.progress()

		// current touch x
		T.xEnd = event.changedTouches[0].clientX
		// distance traveled since last move event
		T.distance = T.xEnd - T.xPrev
		// distance as a percent of the window width
		T.distancePercentPerSlide = T.distance / window.innerWidth
		// distance as a percent of total timeline percent
		T.distancePercentAll = T.percentPerSlide * T.distancePercentPerSlide

		// update progress by adding to prev progress; restrict the progress between 0 - 1
		this.tl.progress(Math.max(0, Math.min(1, -T.distancePercentAll + T.currentProgress)))

		// update x for next tick
		T.xPrev = T.xEnd
	}

	handleTouchEnd(event) {
		console.log('\t END', event)
		const T = this

		// number of frames/slides into the progress, expressed as Number with remainder of total count
		const frameCount = T.currentProgress / T.percentPerSlide
		// round UP that Number
		const frameCountCeil = Math.ceil(frameCount)
		// round DOWN that Number
		const frameCountFloor = Math.floor(frameCount)
		// total distance since the touch start
		const distanceTotal = T.xEnd - T.xStart
		// find closest percent fraction of total timeline based on:
		// distance is : negative = move left | positive = move right
		// multiply the rounded value by the stored percent per frame/slide
		T.percentClosestTo = (distanceTotal < 0 ? frameCountCeil : frameCountFloor) * T.percentPerSlide

		console.log(T)
		// time range: 0.5 - 0.8; find where the full Number sits between each rounded value
		const settleTime = rel(0.5, 0.8, frameCountCeil, frameCountFloor, frameCount)

		// tween it, but store tween to kill if needed
		T.settle = TweenLite.to(T.tl, settleTime, { progress: T.percentClosestTo })
	}

	render() {
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
			<div className="story" ref={div => (this.storyRef = div)}>
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

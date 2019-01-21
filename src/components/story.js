import React, { Component } from 'react'
import siteData from '../data/siteData.json'
// import Device from './device'
import ProgressiveImage from 'react-progressive-image'
import { TweenLite, TimelineLite } from 'gsap'
import { rel } from './fat/lib/MathUtils'
import ReactHtmlParser from 'react-html-parser'

const path = './images/story/'

class Story extends Component {
	constructor(props) {
		super(props)
		const T = this
		T.state = {
			image: props.placeholder,
			loading: true,
			srcSetData: { srcSet: '', sizes: '' },
			current: 1
		}
		T.galleryRef = null
		T.storyRef = null
		T.btnNextRef = null
		T.btnPrevRef = null

		T.tl = new TimelineLite({ paused: true })
		T.tl_images = []
		T.tl_texts = []
		T.xStart = null
		T.settleTween = null
	}

	componentDidMount() {
		const T = this
		// add listeners for touch
		T.hitbox.ontouchstart = T.handleTouchStart.bind(T)
		T.hitbox.ontouchend = T.handleTouchEnd.bind(T)
		T.hitbox.ontouchmove = T.handleTouchMove.bind(T)

		// iterate through images and texts to make a timeline
		const json = siteData.story

		let indexes = {
			text: 0,
			image: 0
		}
		let singles = 0
		let duos = 0
		for (var i = 0; i < json.length; i++) {
			// create a label
			var label = 'step' + i
			T.tl.add(label, i)

			Object.keys(json[i]).length == 1 ? singles++ : duos++

			// console.log('ADD LABEL:', label, jsonAt)
			for (var k = 0; k < 2; k++) {
				var type = k === 0 ? 'text' : 'image'
				// alternate image & text layers
				var target = k === 0 ? T.tl_texts : T.tl_images

				// check if there is a node of this TYPE on the next iteration FIRST
				if (i < json.length - 1) {
					if (json[i + 1][type]) {
						addTween()
						indexes[type]++
						addTween()
					}
				}
			}
		}

		function addTween(isSecond) {
			T.tl.to(target[indexes[type]], 1, { x: '-=100%' }, label)
		}

		// store percent (0-1) of timeline that a single slide takes
		// slides of just text or image + slide with both - 1 because last slide doesn't move past bounds
		T.percentPerSlide = 1 / (singles + duos - 1)
		console.log('percentPerSlide:', T.percentPerSlide, singles, duos)
	}

	handleTouchStart(event) {
		// console.log('START', event)
		const T = this
		// kill the settling tween
		if (T.settleTween) T.settleTween.kill()

		// store starting x position of touch
		T.xStart = T.xPrev = event.changedTouches[0].clientX

		// load next?
		// this.setState({
		// 	current: this.state.current + 1
		// })
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
		// console.log('\t END', event)
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
		const settleTweenTime = rel(0.5, 0.8, frameCountCeil, frameCountFloor, frameCount)

		T.settle(settleTweenTime, T.percentClosestTo)
	}

	settle(time, percent) {
		const T = this
		// tween it, but store tween to kill if needed
		T.settleTween = TweenLite.to(T.tl, time, { progress: percent })
	}

	render() {
		console.log('render')
		const images = []
		const texts = []
		// console.warn(this.state.current, siteData.story.length)
		for (let i = 0; i < siteData.story.length; i++) {
			const jsonAt = siteData.story[i]
			if (jsonAt.image) {
				const img = jsonAt.image
				let child = null
				// this will add the progressive image, perhaps mod to pass in a "load" param so the thumb is there for sure?
				// if (i < this.state.current) {
				child = (
					<ProgressiveImage src={path + img.mobile} placeholder={path + img.thumb}>
						{(src, loading) => {
							return <img style={{ opacity: loading ? 0.4 : 1 }} src={src} alt={img.mobile} />
						}}
					</ProgressiveImage>
				)
				// }
				images.push(
					<div className="img-item" key={i} ref={div => this.tl_images.push(div)}>
						{child}
					</div>
				)
			}
			if (jsonAt.text) {
				const txt = jsonAt.text
				texts.push(
					<div ref={div => this.tl_texts.push(div)} className="txt-item" key={'txt-item' + i}>
						{txt.map((obj, k) => {
							// check for class for alignment
							const c = obj.align || ''
							// check for style (offset)
							const hasStyle = obj.style || null
							let style = {}
							if (hasStyle) {
								const split = hasStyle.split(/\s?;\s?/g)
								split.forEach(item => {
									const [key, val] = item.split(':')
									if (val !== undefined) {
										style[key] = val
									}
								})
							}
							return (
								<div key={i + '-' + k} className={c} style={style}>
									<div>{ReactHtmlParser(obj.text)}</div>
								</div>
							)
						})}
					</div>
				)
			}
		}

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
					{texts}
				</div>
				<div className="hitbox" ref={div => (this.hitbox = div)} />
				<button ref={div => (this.btnNextRef = div)}>NEXT</button>
				<button ref={div => (this.btnPrevRef = div)}>PREV</button>
			</div>
		)
	}
}

export default Story

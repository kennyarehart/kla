import React, { Component } from 'react'
import storyData from '../data/storyData.json'
import ProgressiveImage from 'react-progressive-image'
import { TweenLite, TimelineMax } from 'gsap'
import { rel } from '@ff0000-ad-tech/ad-utils/lib/MathUtils'
import ReactHtmlParser from 'react-html-parser'
import { getDomainKey } from '../js/utils'
import Device from '../js/fat/lib/Device'

const path = './images/story/'
const jsonImageNode = Device.type
const domainKey = getDomainKey()

class Story extends Component {
	constructor(props) {
		super(props)
		const T = this
		T.state = {
			image: props.placeholder,
			current: 1
		}
		T.galleryRef = null
		T.storyRef = null
		T.btnNextRef = null
		T.btnPrevRef = null

		T.tl = new TimelineMax({ paused: true })
		T.tl_images = []
		T.tl_texts = []
		T.xStart = null
		T.settleTween = null
	}

	componentDidMount() {
		const T = this
		if (Device.type === 'desktop') {
			T.btnPrevRef.onclick = T.handleManualPrev.bind(T)
			T.btnNextRef.onclick = T.handleManualNext.bind(T)
		} else {
			// add listeners for touch
			T.hitbox.ontouchstart = T.handleTouchStart.bind(T)
			T.hitbox.ontouchend = T.handleTouchEnd.bind(T)
			T.hitbox.ontouchmove = T.handleTouchMove.bind(T)
			T.btnPrevRef.style.display = 'none'
			T.btnNextRef.style.display = 'none'
		}

		// iterate through images and texts to make a timeline
		const json = storyData[jsonImageNode]

		let indexes = {
			text: 0,
			image: 0
		}
		for (var i = 0; i < json.length; i++) {
			// create a label
			var label = 'frame' + i
			T.tl.add(label, i)

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

		function addTween() {
			T.tl.to(target[indexes[type]], 1, { x: '-=100%' }, label)
		}

		// store percent (0-1) of timeline that a single slide takes
		T.percentPerSlide = 1 / (json.length - 1)
		// console.log('percentPerSlide:', T.percentPerSlide)
	}

	handleTouchStart(event) {
		// console.log('START', event)
		const T = this
		// kill the settling tween
		let wasKilled = false
		if (T.settleTween) {
			wasKilled = true
			T.settleTween.kill()
		}

		// store starting x position of touch
		T.xStart = T.xPrev = event.changedTouches[0].clientX

		T.checkImageLoad(wasKilled)
	}

	checkImageLoad(wasKilled) {
		const T = this
		// load next?
		// check current location to determine if next load should happen
		let currentTime = T.tl.time()
		// if the settle tween was stopped, need to add 1 to assume the next label
		// is not right next to the touch
		if (wasKilled) currentTime++
		const nextLabel = T.tl.getLabelAfter(currentTime)
		if (nextLabel) {
			const stripped = +nextLabel.replace('frame', '')
			if (stripped + 1 > this.state.current) {
				this.setState({
					current: stripped + 1
				})
			}
		}
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

		// time range: 0.5 - 0.8; find where the full Number sits between each rounded value
		const settleTweenTime = rel(0.5, 0.8, frameCountCeil, frameCountFloor, frameCount)

		T.settle(settleTweenTime, T.percentClosestTo)
	}

	settle(time, percent) {
		const T = this
		// console.log('settle() to percent:', percent)
		// tween it, but store tween to kill if needed
		T.settleTween = TweenLite.to(T.tl, time, {
			progress: percent,
			onComplete: () => {
				// check for rounding error falling just short
				let currentTime = T.tl.time()
				if (currentTime != Math.round(currentTime)) {
					T.tl.time(Math.round(currentTime))
				}
				T.settleTween = null
			}
		})
	}

	handleManualNext() {
		this.handleManual(false)
	}

	handleManualPrev() {
		this.handleManual(true)
	}

	handleManual(isPrev) {
		const T = this
		T.checkImageLoad()
		T.currentProgress = T.tl.progress()
		let perSlide = T.percentPerSlide
		if (isPrev) {
			perSlide *= -1
			if (T.currentProgress <= 0) return
		} else {
			if (T.currentProgress >= 1) return
		}
		let percent = T.currentProgress + perSlide

		// make sure there are no fractional rounding errors
		if (percent < 0) percent = 0
		else if (percent > 1) percent = 1

		if (percent === 0) {
			T.btnPrevRef.classList.add('story-btn-disable')
		} else if (percent === 1) {
			T.btnNextRef.classList.add('story-btn-disable')
		} else {
			T.btnPrevRef.classList.remove('story-btn-disable')
			T.btnNextRef.classList.remove('story-btn-disable')
		}

		if (!T.settleTween) {
			T.settle(0.8, percent)
		}
	}

	render() {
		// console.log(`${Array(25).join('-')} RENDER ${Array(25).join('-')}`)
		// console.log(this.state)
		const images = []
		const texts = []
		// console.warn(this.state.current, storyData.length)
		for (let i = 0; i < storyData[jsonImageNode].length; i++) {
			const jsonAt = storyData[jsonImageNode][i]
			if (jsonAt.image) {
				let img = jsonAt.image
				let child = null
				// this will add the progressive image, perhaps mod to pass in a "load" param so the thumb is there for sure?
				if (i < this.state.current) {
					// check for different domain versions first:
					const hasSubDomain = img['alk'] !== undefined
					if (hasSubDomain) {
						img = img[domainKey]
					}
					//
					const thumb = img.replace('.', '__thumb.')
					//
					child = (
						<ProgressiveImage src={path + img} placeholder={path + thumb}>
							{(src, loading) => {
								return <img style={{ opacity: loading ? 0.4 : 1 }} src={src} />
							}}
						</ProgressiveImage>
					)
				}
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

							let txt = ''
							obj.id.forEach(val => {
								let lookup = storyData.full[val]
								// check if text is an Object first: use domain based key
								if (typeof lookup !== 'string') {
									lookup = lookup[domainKey]
								}

								txt += lookup
							})

							return (
								<div key={i + '-' + k} className={c} style={style}>
									<div>{ReactHtmlParser(txt)}</div>
								</div>
							)
						})}
					</div>
				)
			}
		}
		const prevTxt = '<<'
		const nextTxt = '>>'

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
				<button className="prev story-btn-disable" ref={div => (this.btnPrevRef = div)}>
					{prevTxt}
				</button>
				<button className="next" ref={div => (this.btnNextRef = div)}>
					{nextTxt}
				</button>
			</div>
		)
	}
}

export default Story

import React from 'react'
// import bridalveil from '../../images/bridalveil.jpg'
// import MapContainer from '../map-container'
import Section from '../Section'

// import ImgRow from '../img-row'

class WhenWhere extends Section {
	render() {
		return (
			// <div>
			// 	<ImgRow />
			<div className="when-where-page" ref={div => (this.scrollRef = div)}>
				<div>
					<div className="buffered-content">
						<h2>WEDDING CEREMONY</h2>
						<p className="starter-info end-capped">
							August 3rd, 2019
							<br />
							<span id="loc">Bridal Veil Lakes</span>
							<br />
							<span id="addr">
								3255 NE Henderson Rd,
								<br />
								Corbett, OR 97019
							</span>
						</p>
					</div>
					<img src="./images/bridalveil.jpg" className="large-img shadow" alt="bridal-veil" />

					<div className="buffered-content">
						{/* <MapContainer /> */}
						<h3>About Bridal Veil Lakes</h3>
						<p className="end-capped max-wide">
							Overlooking the Historic Columbia River Gorge, Bridal Veil Lakes is located just 30 minutes
							east of Portland, off exit 28 on I-84. Towering old growth forests surround the 3 acre
							spring fed lake. The private recreational area is filled with lush greenery and gardens,
							beautiful wildflowers and breathtaking views. The secluded location is protected from the
							east wind. Spend the day in a relaxed and enchanting atmosphere.
						</p>

						<div id="timeline-day-of">
							<h3>DAY OF TIMELINE</h3>
							<div className="dual-column">
								<div>
									<ul>
										<li>5:00 pm</li>
										<li>5:30 - 6:00 pm</li>
										<li>6:00 - 7:00 pm</li>
										<li>7:00 - 12:00 pm</li>
									</ul>
								</div>
								<div>
									<ul>
										<li>Guests Arrive</li>
										<li>Ceremony</li>
										<li>Cocktail Hour & Photos</li>
										<li>Reception, Dinner, & Dancing</li>
									</ul>
								</div>
							</div>
						</div>
						<br />
						<p>
							The Ceremony will be outdoors on grass with the Reception to follow with seating & dance
							floor in open air tents.
						</p>
						<br />
						<div className="end-capped">
							<h3>Transportation</h3>
							<p>
								Shuttles will be available to and from the hotels we have rooms blocked out. A timeline
								of the day will be available soon.
								<br />
								If you wish to drive, Bridal Veil has ample parking. However the road up to the venue is
								dirt and has several twists.
								<br />
								There is handicap accessible drop off points directly at the venue.
							</p>
						</div>
					</div>
				</div>
			</div>
			// 	<ImgRow />
			// </div>
		)
	}
}

export default WhenWhere

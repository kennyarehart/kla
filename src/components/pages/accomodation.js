import React, { Component } from 'react'

class Accomodation extends Component {
	render() {
		return (
			<div>
				<h3>Accommodations</h3>
				<p>
					WE'VE RESERVED GROUP RATES AT THE TWO BELOW HOTELS. JUST MENTION "WEBER/AREHART WEDDING" WHEN
					BOOKING.
				</p>
				<p>
					Both hotels are just a quick 10/15 min cab or Uber ride away from the airport, and located close to
					each other. However, if you wish to book alternate hotel accommodations in the San Antonio Pearl or
					River Walk areas, feel free!
				</p>
				<div id="hotels-holder">
					<div>
						<div>
							<i>Comfort Inn Troutdale</i>
						</div>
						<div>1000 Northwest Graham Road</div>
						<div>Troutdale, OR 97060</div>
						<div>Contact | Stephanie Madrigal</div>
						<div>gm@citroutdale.com</div>
						<div>(503) 492-2900</div>
						<div>$### | Classic King</div>
						<div>$### | Landmark Double Queen</div>
						<button>VIEW</button>
					</div>
					<div>
						<div>
							<i>Comfort Inn 136</i>
						</div>
						<div>E Greyson St</div>
						<div>San Antonio, TX 78215</div>
						<div>Contact | Christina Garza</div>
						<div>Christina.garza@thehotelemma.com </div>
						<div>(210) 448-8330</div>
						<div>$319 | Classic King</div>
						<div>$349 | Landmark Double Queen</div>
						<button>VIEW</button>
					</div>
				</div>
			</div>
		)
	}
}

export default Accomodation

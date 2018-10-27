import React, { Component } from 'react'

class WhenWhere extends Component {
	render() {
		return (
			<div className="home flex-base">
				<div id="header" className="layer-1 flex-base">
					<h2>We're getting married!!!</h2>

					<div className="flex-base">
						<div id="location">
							<h3>Bridal Veil Lakes</h3>
							<h1>Portland, OR</h1>
						</div>

						<h2>August 3rd, 2019</h2>
					</div>
				</div>

				<img className="myImg" alt="" />

				<p id="soon" className="layer-1">
					Full Site Coming Soon...
				</p>
			</div>
		)
	}
}

export default WhenWhere

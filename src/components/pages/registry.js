import React from 'react'
import Section from '../Section'
import sectionData from '../../data/sectionData.json'

class Registry extends Section {
	render() {
		const data = sectionData.active.filter(obj => obj.class === 'Registry')[0]
		return (
			<div className="registry-page" ref={div => (this.scrollRef = div)}>
				<div className="buffered-content end-capped">
					<h2>{data.label}</h2>
					<p className="multi max-wide end-capped">
						Your presence is the best gift we could ask for! But if you would like to give more visit our
						registry.
					</p>

					<a href={data.url} target="_blank">
						myregistry.com
					</a>
				</div>
			</div>
		)
	}
}

export default Registry

import Device from './fat/lib/Device'

export function getDomainKey() {
	return window.location.hostname.indexOf('a') === 0 ? 'alk' : 'kla'
}

export function getDeviceKey() {
	return Device.type === 'mobile' ? 'mobile' : 'desktop'
}

export function getHeaderText() {
	const pool = ['Kenny Arehart', 'Ashley Weber']
	if (getDomainKey() === 'alk') pool.reverse()
	return pool.join(Device.type === 'mobile' ? ' +<br>' : ' + ')
}

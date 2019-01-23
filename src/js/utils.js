import Device from './fat/lib/Device'

export function getDomainKey() {
	return window.location.hostname.indexOf('l') === 0 ? 'alk' : 'kla'
}

export function getDeviceKey() {
	return Device.type === 'mobile' ? 'mobile' : 'desktop'
}

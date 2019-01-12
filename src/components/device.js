class Device {
	constructor() {
		// console.log('Device()')
		const D = this
		D.agentString = navigator.userAgent

		D._getType()
		D._getBrandAndOS()
		D._getBrowser()

		if (
			D.type !== 'desktop' &&
			D.os === 'windows' &&
			D.osVersion <= 8 &&
			D.browser === 'ie' &&
			D.browserVersion < 12
		) {
			console.log(
				"You appear to be on Windows 7 or 8 using Internet Explorer 11 or under. You also appear to be on a touchscreen device. We will assume you're actually on a desktop, since it's extremely unlikely you're on a tablet or mobile device using this specific operating system and browser."
			)
			D.type = 'desktop'
		}

		var line = Array(70).join('-')
		var str = '\n' + line
		for (var property in D) {
			if (D.hasOwnProperty(property) && typeof D[property] !== 'function') {
				str += '\n' + property + ': ' + D[property]
			}
		}
		str += '\n' + line
		console.log(str)
	}

	_getType() {
		const D = this
		var hasMobile = /(android|mobile)/gi.exec(D.agentString)
		var hasTablet = /(tablet|touch)/gi.exec(D.agentString)
		var hasIPad = /(ipad)/gi.exec(D.agentString)
		D.type = 'desktop'
		if (hasMobile) D.type = 'mobile'
		if (hasTablet) D.type = 'tablet'
		if (hasIPad) D.type = 'tablet'
	}

	_getBrandAndOS() {
		var D = this
		var apple = D.agentString.match(/ip(hone|od|ad)|mac/gi)
		if (apple) {
			D.brand = 'apple'
			D.product = apple[0].toLowerCase()
			var appleOS = /(OS\s)(\X\s|)([\d\.\_]+)/gi.exec(D.agentString)
			D.os = appleOS[2] === '' ? 'ios' : 'osx'
			D.osVersion = appleOS[3].replace(/\_/g, '.')
			return
		}

		var android = /(android)\/?\s*([0-9\.]+)/gi.exec(D.agentString)
		if (android) {
			D.brand = D.product = D.os = android[1].toLowerCase()
			D._checkForSpecial('product', ['pixel 2'], D.agentString.split('(')[1].split(')')[0])
			D.osVersion = android[2]
			return
		}

		var microsoft = /(windows\snt\s|windows\sphone)\/?\s*([0-9\.]+)/gi.exec(D.agentString)
		if (microsoft) {
			D.brand = 'microsoft'
			D.os = 'windows'

			switch (microsoft[2]) {
				case '5.2':
					D.osVersion = 'xp'
					break
				case '6.0':
					D.osVersion = 'vista'
					break
				case '6.1':
					D.osVersion = '7'
					break
				case '6.2':
					D.osVersion = '8'
					break
				case '6.3':
					D.osVersion = '8.1'
					break
				case '10.0':
					D.osVersion = '10'
					break
				default:
					D.osVersion = microsoft[2]
			}

			D.product = microsoft[1].toLowerCase()
			if (D.product.match(/\snt/i)) {
				D.product = 'pc'
			}
			return
		}

		// blackberry
		var blackberry = D.agentString.match(/(blackberry|bb10|playbook)/i)
		if (blackberry) {
			D.brand = D.product = D.os = 'blackberry'
			D.osVersion = /(version)\/?\s*([0-9\.]+)/gi.exec(D.agentString)[2]
		}
	}

	_getBrowser() {
		const D = this
		var browserMatches = /(edge(?=\/))\/?\s*([0-9\.]+)/i.exec(D.agentString) // check for edge first

		// if it's not edge, check for other common browsers
		if (!browserMatches) {
			browserMatches = D.agentString.match(
				/(fban|fbav|opera|chrome|crios|safari|firefox|msie|trident(?=\/))\/?\s*([0-9\.]+)/i
			)
		}

		// if we checked for common browsers and got NOTHING in return, let's just use the device's default browser
		if (!browserMatches || browserMatches.length < 3) {
			console.log('we received no browser data, so we are setting it to the default of the device')
			switch (D.os) {
				case 'ios':
					D.browser = 'safari'
					break
				case 'windows':
					D.browser = 'trident'
					break
				default:
					D.browser = 'chrome'
					break
			}
			D.browserVersion = 'os-default'
			return
		}

		console.log('we received browser data')
		D.browser = browserMatches[1].toLowerCase()
		D.browserVersion = browserMatches[2]

		switch (D.browser) {
			case 'trident':
				// Check for desktop IE 10
				var versionMatch = /\brv:+(\d+)/g.exec(D.agentString)
				if (versionMatch) D.browserVersion = versionMatch[1]
			case 'msie':
				D.browser = 'ie'
				break
			case 'crios':
				D.browser = 'chrome'
				break
			case 'safari':
				var versionMatch = D.agentString.match(/\sversion\/([0-9\.]+)\s/i)
				if (versionMatch) D.browserVersion = versionMatch[1]
				break
			case 'chrome':
				// check for Opera
				var versionMatch = D.agentString.match(/\b(OPR)\/([0-9\.]+)/i)
				if (versionMatch) {
					D.browser = 'opera'
					D.browserVersion = versionMatch[2]
				}
				break
		}
	}

	_checkForSpecial(targetParam, array, focus) {
		const D = this
		var param
		for (var i = 0; i < array.length; i++) {
			param = array[i].toLowerCase()
			if (focus.match(new RegExp(param, 'i'))) {
				D[targetParam] = param
				break
			}
		}
	}
}

export default new Device()

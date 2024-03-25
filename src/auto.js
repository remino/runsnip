import start from './start.js'

(function init() {
	if (document.readyState === 'interactive') {
		start()
	} else {
		document.addEventListener('DOMContentLoaded', start)
	}
}())

import './cookie'
import './storage'

import parseUrl from './parse-url'
import queryString from './query-string'
import timeFormat from './time-format'
import safeParse from './safe-parse'
import decimal from './decimal'
import device from './device'

window.utils = {
	parseUrl,
	queryString,
	timeFormat,
	safeParse
}

window.decimal = decimal;
window.device = device;
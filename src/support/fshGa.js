(function() { // Native

	'use strict';
	var debug = require('./debug');

	var times = {};
	var refAry = ['www.lazywebtools.co.uk', 'refreshthing.com'];

	function isAuto() { // Native
		var docRef = document.referrer
			.match(/^https?\:\/\/([^\/?#]+)(?:[\/?#]|$)/i);
		docRef = docRef ? docRef[1] : docRef;
		return refAry.indexOf(docRef) !== -1;
	}

	function start(category, variable, label) { // Native
		if (isAuto() || typeof ga === 'undefined') {return;}
		times[category + ':' + variable + ':' + label] =
			performance.now() * 1000;
	}

	function end(category, variable, label) { // Native
		if (isAuto() || typeof ga === 'undefined') {return;}
		var myTime = Math.round(performance.now() * 1000 -
			times[category + ':' + variable + ':' + label]) / 1000;
		if (myTime > 10) {
			ga('fshApp.send', 'timing', category, variable, Math.round(myTime),
				label);
		}

		debug.log(variable, myTime + 'ms');

	}

	function setup() { // Native
		if (isAuto() || typeof ga === 'undefined') {return;}

		ga('create', 'UA-76488113-1', 'auto', 'fshApp', {
			userId: document.getElementById('statbar-character').textContent,
			siteSpeedSampleRate: 10
		});
		ga('fshApp.set', 'appName', 'fshApp');
		ga('fshApp.set', 'appVersion', FSH.version);
		ga('create', 'UA-76488113-2', 'auto', 'fsh', {
			userId: document.getElementById('statbar-character').textContent,
			siteSpeedSampleRate: 10
		});
		ga('fsh.send', 'pageview');
	}

	function screenview(funcName) { // Native
		if (isAuto() || typeof ga === 'undefined') {return;}
		ga('fshApp.send', 'screenview', {screenName: funcName});
	}

	module.exports = {
		start: start,
		end: end,
		setup: setup,
		screenview: screenview
	};

})();
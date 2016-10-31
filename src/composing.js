(function() {

	'use strict';
	var calf = require('./support/calf');
	var task = require('./support/task');
	var system = require('./support/system');

	var composeMsg =
		'<li class="notification"><a href="index.php?cmd=composing"><span' +
		' class="notification-icon"></span><p class="notification-content">Co' +
		'mposing to do</p></a></li>';

	function displayComposeMsg() { // Native
		document.getElementById('notifications')
			.insertAdjacentHTML('afterbegin', composeMsg);
	}

	function parseComposing(data) { // Native
		var doc;
		if (calf.cmd !== 'composing') {
			doc = system.createDocument(data);
		} else {
			doc = document;
		}
		var timeRE = /ETA:\s*(\d+)h\s*(\d+)m\s*(\d+)s/;
		var times = [];
		var openSlots = doc.getElementsByClassName('composing-potion-time');
		Array.prototype.forEach.call(openSlots, function(el) {
			if (el.textContent === 'ETA: Ready to Collect!' ||
					el.textContent === 'ETA: n/a') {
				times.push(0);
			} else {
				var timeArr = timeRE.exec(el.textContent);
				var milli = (timeArr[1] * 3600 + timeArr[2] * 60 + timeArr[3] * 1) *
					1000 + Date.now();
				times.push(milli);
			}
		});
		var eta = Math.min.apply(null, times);
		if (eta === 0) {
			if (calf.cmd !== 'composing') {displayComposeMsg();}
			system.setValue('needToCompose', true);
		} else {
			system.setValue('needToCompose', false);
			system.setValue('lastComposeCheck', eta);
		}
	}

	function createPotion(temp) { // jQuery
		$.ajax({
			cache: false,
			dataType: 'json',
			url:'index.php',
			data: {
				cmd: 'composing',
				subcmd: 'createajax',
				template_id: temp.value,
				_rnd: Math.floor(Math.random() * 8999999998) + 1000000000
			}
		}).done(function potionDone(data, textStatus) {
			if (data.error !== '') {
				temp.parentNode.innerHTML = '<div style="height: 26px;">' +
					data.error + '</div>';
			} else {
				temp.parentNode.innerHTML = '<div style="height: 26px;">' +
					textStatus + '</div>';
			}
		});
	}

	function quickCreate(evt) { // Native
		var target = evt.target;
		if (target.tagName !== 'SPAN' ||
				target.className !== 'quickCreate') {return;}
		var temp = target.previousElementSibling.previousElementSibling;
		if (temp && temp.value !== 'none') {
			createPotion(temp);
		}
	}

	function injectComposeAlert() { // jQuery
		if (calf.cmd === 'composing') {return;}
		var needToCompose = system.getValue('needToCompose');
		if (needToCompose) {
			displayComposeMsg();
			return;
		}
		var lastComposeCheck = system.getValue('lastComposeCheck');
		if (lastComposeCheck && Date.now() < lastComposeCheck) {return;}
		$.get('index.php?cmd=composing', function(data) {
			task.add(3, parseComposing, [data]);
		});
	}

	function injectComposing() { // Native
		var pCC = document.getElementById('pCC');
		if (!pCC) {return;}
		if (calf.enableComposingAlert) {
			parseComposing();}

		var buttons = pCC.querySelectorAll('input[id^=create-]:not(#create-multi)');
		Array.prototype.forEach.call(buttons, function(el) {
			el.insertAdjacentHTML('afterend',
				'&nbsp;[<span class="quickCreate">Quick Create</span>]');
		});
		pCC.addEventListener('click', quickCreate);

		if (system.getValue('moveComposingButtons')) {
			var buttonDiv = document.getElementById('composing-error-dialog')
				.previousElementSibling;
			buttonDiv.setAttribute('style', 'text-align: right; padding: 0 38px 0 0');
			var top = pCC.getElementsByClassName('composing-level')[0].parentNode;
			top.insertAdjacentElement('beforebegin', buttonDiv);
		}
	}

	function composingCreate() { // Native
		document.getElementById('composing-add-skill')
			.addEventListener('click', function() {
				document.getElementById('composing-skill-level-input').value =
					document.getElementById('composing-skill-level-max').textContent;
			});
		document.getElementById('composing-skill-select')
			.addEventListener('change', function() {
				document.getElementById('composing-skill-level-input').value =
					document.getElementById('composing-skill-level-max').textContent;
			});
	}

	module.exports = {
		injectComposeAlert: injectComposeAlert,
		injectComposing: injectComposing,
		composingCreate: composingCreate,
	};

})();
(function() {

	'use strict';
	var system = require('./support/system');

	var playerBank = {
		headText: 'Bank',
		appLink: true,
		depoPos: 2,
		balPos: 1,
		data: {
			cmd: 'bank',
			subcmd: 'transaction'
		},
		initWithdraw: ''
	};
	var guildBank = {
		headText: 'Guild Bank',
		appLink: false,
		depoPos: 3,
		balPos: 2,
		data: {
			cmd: 'guild',
			subcmd: 'bank',
			subcmd2: 'transaction'
		},
		initWithdraw: '1'
	};
	var bankSettings;

	function transResponse(response) { // jQuery
		var doc = system.createDocument(response);
		var infoBox = $('#pCC #info-msg', doc);
		if (infoBox.length === 0) {return;}
		var target = $('#pCC #info-msg');
		if (target.length === 0) {
			$('#pCC').prepend(infoBox.closest('table'));
		} else {
			target.closest('table').replaceWith(infoBox.closest('table'));
		}
		$('#pH #statbar-gold').text($('#pH #statbar-gold', doc).text());
		$('#pH #statbar-gold-tooltip-general dd').text(function(index) {
			return $('#pH #statbar-gold-tooltip-general dd', doc).eq(index).text();
		});
		var o = bankSettings;
		$('#pCC b').slice(o.balPos).text(function(index) {
			return $('#pCC b', doc).slice(o.balPos).eq(index).text();
		});
		if ($('#pCC b').eq(o.depoPos).text() === '0') {
			$('#pCC input[value="Deposit"]').prop('disabled', true);
		}
		$('#pCC #deposit_amount').val($('#pCC #deposit_amount', doc).val());
		$('#pCC #withdraw_amount').val(o.initWithdraw);
	}

	function bankDeposit(e) { // jQuery
		e.preventDefault();
		var o = bankSettings;
		var amount = $('#pCC #deposit_amount').val();
		if ($('#pCC b').eq(o.depoPos).text() === '0' || !$.isNumeric(amount) ||
			amount < 1) {return;}
		o.data.mode = 'deposit';
		o.data.deposit_amount = amount;
		$.get('index.php', o.data).done(transResponse);
	}

	function bankWithdrawal(e) { // jQuery
		e.preventDefault();
		var o = bankSettings;
		var amount = $('#pCC #withdraw_amount').val();
		if (!$.isNumeric(amount) || amount < 1) {return;}
		o.data.mode = 'withdraw';
		o.data.withdraw_amount = amount;
		$.get('index.php', o.data).done(transResponse);
	}

	function ajaxifyBank() { // jQuery
		var o = bankSettings;
		var bank = $('#pCC b');
		if (bank.length === 0 || bank.eq(0).text() !== o.headText) {return;}
		if (o.appLink) {
			bank.eq(0).closest('tr').after('<tr><td colspan="3" align="center">' +
				'<a href="/index.php?cmd=guild&subcmd=bank">Go to Guild Bank</a>' +
				'</td></tr>');
		}
		var depo = $('#pCC input[value="Deposit"]');
		if (depo.length !== 1) {return;}
		var withdraw = $('#pCC input[value="Withdraw"]');
		if (withdraw.length !== 1) {return;}
		if ($('#pCC b').eq(o.depoPos).text() === '0') {
			depo.prop('disabled', true);
		} else {
			depo.click(bankDeposit);
		}
		withdraw.click(bankWithdrawal);
	}

	function injectGuildBank() { // Native
		bankSettings = guildBank;
		ajaxifyBank();
	}

	function injectBank() { // jQuery
		bankSettings = playerBank;
		ajaxifyBank();
	}

	module.exports = {
		injectGuildBank: injectGuildBank,
		injectBank: injectBank
	};

})();
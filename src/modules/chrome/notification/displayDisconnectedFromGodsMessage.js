import {cmdUrl} from '../../support/constants';
import {getElementById} from '../../common/getElement';
import hideQTip from '../../common/hideQTip';
import indexAjaxData from '../../ajax/indexAjaxData';
import insertHtmlAfterBegin from '../../common/insertHtmlAfterBegin';
import once from '../../common/once';
import saveTempleSettings from './saveTempleSettings';

var havePrayedMsg =
  '<span class="notification-icon"></span><p class="notification-content">' +
  'You are currently praying at the temple.</p>';
var godsNotification =
  '<li class="notification">' +
  '<span id="helperPrayToGods" class="fastPray">' +
  '<table><tbody><tr><td>' +
  '<span class="tip-static fshTempleZero" data-tipped="Pray to Sahria" ' +
  'praytype="0"></span></td><td>' +
  '<span class="tip-static fshTempleOne" data-tipped="Pray to Osverin" ' +
  'praytype="1"></span></td></tr><tr><td>' +
  '<span class="tip-static fshTempleTwo" data-tipped="Pray to Gurgriss" ' +
  'praytype="2"></span></td><td>' +
  '<span class="tip-static fshTempleThree" data-tipped="Pray to Lindarsil" ' +
  'praytype="3"></span></td></tr></tbody></table>' +
  '<a href="' + cmdUrl + 'temple">' +
  '<p class="notification-content">Bow down to the gods</p>' +
  '</a></span></li>';

function havePrayed() {
  getElementById('helperPrayToGods').outerHTML = havePrayedMsg;
  saveTempleSettings(false);
}

function prayToGods(e) { // jQuery
  var myGod = e.target.getAttribute('praytype');
  if (!myGod) {return;}
  indexAjaxData({cmd: 'temple', subcmd: 'pray', type: myGod})
    .then(havePrayed);
  hideQTip(e.target);
}

export default function displayDisconnectedFromGodsMessage() {
  insertHtmlAfterBegin(getElementById('notifications'), godsNotification);
  once(getElementById('helperPrayToGods'), 'click', prayToGods);
}

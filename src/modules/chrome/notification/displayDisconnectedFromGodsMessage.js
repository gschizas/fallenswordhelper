import {cmdUrl} from '../../support/constants';
import {getElementById} from '../../common/getElement';
import hideQTip from '../../common/hideQTip';
import {imageServer} from '../../system/system';
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
  '<span class="tip-static" data-tipped="Pray to Sahria" ' +
  'style="background-image: url(\'' + imageServer +
  '/temple/0.gif\');" praytype="0"></span></td><td>' +
  '<span class="tip-static" data-tipped="Pray to Osverin" ' +
  'style="background-image: url(\'' + imageServer +
  '/temple/1.gif\');" praytype="1"></span></td></tr><tr><td>' +
  '<span class="tip-static" data-tipped="Pray to Gurgriss" ' +
  'style="background-image: url(\'' + imageServer +
  '/temple/2.gif\');" praytype="2"></span></td><td>' +
  '<span class="tip-static" data-tipped="Pray to Lindarsil" ' +
  'style="background-image: url(\'' + imageServer +
  '/temple/3.gif\');" praytype="3"></span></td></tr></tbody></table>' +
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
  once([getElementById('helperPrayToGods'), 'click', prayToGods]);
}

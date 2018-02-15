import {getElementById} from '../common/getElement';
import {imageServer} from '../system/system';
import insertHtmlAfterBegin from '../common/insertHtmlAfterBegin';
import retryAjax from '../ajax/retryAjax';
import setValue from '../system/setValue';

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
  '<a href="index.php?cmd=temple">' +
  '<p class="notification-content">Bow down to the gods</p>' +
  '</a></span></li>';

function havePrayed() {
  getElementById('helperPrayToGods').outerHTML = havePrayedMsg;
  setValue('needToPray', false);
  setValue('lastTempleCheck', new Date()
    .setUTCHours(23, 59, 59, 999) + 1); // Midnight
}

function prayToGods(e) { // jQuery
  var myGod = e.target.getAttribute('praytype');
  if (!myGod) {return;}
  getElementById('helperPrayToGods').removeEventListener('click',
    prayToGods);
  retryAjax('index.php?no_mobile=1&cmd=temple&subcmd=pray&type=' + myGod)
    .done(havePrayed);
  $(e.target).qtip('hide');
}

export default function displayDisconnectedFromGodsMessage() {
  insertHtmlAfterBegin(getElementById('notifications'), godsNotification);
  getElementById('helperPrayToGods').addEventListener('click',
    prayToGods);
}

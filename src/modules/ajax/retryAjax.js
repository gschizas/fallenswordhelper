import AjaxError from './AjaxError';
import on from '../common/on';
import partial from '../common/partial';
import {sendException} from '../support/fshGa';

var paused = true;
var queue = [];
var globalHandler;

function setOpts(options) {
  if (typeof options === 'string') {
    return {url: options};
  }
  return options;
}

function clearXhr(xhr) {
  xhr.abort();
  queue = [];
}

function beforeSend(xhr) {
  on(window, 'beforeunload', partial(clearXhr, xhr));
}

var ignoreStatus = [0, 503, 504];
var ignoreTextStatus = ['abort'];
const ignoreResponse = [
  'We have encountered an issue with a server connection',
  'We\'re performing maintenance on the game',
  'the team have been notified and will get it fixed soon',
  'Create a Free Account Now!'
];

function ignore(ajaxErr) {
  return ignoreStatus.includes(ajaxErr.jqXhr.status) ||
    ignoreTextStatus.includes(ajaxErr.jqTextStatus) ||
    ignoreResponse.some(
      substring => ajaxErr.jqXhr.responseText.includes(substring)
    );
}

function handleFailure(reject, ajaxErr) {
  if (!ignore(ajaxErr)) {
    sendException(ajaxErr.toString(), false);
    reject(ajaxErr);
  }
}

function failFilter([fn, opt, retries, resolve, reject]) {
  return function ajaxFail(jqXhr, textStatus, errorThrown) { // Closure
    if (retries > 0 && jqXhr.status === 503) {
      setTimeout(fn, 100, opt, retries - 1, resolve, reject);
    } else {
      handleFailure(reject,
        new AjaxError([opt, jqXhr, textStatus, errorThrown]));
    }
  };
}

function doAjax(options, retries, resolve, reject) {
  var opt = setOpts(options);
  opt.beforeSend = beforeSend;
  return $.ajax(opt).then(resolve)
    .catch(failFilter([doAjax, opt, retries, resolve, reject]));
}

function attemptTask(runner) {
  if ($.active < 4) {
    var opts = queue.shift();
    doAjax.apply(null, opts);
    runner();
  }
}

function taskRunner() {
  if (queue.length === 0) {
    paused = true;
  } else {
    paused = false;
    attemptTask(taskRunner);
  }
}

function initGlobalHandler() {
  if (!globalHandler) {
    $(document).ajaxComplete(taskRunner);
    globalHandler = true;
  }
}

function add(options, retries, resolve, reject) {
  queue.push([options, retries, resolve, reject]);
  if (paused) {taskRunner();}
}

export default function retryAjax(options) {
  initGlobalHandler();
  if (options) {
    return new Promise(function(resolve, reject) {
      add(options, 10, resolve, reject);
    });
  }
}

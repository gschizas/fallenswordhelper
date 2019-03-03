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

var ignoreFailureStatus = [0, 200];

function url(opt) {
  if (opt.data) {return $.param(opt.data);}
  return opt.url;
}

function handleFailure(opt, jqXhr, errorThrown) {
  if (!ignoreFailureStatus.includes(jqXhr.status)) {
    sendException(
      jqXhr.status + ' (' + errorThrown + ') - ' + url(opt),
      false
    );
  }
}

function failFilter(fn, opt, retries, dfr) {
  return function(jqXhr, textStatus, errorThrown) { // Closure
    if (retries > 0 && jqXhr.status === 503) {
      setTimeout(fn, 100, opt, retries - 1, dfr);
    } else {
      dfr.reject(jqXhr, textStatus, errorThrown);
      handleFailure(opt, jqXhr, errorThrown);
    }
  };
}

function doAjax(options, retries, dfr) {
  var opt = setOpts(options);
  opt.beforeSend = beforeSend;
  return $.ajax(opt).then(dfr.resolve, failFilter(doAjax, opt, retries, dfr));
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

function add(options, retries, dfr) {
  queue.push([options, retries, dfr]);
  if (paused) {taskRunner();}
}

export default function retryAjax(options) {
  initGlobalHandler();
  var dfr = $.Deferred();
  if (options) {add(options, 10, dfr);}
  return dfr.promise();
}

import on from '../common/on';
import partial from '../common/partial';

var paused = true;
var queue = [];

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

function failFilter(fn, opt, retries, dfr) {
  return function(jqXhr, textStatus, errorThrown) {
    if (retries > 0 && jqXhr.status === 503) {
      setTimeout(fn, 100, opt, retries - 1, dfr);
    } else {
      dfr.reject(jqXhr, textStatus, errorThrown);
    }
  };
}

function doAjax(options, retries, dfr) {
  var opt = setOpts(options);
  opt.beforeSend = beforeSend;
  return $.ajax(opt).pipe(dfr.resolve, failFilter(doAjax, opt, retries, dfr));
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

function add(options, retries, dfr) {
  queue.push([options, retries, dfr]);
  if (paused) {taskRunner();}
}

export default function retryAjax(options) {
  var dfr = $.Deferred();
  if (options) {add(options, 10, dfr);}
  return dfr.promise();
}

if (typeof jQuery !== 'undefined') {
  $(document).ajaxComplete(function() {
    taskRunner();
  });
}

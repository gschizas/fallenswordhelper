var paused = true;
var queue = [];

function beforeSend(xhr) {
  window.addEventListener('beforeunload', function() {
    xhr.abort();
    queue = [];
  });
}

function doAjax(options, retries, dfr) {
  var opt;
  if (typeof options === 'string') {
    opt = {url: options};
  } else {
    opt = options;
  }
  opt.beforeSend = beforeSend;
  return $.ajax(opt).pipe(dfr.resolve,
    function(jqXhr, textStatus, errorThrown) {
      if (retries > 0 && jqXhr.status === 503) {
        setTimeout(doAjax, 100, opt, retries - 1, dfr);
      } else {
        dfr.reject(jqXhr, textStatus, errorThrown);
      }
    }
  );
}

function taskRunner() {
  if (queue.length === 0) {
    paused = true;
  } else {
    paused = false;
    if ($.active < 4) {
      var opts = queue.shift();
      doAjax.apply(null, opts);
      taskRunner();
    }
  }
}

function add(options, retries, dfr) {
  queue.push([options, retries, dfr]);
  if (paused) {taskRunner();}
}

export default function retryAjax(options) {
  var dfr = $.Deferred();
  add(options, 10, dfr);
  return dfr;
}

if (typeof $ !== 'undefined') {
  $(document).ajaxComplete(function() {
    taskRunner();
  });
}

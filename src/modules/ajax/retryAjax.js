var concurrent = 0;
var paused = true;
var queue = [];

function doAjax(options, retries, dfr) {
  return $.ajax(options).pipe(dfr.resolve,
    function(jqXhr, textStatus, errorThrown) {
      if (retries > 0) {
        setTimeout(doAjax, 100, options, retries - 1, dfr);
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
    if (concurrent < 6) {
      concurrent += 1;
      var opts = queue.shift();
      doAjax.apply(null, opts).always(function() {
        concurrent -= 1;
        taskRunner();
      });
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

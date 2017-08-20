
function doAjax(options, retries, dfr) {
  $.ajax(options).pipe(function(data) {dfr.resolve(data);}, function(jqXhr) {
    if (retries > 0) {
      setTimeout(doAjax, 100, options, retries - 1, dfr);
    } else {
      dfr.reject(jqXhr);
    }
  });
}

export default function retryAjax(options) {
  var dfr = $.Deferred();
  doAjax(options, 10, dfr);
  return dfr;
}

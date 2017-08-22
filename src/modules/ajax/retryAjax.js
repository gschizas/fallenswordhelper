
function doAjax(options, retries, dfr) {
  $.ajax(options).pipe(function(data, textStatus, jqXHR) {
    dfr.resolve(data, textStatus, jqXHR);
  }, function(jqXhr, textStatus, errorThrown) {
    if (retries > 0) {
      setTimeout(doAjax, 100, options, retries - 1, dfr);
    } else {
      dfr.reject(jqXhr, textStatus, errorThrown);
    }
  });
}

export default function retryAjax(options) {
  var dfr = $.Deferred();
  doAjax(options, 10, dfr);
  return dfr;
}

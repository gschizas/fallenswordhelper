function url(opt) {
  if (opt.data) {return $.param(opt.data);}
  return opt.url;
}

function buildErrorMsg(opt, jqXhr, textStatus, errorThrown) {
  var xhrStatus = jqXhr.status + ' ' + jqXhr.statusText + ' - ';
  if (jqXhr.statusText === errorThrown.toString()) {
    return xhrStatus + url(opt);
  }
  var jqStatus = xhrStatus + textStatus + ' ' + errorThrown + ' - ' + url(opt);
  if (textStatus === 'parsererror') {
    return jqStatus + ' - ' + jqXhr.responseText;
  }
  return jqStatus;
}

export default class AjaxError extends Error {
  constructor([opt, jqXhr, textStatus, errorThrown], ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(buildErrorMsg(opt, jqXhr, textStatus, errorThrown), ...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AjaxError);
    }

    // Custom debugging information
    this.jqSettings = opt;
    this.jqXhr = jqXhr;
    this.jqTextStatus = textStatus;
    this.jqErrorThrown = errorThrown;
  }
}

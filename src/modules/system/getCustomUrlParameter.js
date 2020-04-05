import isUndefined from '../common/isUndefined';

function outputParamVal(param) {
  if (isUndefined(param)) { return true; }
  return param;
}

export default function getCustomUrlParameter(sPageURL, sParam) {
  const sURLVariables = sPageURL.split('&');
  let sParameterName;
  for (let i = 0; i < sURLVariables.length; i += 1) {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return outputParamVal(sParameterName[1]);
    }
  }
}

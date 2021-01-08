const ajaxReturnCode = (json) => ({
  ...json,
  r: json.s ? 0 : 1,
});

export default ajaxReturnCode;

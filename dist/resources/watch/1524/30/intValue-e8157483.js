function intValue(theText) {
  if (!theText) { return 0; }
  return Number(theText.replace(/,/g, ''));
}

export { intValue as i };
//# sourceMappingURL=intValue-e8157483.js.map

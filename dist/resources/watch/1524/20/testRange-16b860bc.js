import { n as numberIsNaN } from './numberIsNaN-0a1aaf72.js';

function theValueIsValid(theValue, min, max) {
  return !numberIsNaN(theValue) && theValue > min && theValue < max;
}

function testRange(aValue, min, max) {
  const theValue = parseInt(aValue, 10);
  if (theValueIsValid(theValue, min, max)) {
    return theValue;
  }
}

export { testRange as t };
//# sourceMappingURL=testRange-16b860bc.js.map

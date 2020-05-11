import { n as numberIsNaN } from './numberIsNaN-825e71c2.js';

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
//# sourceMappingURL=testRange-c83c2609.js.map

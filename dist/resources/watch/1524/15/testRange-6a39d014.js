import { n as numberIsNaN } from './numberIsNaN-37f2e6cd.js';

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
//# sourceMappingURL=testRange-6a39d014.js.map

var re = /(\d+) HP remaining/;

export default function getImpsRemaining(hasSsi) { // Legacy - Old Map
  var impsRem = 0;
  if (hasSsi) {
    var textToTest = $(hasSsi).data('tipped');
    var impsRemainingRE = re.exec(textToTest);
    impsRem = Number(impsRemainingRE[1]);
  }
  return impsRem;
}

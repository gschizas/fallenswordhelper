import containsText from '../../common/containsText';
import {getElementById} from '../../common/getElement';
import getValue from '../../system/getValue';
import on from '../../common/on';
import setText from '../../common/setText';

var lineBreak = '';

function getNumberOfLine(bioContents, maxCharactersToShow) {
  return bioContents.substr(0, maxCharactersToShow).split('<br>\n').length - 1;
}

function bioIsTooSmall(bio, maxChar, lines, maxRows) {
  return bio.length <= maxChar && lines <= maxRows;
}

function findStartPosition(bioContents, maxRowsToShow) {
  return bioContents.split('<br>\n').slice(0, maxRowsToShow)
    .join('<br>\n').length;
}

function breakOnSpace(bioContents, maxCharactersToShow) {
  var breakPoint = bioContents.indexOf(' ', maxCharactersToShow) + 1;
  if (breakPoint === 0) {breakPoint = maxCharactersToShow;}
  lineBreak = '<br>';
  return breakPoint;
}

function getBreakpoint(bioContents, maxCharactersToShow) {
  var breakPoint = bioContents.indexOf('<br>', maxCharactersToShow) + 4;
  if (breakPoint === 3 || breakPoint > maxCharactersToShow + 65) {
    breakPoint = breakOnSpace(bioContents, maxCharactersToShow);
  }
  return breakPoint;
}

function foundHangingTag(closeTagIndex, openTagIndex) {
  return closeTagIndex !== -1 &&
    (openTagIndex === -1 || openTagIndex > closeTagIndex);
}

function getExtraCloseTags(bioEnd) {
  return ['b', 'i', 'u', 'span'].reduce(function(prev, tag) {
    var closeTagIndex = bioEnd.indexOf('</' + tag + '>');
    var openTagIndex = bioEnd.indexOf('<' + tag + '>');
    if (foundHangingTag(closeTagIndex, openTagIndex)) {
      return prev + '</' + tag + '>';
    }
    return prev;
  }, '');
}

function expandBio() {
  var bioExpander = getElementById('fshBioExpander');
  if (containsText('More ...', bioExpander)) {
    setText('Less ...', bioExpander);
  } else {
    setText('More ...', bioExpander);
  }
  getElementById('fshBioHidden').classList.toggle('fshHide');
}

function doCompression(bioCell, bioContents, maxCharactersToShow) {
  // find the end of next HTML tag after the max characters to show.
  var breakPoint = getBreakpoint(bioContents, maxCharactersToShow);
  var bioStart = bioContents.substring(0, breakPoint);
  var bioEnd = bioContents.substring(breakPoint, bioContents.length);
  var extraCloseHtml = getExtraCloseTags(bioEnd);
  var extraOpenHtml = extraCloseHtml.replace('/', '');
  bioCell.innerHTML = bioStart + extraCloseHtml + lineBreak +
    '<span id="fshBioExpander" class="sendLink">More ...</span><br>' +
    '<span class="fshHide" id="fshBioHidden">' + extraOpenHtml + bioEnd +
    '</span>';
  on(getElementById('fshBioExpander'), 'click', expandBio);
}

export default function compressBio(bioCell) {
  var bioContents = bioCell.innerHTML;
  var maxCharactersToShow = Number(getValue('maxCompressedCharacters'));
  var maxRowsToShow = Number(getValue('maxCompressedLines'));
  var numberOfLines = getNumberOfLine(bioContents, maxCharactersToShow);
  if (bioIsTooSmall(bioContents, maxCharactersToShow, numberOfLines,
    maxRowsToShow)) {return;}
  if (numberOfLines >= maxRowsToShow) {
    maxCharactersToShow = findStartPosition(bioContents, maxRowsToShow);
  }
  doCompression(bioCell, bioContents, maxCharactersToShow);
}

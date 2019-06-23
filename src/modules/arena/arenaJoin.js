import './arenaJoin.postcss';
import allowBack from '../ladder/allowBack';
import getArrayByTagName from '../common/getArrayByTagName';
import {getElementById} from '../common/getElement';
import getTextTrim from '../common/getTextTrim';
import {imageServer} from '../system/system';
import includes from '../common/includes';
import {injectArena} from './arena';
import insertElement from '../common/insertElement';
import insertElementAfterBegin from '../common/insertElementAfterBegin';
import insertHtmlBeforeEnd from '../common/insertHtmlBeforeEnd';
import isSelected from '../system/isSelected';
import on from '../common/on';
import {pCC} from '../support/layout';
import partial from '../common/partial';
import querySelector from '../common/querySelector';
import usesetup from '../app/arena/usesetup';
import view from '../app/arena/view';
import {createDiv, createSelect} from '../common/cElement';

let moveContainer;

function getContainer(thisCell) {
  if (!moveContainer) {
    moveContainer = insertElement(thisCell, createDiv());
  }
  return moveContainer;
}

const boolToString = e => String(Number(e));

const thisTournament = () => Number(getTextTrim(getArrayByTagName('b', pCC)
  .find(includes('Tournament #'))).match(/\d+/)[0]);

function injectImg(container, id) {
  insertHtmlBeforeEnd(container,
    '<img src="' + imageServer + '/pvp/' + String(id - 1) +
    '.gif" class="moveImg">');
}

function param(label, value) {
  return '<div>' + label + '<img src="' + imageServer +
    '/pvp/specials_' + boolToString(value) + '.gif"></div>';
}

function paramBox(thisArena) {
  return '<div class="flex">' +
      param('Specials', thisArena.specials) +
      param('Hell Forge', thisArena.hellforge) +
      param('Epic', thisArena.epic) +
    '</div>';
}

function thisOptions(current_set, e) {
  return '<option value="' + String(e.id) + '"' +
    isSelected(current_set.slots.join(), e.slots.join()) +
    '>' + e.name + '</option>';
}

function doMoves(thisSet, thisCell) {
  const container = getContainer(thisCell);
  container.innerHTML = '';
  thisSet.slots.forEach(partial(injectImg, container));
}

function onchange(r, thisCell, evt) {
  // console.log(evt.target.value);
  const thisSet = r.sets.find(e => e.id === Number(evt.target.value));
  if (thisSet) {
    usesetup(evt.target.value).then(function(json) {
      // console.log(json);
      if (json.s) {
        doMoves(thisSet, thisCell);
      }
    });
  }
}

function doSelect(r, thisCell) {
  if (r.sets.length > 0) {
    const thisSelect = createSelect({
      innerHTML: r.sets.map(partial(thisOptions, r.current_set))
        .join('')
    });
    on(thisSelect, 'change', partial(onchange, r, thisCell));
    const div = createDiv();
    insertElement(div, thisSelect);
    insertElementAfterBegin(thisCell.children[0], div);
  }
}

function showMoves(r, thisCell) {
  // console.log('r', r);
  const tourney = thisTournament();
  // console.log('tourney', tourney);
  const thisArena = r.arenas.find(e => e.id === tourney);
  // console.log('thisArena', thisArena);
  thisCell.setAttribute('align', 'center');
  insertHtmlBeforeEnd(thisCell, paramBox(thisArena));
  if (thisArena.specials) {
    doSelect(r, thisCell);
    doMoves(r.current_set, thisCell);
  }
}

function findCell(json) {
  // console.log('json', json);
  const thisCell = querySelector('#pCC > form > table tr:nth-of-type(7) td');
  if (json.r && thisCell) {showMoves(json.r, thisCell);}
}

export default function arenaJoin() {
  //#if _DEV  //  arena Join
  console.log('arena Join'); // eslint-disable-line no-console
  //#endif
  var tabs = getElementById('arenaTypeTabs');
  if (tabs) {
    injectArena();
  } else {
    allowBack();
    //#if _DEV  //  arena Join
    view().then(findCell);
    //#endif
  }
}

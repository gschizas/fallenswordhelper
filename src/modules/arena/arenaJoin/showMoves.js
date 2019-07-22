import {imageServer} from '../../system/system';
import insertElement from '../../common/insertElement';
import insertElementAfterBegin from '../../common/insertElementAfterBegin';
import insertHtmlBeforeEnd from '../../common/insertHtmlBeforeEnd';
import isSelected from '../../system/isSelected';
import on from '../../common/on';
import partial from '../../common/partial';
import usesetup from '../../app/arena/usesetup';
import {createDiv, createSelect} from '../../common/cElement';

let moveContainer;

function getContainer(movesController) {
  if (!moveContainer) {
    moveContainer = insertElement(movesController, createDiv());
  }
  return moveContainer;
}

function injectImg(container, id) {
  insertHtmlBeforeEnd(container,
    '<img src="' + imageServer + '/pvp/' + String(id - 1) +
    '.gif" class="moveImg">');
}

function thisOptions(current_set, e) {
  return '<option value="' + String(e.id) + '"' +
    isSelected(current_set.slots.join(), e.slots.join()) +
    '>' + e.name + '</option>';
}

function doMoves(thisSet, movesController) {
  const container = getContainer(movesController);
  container.innerHTML = '';
  thisSet.slots.forEach(partial(injectImg, container));
}

function doChange(movesController, evt, thisSet) {
  usesetup(evt.target.value).then(json => {
    if (json.s) {
      doMoves(thisSet, movesController);
    }
  });
}

function onchange(r, movesController, evt) {
  const thisSet = r.sets.find(e => e.id === Number(evt.target.value));
  if (thisSet) {doChange(movesController, evt, thisSet);}
}

function doSelect(r, movesController) {
  if (r.sets.length > 0) {
    const thisSelect = createSelect({
      innerHTML: r.sets.map(partial(thisOptions, r.current_set))
        .join('')
    });
    on(thisSelect, 'change', partial(onchange, r, movesController));
    const div = createDiv({className: 'flex'});
    insertElement(div, thisSelect);
    insertElementAfterBegin(movesController, div);
  }
}

export default function showMoves(r, thisCell, thisArena) {
  if (thisArena.specials) {
    const movesController = createDiv({className: 'flex'});
    doSelect(r, movesController);
    doMoves(r.current_set, movesController);
    insertElement(thisCell, movesController);
  }
}

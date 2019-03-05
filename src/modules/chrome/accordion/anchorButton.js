import insertAfterParent from './insertAfterParent';
import insertElement from '../../common/insertElement';
import insertElementAfter from '../../common/insertElementAfter';
import jQueryDialog from '../jQueryDialog';
import on from '../../common/on';
import partial from '../../common/partial';
import {sendEvent} from '../../support/fshGa';
import {createAnchor, createLi} from '../../common/cElement';

function openDialog(text, fn) {
  sendEvent('accordion', text);
  jQueryDialog(fn);
}

function insertAdjElement(parent, listItem) {
  insertElementAfter(listItem, parent);
}

export default function anchorButton(navLvl, text, fn, target) {
  var li = createLi({className: 'nav-level-' + navLvl});
  var al = createAnchor({
    className: 'nav-link fshPoint',
    textContent: text
  });
  on(al, 'click', partial(openDialog, text, fn));
  insertElement(li, al);
  insertAfterParent(target, insertAdjElement, li);
}

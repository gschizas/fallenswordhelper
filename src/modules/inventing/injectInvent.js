import doinvent from '../app/inventing/doinvent';
import {getElementById} from '../common/getElement';
import jsonFail from '../common/jsonFail';
import on from '../common/on';
import outputResult from '../common/outputResult';

function processResult(r) {
  if (r.item) {
    return '<span class="fshGreen">You successfully invented the item [' +
      r.item.n + '].</span>';
  }
  return '<span class="fshRed">You have failed to invent the item.</span>';
}

function quickInventDone(json) {
  var inventResult = getElementById('invent_Result');
  if (jsonFail(json, inventResult)) {return;}
  outputResult(processResult(json.r), inventResult);
}

function quickInvent() { // Legacy
  var amountToInvent = $('#invent_amount').attr('value');
  var recipeID = $('input[name="recipe_id"]').attr('value');
  $('#invet_Result_label').html('Inventing ' + amountToInvent + ' Items');
  for (var i = 0; i < amountToInvent; i += 1) {
    doinvent(recipeID).done(quickInventDone);
  }
}

export default function injectInvent() { // Bad jQuery
  var selector = '<tr><td align="center">Select how many to quick ' +
    'invent<input value=1 id="invent_amount" name="invent_amount" ' +
    'size=3 class="custominput"></td></tr>' +
    '<tr><td align="center"><input id="quickInvent" value="Quick ' +
    'invent items" class="custombutton" type="submit"></td></tr>' + // button to invent
    '<tr><td colspan=6 align="center"><span id="invet_Result_label">' +
    '</span><ol id="invent_Result"></ol></td></tr>';
  $('input[name="recipe_id"]').closest('tbody').append(selector);
  var qi = getElementById('quickInvent');
  if (qi) {
    on(qi, 'click', quickInvent, true);
  }
}

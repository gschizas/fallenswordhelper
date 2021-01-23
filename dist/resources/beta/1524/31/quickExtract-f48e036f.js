import{x as t,A as e,h as n,o as i,p as s,t as r,aN as a,y as o,aj as c,bD as f}from"./calfSystem-47fc08ae.js"
import{c as d}from"./createTable-c916e6a3.js"
import{d as l}from"./daUseItem-f2fce1a1.js"
import{e as m}from"./eventHandler5-32312767.js"
import{g as u}from"./getInventory-a6ab3edc.js"
import{j as p}from"./jConfirm-50b22e17.js"
import{j as h,o as x}from"./jsonFail-2c706648.js"
import{s as b}from"./selfIdIs-16c65443.js"
import"./cmdExport-ca6a6b3e.js"
import"./indexAjaxJson-be24760c.js"
let y,_,j,v,I,$,g
function E(t,e){return e.inv_id===t}function S(t){return`${t.amount} x ${f[t.type]}`}function k(t,e){var n
h(e,g)||(!function(t){const e=j.findIndex(r(E,t))
e>=0&&j.splice(e,1)}(t),x((n=e.r).item?`You successfully extracted 1 '${n.item.n}' component(s) from 1 resource(s).</span>`:n.frags?`You gained ${n.frags.map(S).join(", ")} Fragments by opening the Fragment Stash.`:'<span class="fshRed">You failed to extract any components from resource(s).</span>',g))}function w(t){l(t).then(r(k,t))}function D(t){const n=$[t.id.replace("fshExtr","")].invIDs
e(`extracting all ${n.length} resources`,t.parentNode),n.forEach(w)}function A(t){p("Extract Resources","Are you sure you want to extract all similar items?",r(D,t))}function F(t){return function(t){return I&&-1!==t.folder_id}(t)||function(t){return!v&&t.is_in_st}(t)}function q(t,e){return F(e)||(t[e.item_id]?t[e.item_id].invIDs.push(e.inv_id):t[e.item_id]={invIDs:[e.inv_id],inv_id:e.inv_id,item_name:e.item_name}),t}function C(t,e){const n=$[e]
return`${t}<tr><td class="fshCenter"><span class="smallLink" id="fshExtr${e}">Extract all ${n.invIDs.length}</span></td><td><img src="${c}items/${e}.gif" class="tip-dynamic" data-tipped="fetchitem.php?item_id=${e}&inv_id=${n.inv_id}&t=1&p=${_}" border=0></td><td>${n.item_name}</td></tr>`}function M(){if(!j)return
$=j.reduce(q,{})
let t='<tr><th width="20%">Actions</th><th colspan="2">Items</th></tr><tr><td colspan="3"><ol id="qeresult"></ol></td></tr>'
t+=a($).reduce(C,""),e(t,y),g=o("qeresult")}function Y(t){return"Zombie Coffin"===t.item_name||12===t.type||16===t.type}function H(t){_=t.player_id,j=t.items.filter(Y),M()}function N(){v=!v,M()}function O(){I=!I,M()}function R(t){return t.id.startsWith("fshExtr")}function T(r){if(t())return
const a=r||s
e('<div class="qeHead"><b>Quick Extract</b></div>Select which type of plants you wish to extract all of. Only select extractable resources.<br><label><input type="checkbox" id="fshInSt" checked> Select items in ST</label>&nbsp;&nbsp;<label><input type="checkbox" id="fshInMain" checked> Only extract items in Main Folder</label>',a),y=d({width:"100%"}),n(a,y),v=!0,I=!0,i(a,m([[b("fshInSt"),N],[b("fshInMain"),O],[R,A]])),u().then(H)}export default T
//# sourceMappingURL=quickExtract-f48e036f.js.map

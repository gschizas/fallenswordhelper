import{x as t,A as e,f as n,o as i,t as s,p as r,aq as a,y as o,aD as c,bA as f}from"./calfSystem-05554bae.js"
import{c as d}from"./createTable-db205e04.js"
import"./indexAjaxJson-c1c386d4.js"
import{e as l}from"./eventHandler5-c51216c0.js"
import"./cmdExport-9dcb6bc5.js"
import{g as m}from"./getInventory-dd72b860.js"
import{s as u}from"./selfIdIs-0f139bfb.js"
import{j as p,o as h}from"./jsonFail-65f32db5.js"
import{j as b}from"./jConfirm-a0294003.js"
import{d as x}from"./daUseItem-708f5aaa.js"
let y,_,j,v,I,g,$
function E(t,e){return e.inv_id===t}function S(t){return`${t.amount} x ${f[t.type]}`}function k(t,e){var n
p(e,$)||(!function(t){const e=j.findIndex(s(E,t))
e>=0&&j.splice(e,1)}(t),h((n=e.r).item?`You successfully extracted 1 '${n.item.n}' component(s) from 1 resource(s).</span>`:n.frags?`You gained ${n.frags.map(S).join(", ")} Fragments by opening the Fragment Stash.`:'<span class="fshRed">You failed to extract any components from resource(s).</span>',$))}function w(t){x(t).then(s(k,t))}function A(t){const n=g[t.id.replace("fshExtr","")].invIDs
e(`extracting all ${n.length} resources`,t.parentNode),n.forEach(w)}function D(t){b("Extract Resources","Are you sure you want to extract all similar items?",s(A,t))}function q(t){return function(t){return I&&-1!==t.folder_id}(t)||function(t){return!v&&t.is_in_st}(t)}function F(t,e){return q(e)||(t[e.item_id]?t[e.item_id].invIDs.push(e.inv_id):t[e.item_id]={invIDs:[e.inv_id],inv_id:e.inv_id,item_name:e.item_name}),t}function C(t,e){const n=g[e]
return t+'<tr><td class="fshCenter"><span class="smallLink"'+` id="fshExtr${e}">Extract all ${n.invIDs.length}</span></td>`+`<td><img src="${c}items/${e}.gif" class="tip-dynamic" data-tipped="`+`fetchitem.php?item_id=${e}&inv_id=${n.inv_id}&t=1&p=${_}" border=0></td><td>${n.item_name}</td></tr>`}function M(){if(!j)return
g=j.reduce(F,{})
let t='<tr><th width="20%">Actions</th><th colspan="2">Items</th></tr><tr><td colspan="3"><ol id="qeresult"></ol></td></tr>'
t+=a(g).reduce(C,""),e(t,y),$=o("qeresult")}function Y(t){return"Zombie Coffin"===t.item_name||12===t.type||16===t.type}function H(t){_=t.player_id,j=t.items.filter(Y),M()}function O(){v=!v,M()}function R(){I=!I,M()}function T(t){return t.id.startsWith("fshExtr")}export default function(s){if(t())return
const a=s||r
e('<div class="qeHead"><b>Quick Extract</b></div>Select which type of plants you wish to extract all of. Only select extractable resources.<br><label><input type="checkbox" id="fshInSt" checked> Select items in ST</label>&nbsp;&nbsp;<label><input type="checkbox" id="fshInMain" checked> Only extract items in Main Folder</label>',a),y=d({width:"100%"}),n(a,y),v=!0,I=!0,i(a,l([[u("fshInSt"),O],[u("fshInMain"),R],[T,D]])),m().then(H)}
//# sourceMappingURL=quickExtract-c7288df4.js.map

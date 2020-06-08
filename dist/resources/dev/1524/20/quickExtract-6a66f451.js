import{x as t,A as e,f as n,o as i,t as s,p as r,au as a,y as o,aH as c,bC as d}from"./calfSystem-a2862afc.js"
import{c as f}from"./createTable-6dbc7d62.js"
import"./indexAjaxJson-afc1ac85.js"
import{e as l}from"./eventHandler5-0d938057.js"
import"./cmdExport-356fd6f3.js"
import"./guildStore-559bcd67.js"
import{g as m}from"./getInventory-77b8ed5e.js"
import{s as u}from"./selfIdIs-7f51e683.js"
import{j as p,o as h}from"./jsonFail-7ddb835f.js"
import{j as b}from"./jConfirm-40a47e4d.js"
import{d as x}from"./daUseItem-10f8bb4a.js"
let y,_,j,v,g,I,$
function E(t,e){return e.inv_id===t}function S(t){return`${t.amount} x ${d[t.type]}`}function k(t,e){var n
p(e,$)||(!function(t){const e=j.findIndex(s(E,t))
e>=0&&j.splice(e,1)}(t),h((n=e.r).item?`You successfully extracted 1 '${n.item.n}' component(s) from 1 resource(s).</span>`:n.frags?`You gained ${n.frags.map(S).join(", ")} Fragments by opening the Fragment Stash.`:'<span class="fshRed">You failed to extract any components from resource(s).</span>',$))}function w(t){x(t).then(s(k,t))}function A(t){const n=I[t.id.replace("fshExtr","")].invIDs
e(`extracting all ${n.length} resources`,t.parentNode),n.forEach(w)}function C(t){b("Extract Resources","Are you sure you want to extract all similar items?",s(A,t))}function D(t){return function(t){return g&&-1!==t.folder_id}(t)||function(t){return!v&&t.is_in_st}(t)}function F(t,e){return D(e)||(t[e.item_id]?t[e.item_id].invIDs.push(e.inv_id):t[e.item_id]={invIDs:[e.inv_id],inv_id:e.inv_id,item_name:e.item_name}),t}function q(t,e){const n=I[e]
return t+'<tr><td class="fshCenter"><span class="smallLink"'+` id="fshExtr${e}">Extract all ${n.invIDs.length}</span></td>`+`<td><img src="${c}items/${e}.gif" class="tip-dynamic" data-tipped="`+`fetchitem.php?item_id=${e}&inv_id=${n.inv_id}&t=1&p=${_}" border=0></td><td>${n.item_name}</td></tr>`}function H(){if(!j)return
I=j.reduce(F,{})
let t='<tr><th width="20%">Actions</th><th colspan="2">Items</th></tr><tr><td colspan="3"><ol id="qeresult"></ol></td></tr>'
t+=a(I).reduce(q,""),e(t,y),$=o("qeresult")}function M(t){return"Zombie Coffin"===t.item_name||12===t.type||16===t.type}function Y(t){_=t.player_id,j=t.items.filter(M),H()}function O(){v=!v,H()}function R(){g=!g,H()}function T(t){return t.id.startsWith("fshExtr")}export default function(s){if(t())return
const a=s||r
e('<div class="qeHead"><b>Quick Extract</b></div>Select which type of plants you wish to extract all of. Only select extractable resources.<br><label><input type="checkbox" id="fshInSt" checked> Select items in ST</label>&nbsp;&nbsp;<label><input type="checkbox" id="fshInMain" checked> Only extract items in Main Folder</label>',a),y=f({width:"100%"}),n(a,y),v=!0,g=!0,i(a,l([[u("fshInSt"),O],[u("fshInMain"),R],[T,C]])),m().then(Y)}
//# sourceMappingURL=quickExtract-6a66f451.js.map

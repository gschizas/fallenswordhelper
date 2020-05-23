import{z as t,C as e,h as n,o as i,v as s,p as r,av as a,A as o,aF as c,c0 as f}from"./calfSystem-e6a24264.js"
import{c as l}from"./createTable-f54d2e50.js"
import{j as d}from"./jConfirm-11b08840.js"
import{d as u}from"./daUseItem-a5051f6e.js"
import{e as m}from"./eventHandler5-48311a14.js"
import{g as p}from"./getInventory-b185a280.js"
import{s as h}from"./selfIdIs-867a3670.js"
import{j as _,o as b}from"./jsonFail-164e0338.js"
let v,x,y,I,g,j,$
function E(t,e){return e.inv_id===t}function S(t){return`${t.amount} x ${f[t.type]}`}function k(t,e){var n
_(e,$)||(!function(t){const e=y.findIndex(s(E,t))
e>=0&&y.splice(e,1)}(t),b((n=e.r).item?`You successfully extracted 1 '${n.item.n}' component(s) from 1 resource(s).</span>`:n.frags?`You gained ${n.frags.map(S).join(", ")} Fragments by opening the Fragment Stash.`:'<span class="fshRed">You failed to extract any components from resource(s).</span>',$))}function w(t){u(t).then(s(k,t))}function F(t){const n=j[t.id.replace("fshExtr","")].invIDs
e(`extracting all ${n.length} resources`,t.parentNode),n.forEach(w)}function C(t){d("Extract Resources","Are you sure you want to extract all similar items?",s(F,t))}function D(t){return function(t){return g&&-1!==t.folder_id}(t)||function(t){return!I&&t.is_in_st}(t)}function q(t,e){return D(e)||(t[e.item_id]?t[e.item_id].invIDs.push(e.inv_id):t[e.item_id]={invIDs:[e.inv_id],inv_id:e.inv_id,item_name:e.item_name}),t}function A(t,e){const n=j[e]
return t+'<tr><td class="fshCenter"><span class="smallLink"'+` id="fshExtr${e}">Extract all ${n.invIDs.length}</span></td>`+`<td><img src="${c}items/${e}.gif" class="tip-dynamic" data-tipped="`+`fetchitem.php?item_id=${e}&inv_id=${n.inv_id}&t=1&p=${x}" border=0></td><td>${n.item_name}</td></tr>`}function M(){if(!y)return
j=y.reduce(q,{})
let t='<tr><th width="20%">Actions</th><th colspan="2">Items</th></tr><tr><td colspan="3"><ol id="qeresult"></ol></td></tr>'
t+=a(j).reduce(A,""),e(t,v),$=o("qeresult")}function Y(t){return"Zombie Coffin"===t.item_name||12===t.type||16===t.type}function H(t){x=t.player_id,y=t.items.filter(Y),M()}function O(){I=!I,M()}function R(){g=!g,M()}function T(t){return t.id.startsWith("fshExtr")}export default function(s){if(t())return
const a=s||r
e('<div class="qeHead"><b>Quick Extract</b></div>Select which type of plants you wish to extract all of. Only select extractable resources.<br><label><input type="checkbox" id="fshInSt" checked> Select items in ST</label>&nbsp;&nbsp;<label><input type="checkbox" id="fshInMain" checked> Only extract items in Main Folder</label>',a),v=l({width:"100%"}),n(a,v),I=!0,g=!0,i(a,m([[h("fshInSt"),O],[h("fshInMain"),R],[T,C]])),p().then(H)}
//# sourceMappingURL=quickExtract-f0860859.js.map

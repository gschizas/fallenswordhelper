import{y as t,B as e,f as n,o as i,u as s,p as r,au as a,z as o,aE as c,c4 as f}from"./calfSystem-371c414c.js"
import{c as d}from"./createTable-ad174066.js"
import{j as l}from"./jConfirm-4672f8e0.js"
import{d as u}from"./daUseItem-a54df2cc.js"
import{e as m}from"./eventHandler5-dd4a434f.js"
import{g as p}from"./getInventory-998297f9.js"
import{s as h}from"./selfIdIs-04b7ffe8.js"
import{j as y,o as _}from"./jsonFail-5c3d9e04.js"
let x,b,v,I,g,j,$
function E(t,e){return e.inv_id===t}function S(t){return`${t.amount} x ${f[t.type]}`}function k(t,e){var n
y(e,$)||(!function(t){const e=v.findIndex(s(E,t))
e>=0&&v.splice(e,1)}(t),_((n=e.r).item?`You successfully extracted 1 '${n.item.n}' component(s) from 1 resource(s).</span>`:n.frags?`You gained ${n.frags.map(S).join(", ")} Fragments by opening the Fragment Stash.`:'<span class="fshRed">You failed to extract any components from resource(s).</span>',$))}function w(t){u(t).then(s(k,t))}function D(t){const n=j[t.id.replace("fshExtr","")].invIDs
e(`extracting all ${n.length} resources`,t.parentNode),n.forEach(w)}function F(t){l("Extract Resources","Are you sure you want to extract all similar items?",s(D,t))}function q(t){return function(t){return g&&-1!==t.folder_id}(t)||function(t){return!I&&t.is_in_st}(t)}function C(t,e){return q(e)||(t[e.item_id]?t[e.item_id].invIDs.push(e.inv_id):t[e.item_id]={invIDs:[e.inv_id],inv_id:e.inv_id,item_name:e.item_name}),t}function M(t,e){const n=j[e]
return t+'<tr><td class="fshCenter"><span class="smallLink"'+` id="fshExtr${e}">Extract all ${n.invIDs.length}</span></td>`+`<td><img src="${c}items/${e}.gif" class="tip-dynamic" data-tipped="`+`fetchitem.php?item_id=${e}&inv_id=${n.inv_id}&t=1&p=${b}" border=0></td><td>${n.item_name}</td></tr>`}function Y(){if(!v)return
j=v.reduce(C,{})
let t='<tr><th width="20%">Actions</th><th colspan="2">Items</th></tr><tr><td colspan="3"><ol id="qeresult"></ol></td></tr>'
t+=a(j).reduce(M,""),e(t,x),$=o("qeresult")}function A(t){return"Zombie Coffin"===t.item_name||12===t.type||16===t.type}function H(t){b=t.player_id,v=t.items.filter(A),Y()}function O(){I=!I,Y()}function R(){g=!g,Y()}function T(t){return t.id.startsWith("fshExtr")}export default function(s){if(t())return
const a=s||r
e('<div class="qeHead"><b>Quick Extract</b></div>Select which type of plants you wish to extract all of. Only select extractable resources.<br><label><input type="checkbox" id="fshInSt" checked> Select items in ST</label>&nbsp;&nbsp;<label><input type="checkbox" id="fshInMain" checked> Only extract items in Main Folder</label>',a),x=d({width:"100%"}),n(a,x),I=!0,g=!0,i(a,m([[h("fshInSt"),O],[h("fshInMain"),R],[T,F]])),p().then(H)}
//# sourceMappingURL=quickExtract-993c21c5.js.map

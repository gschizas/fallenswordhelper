import{z as t,C as e,h as n,o as i,v as s,p as r,ay as a,A as o,aI as c,c9 as f}from"./calfSystem-fd021443.js"
import{c as d}from"./createTable-c0a20196.js"
import{j as l}from"./jConfirm-ca6a99a6.js"
import{d as u}from"./daUseItem-602cd31a.js"
import{e as m}from"./eventHandler5-29815432.js"
import"./guildStore-8c50aca3.js"
import{g as p}from"./getInventory-610adf6e.js"
import{s as h}from"./selfIdIs-e22a1c50.js"
import{j as y,o as _}from"./jsonFail-2f5cf40c.js"
let x,v,b,I,g,j,$
function S(t,e){return e.inv_id===t}function E(t){return`${t.amount} x ${f[t.type]}`}function k(t,e){var n
y(e,$)||(!function(t){const e=b.findIndex(s(S,t))
e>=0&&b.splice(e,1)}(t),_((n=e.r).item?`You successfully extracted 1 '${n.item.n}' component(s) from 1 resource(s).</span>`:n.frags?`You gained ${n.frags.map(E).join(", ")} Fragments by opening the Fragment Stash.`:'<span class="fshRed">You failed to extract any components from resource(s).</span>',$))}function w(t){u(t).then(s(k,t))}function C(t){const n=j[t.id.replace("fshExtr","")].invIDs
e(`extracting all ${n.length} resources`,t.parentNode),n.forEach(w)}function D(t){l("Extract Resources","Are you sure you want to extract all similar items?",s(C,t))}function F(t){return function(t){return g&&-1!==t.folder_id}(t)||function(t){return!I&&t.is_in_st}(t)}function q(t,e){return F(e)||(t[e.item_id]?t[e.item_id].invIDs.push(e.inv_id):t[e.item_id]={invIDs:[e.inv_id],inv_id:e.inv_id,item_name:e.item_name}),t}function A(t,e){const n=j[e]
return t+'<tr><td class="fshCenter"><span class="smallLink"'+` id="fshExtr${e}">Extract all ${n.invIDs.length}</span></td>`+`<td><img src="${c}items/${e}.gif" class="tip-dynamic" data-tipped="`+`fetchitem.php?item_id=${e}&inv_id=${n.inv_id}&t=1&p=${v}" border=0></td><td>${n.item_name}</td></tr>`}function M(){if(!b)return
j=b.reduce(q,{})
let t='<tr><th width="20%">Actions</th><th colspan="2">Items</th></tr><tr><td colspan="3"><ol id="qeresult"></ol></td></tr>'
t+=a(j).reduce(A,""),e(t,x),$=o("qeresult")}function Y(t){return"Zombie Coffin"===t.item_name||12===t.type||16===t.type}function H(t){v=t.player_id,b=t.items.filter(Y),M()}function O(){I=!I,M()}function R(){g=!g,M()}function T(t){return t.id.startsWith("fshExtr")}export default function(s){if(t())return
const a=s||r
e('<div class="qeHead"><b>Quick Extract</b></div>Select which type of plants you wish to extract all of. Only select extractable resources.<br><label><input type="checkbox" id="fshInSt" checked> Select items in ST</label>&nbsp;&nbsp;<label><input type="checkbox" id="fshInMain" checked> Only extract items in Main Folder</label>',a),x=d({width:"100%"}),n(a,x),I=!0,g=!0,i(a,m([[h("fshInSt"),O],[h("fshInMain"),R],[T,D]])),p().then(H)}
//# sourceMappingURL=quickExtract-601a99ff.js.map

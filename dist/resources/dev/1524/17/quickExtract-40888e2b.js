import{w as t,z as e,f as n,o as i,s,p as r,au as a,x as o,aG as c,bH as d}from"./calfSystem-1c103624.js"
import{c as f}from"./createTable-930c2471.js"
import{j as l}from"./jConfirm-dcf37b4e.js"
import"./indexAjaxJson-ed231bc3.js"
import{d as m}from"./daUseItem-81f661aa.js"
import{e as u}from"./eventHandler5-130c1d57.js"
import"./cmdExport-15d3dc9a.js"
import"./guildStore-17582a77.js"
import{g as p}from"./getInventory-baeadfc2.js"
import{s as h}from"./selfIdIs-f0ae0978.js"
import{j as x,o as b}from"./jsonFail-8ced26cc.js"
let _,y,j,v,g,I,$
function E(t,e){return e.inv_id===t}function S(t){return`${t.amount} x ${d[t.type]}`}function k(t,e){var n
x(e,$)||(!function(t){const e=j.findIndex(s(E,t))
e>=0&&j.splice(e,1)}(t),b((n=e.r).item?`You successfully extracted 1 '${n.item.n}' component(s) from 1 resource(s).</span>`:n.frags?`You gained ${n.frags.map(S).join(", ")} Fragments by opening the Fragment Stash.`:'<span class="fshRed">You failed to extract any components from resource(s).</span>',$))}function w(t){m(t).then(s(k,t))}function D(t){const n=I[t.id.replace("fshExtr","")].invIDs
e(`extracting all ${n.length} resources`,t.parentNode),n.forEach(w)}function F(t){l("Extract Resources","Are you sure you want to extract all similar items?",s(D,t))}function q(t){return function(t){return g&&-1!==t.folder_id}(t)||function(t){return!v&&t.is_in_st}(t)}function A(t,e){return q(e)||(t[e.item_id]?t[e.item_id].invIDs.push(e.inv_id):t[e.item_id]={invIDs:[e.inv_id],inv_id:e.inv_id,item_name:e.item_name}),t}function C(t,e){const n=I[e]
return t+'<tr><td class="fshCenter"><span class="smallLink"'+` id="fshExtr${e}">Extract all ${n.invIDs.length}</span></td>`+`<td><img src="${c}items/${e}.gif" class="tip-dynamic" data-tipped="`+`fetchitem.php?item_id=${e}&inv_id=${n.inv_id}&t=1&p=${y}" border=0></td><td>${n.item_name}</td></tr>`}function H(){if(!j)return
I=j.reduce(A,{})
let t='<tr><th width="20%">Actions</th><th colspan="2">Items</th></tr><tr><td colspan="3"><ol id="qeresult"></ol></td></tr>'
t+=a(I).reduce(C,""),e(t,_),$=o("qeresult")}function M(t){return"Zombie Coffin"===t.item_name||12===t.type||16===t.type}function Y(t){y=t.player_id,j=t.items.filter(M),H()}function O(){v=!v,H()}function R(){g=!g,H()}function T(t){return t.id.startsWith("fshExtr")}export default function(s){if(t())return
const a=s||r
e('<div class="qeHead"><b>Quick Extract</b></div>Select which type of plants you wish to extract all of. Only select extractable resources.<br><label><input type="checkbox" id="fshInSt" checked> Select items in ST</label>&nbsp;&nbsp;<label><input type="checkbox" id="fshInMain" checked> Only extract items in Main Folder</label>',a),_=f({width:"100%"}),n(a,_),v=!0,g=!0,i(a,u([[h("fshInSt"),O],[h("fshInMain"),R],[T,F]])),p().then(Y)}
//# sourceMappingURL=quickExtract-40888e2b.js.map

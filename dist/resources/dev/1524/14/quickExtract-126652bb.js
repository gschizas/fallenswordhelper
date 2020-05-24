import{y as t,B as e,f as n,o as i,u as s,p as r,ax as a,z as o,aH as c,c8 as f}from"./calfSystem-d96a3efd.js"
import{c as d}from"./createTable-13920811.js"
import{j as l}from"./jConfirm-ad7882ae.js"
import{d as u}from"./daUseItem-4a0793b9.js"
import{e as m}from"./eventHandler5-d9435eb5.js"
import"./guildStore-0302347f.js"
import{g as p}from"./getInventory-1d86043b.js"
import{s as h}from"./selfIdIs-1c8b1e34.js"
import{j as b,o as x}from"./jsonFail-7894563a.js"
let y,_,v,g,j,I,$
function S(t,e){return e.inv_id===t}function E(t){return`${t.amount} x ${f[t.type]}`}function k(t,e){var n
b(e,$)||(!function(t){const e=v.findIndex(s(S,t))
e>=0&&v.splice(e,1)}(t),x((n=e.r).item?`You successfully extracted 1 '${n.item.n}' component(s) from 1 resource(s).</span>`:n.frags?`You gained ${n.frags.map(E).join(", ")} Fragments by opening the Fragment Stash.`:'<span class="fshRed">You failed to extract any components from resource(s).</span>',$))}function w(t){u(t).then(s(k,t))}function D(t){const n=I[t.id.replace("fshExtr","")].invIDs
e(`extracting all ${n.length} resources`,t.parentNode),n.forEach(w)}function F(t){l("Extract Resources","Are you sure you want to extract all similar items?",s(D,t))}function q(t){return function(t){return j&&-1!==t.folder_id}(t)||function(t){return!g&&t.is_in_st}(t)}function C(t,e){return q(e)||(t[e.item_id]?t[e.item_id].invIDs.push(e.inv_id):t[e.item_id]={invIDs:[e.inv_id],inv_id:e.inv_id,item_name:e.item_name}),t}function H(t,e){const n=I[e]
return t+'<tr><td class="fshCenter"><span class="smallLink"'+` id="fshExtr${e}">Extract all ${n.invIDs.length}</span></td>`+`<td><img src="${c}items/${e}.gif" class="tip-dynamic" data-tipped="`+`fetchitem.php?item_id=${e}&inv_id=${n.inv_id}&t=1&p=${_}" border=0></td><td>${n.item_name}</td></tr>`}function M(){if(!v)return
I=v.reduce(C,{})
let t='<tr><th width="20%">Actions</th><th colspan="2">Items</th></tr><tr><td colspan="3"><ol id="qeresult"></ol></td></tr>'
t+=a(I).reduce(H,""),e(t,y),$=o("qeresult")}function Y(t){return"Zombie Coffin"===t.item_name||12===t.type||16===t.type}function A(t){_=t.player_id,v=t.items.filter(Y),M()}function O(){g=!g,M()}function R(){j=!j,M()}function T(t){return t.id.startsWith("fshExtr")}export default function(s){if(t())return
const a=s||r
e('<div class="qeHead"><b>Quick Extract</b></div>Select which type of plants you wish to extract all of. Only select extractable resources.<br><label><input type="checkbox" id="fshInSt" checked> Select items in ST</label>&nbsp;&nbsp;<label><input type="checkbox" id="fshInMain" checked> Only extract items in Main Folder</label>',a),y=d({width:"100%"}),n(a,y),g=!0,j=!0,i(a,m([[h("fshInSt"),O],[h("fshInMain"),R],[T,F]])),p().then(A)}
//# sourceMappingURL=quickExtract-126652bb.js.map

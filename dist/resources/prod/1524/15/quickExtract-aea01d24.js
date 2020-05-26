import{w as t,z as e,f as n,o as i,s,p as r,ag as a,x as o,at as c,bN as f}from"./calfSystem-740ec4d2.js"
import{c as d}from"./createTable-0cac6208.js"
import{j as l}from"./jConfirm-bbb6e556.js"
import"./indexAjaxJson-1e1af708.js"
import{d as m}from"./daUseItem-77f590b8.js"
import{e as u}from"./eventHandler5-0c9435d1.js"
import"./cmdExport-7c541a4f.js"
import{g as p}from"./getInventory-9c412ba4.js"
import{s as h}from"./selfIdIs-154fe41e.js"
import{j as b,o as x}from"./jsonFail-b37bbca2.js"
let _,y,j,v,g,I,$
function E(t,e){return e.inv_id===t}function S(t){return`${t.amount} x ${f[t.type]}`}function k(t,e){var n
b(e,$)||(!function(t){const e=j.findIndex(s(E,t))
e>=0&&j.splice(e,1)}(t),x((n=e.r).item?`You successfully extracted 1 '${n.item.n}' component(s) from 1 resource(s).</span>`:n.frags?`You gained ${n.frags.map(S).join(", ")} Fragments by opening the Fragment Stash.`:'<span class="fshRed">You failed to extract any components from resource(s).</span>',$))}function w(t){m(t).then(s(k,t))}function D(t){const n=I[t.id.replace("fshExtr","")].invIDs
e(`extracting all ${n.length} resources`,t.parentNode),n.forEach(w)}function F(t){l("Extract Resources","Are you sure you want to extract all similar items?",s(D,t))}function q(t){return function(t){return g&&-1!==t.folder_id}(t)||function(t){return!v&&t.is_in_st}(t)}function A(t,e){return q(e)||(t[e.item_id]?t[e.item_id].invIDs.push(e.inv_id):t[e.item_id]={invIDs:[e.inv_id],inv_id:e.inv_id,item_name:e.item_name}),t}function C(t,e){const n=I[e]
return t+'<tr><td class="fshCenter"><span class="smallLink"'+` id="fshExtr${e}">Extract all ${n.invIDs.length}</span></td>`+`<td><img src="${c}items/${e}.gif" class="tip-dynamic" data-tipped="`+`fetchitem.php?item_id=${e}&inv_id=${n.inv_id}&t=1&p=${y}" border=0></td><td>${n.item_name}</td></tr>`}function M(){if(!j)return
I=j.reduce(A,{})
let t='<tr><th width="20%">Actions</th><th colspan="2">Items</th></tr><tr><td colspan="3"><ol id="qeresult"></ol></td></tr>'
t+=a(I).reduce(C,""),e(t,_),$=o("qeresult")}function Y(t){return"Zombie Coffin"===t.item_name||12===t.type||16===t.type}function H(t){y=t.player_id,j=t.items.filter(Y),M()}function N(){v=!v,M()}function O(){g=!g,M()}function R(t){return t.id.startsWith("fshExtr")}export default function(s){if(t())return
const a=s||r
e('<div class="qeHead"><b>Quick Extract</b></div>Select which type of plants you wish to extract all of. Only select extractable resources.<br><label><input type="checkbox" id="fshInSt" checked> Select items in ST</label>&nbsp;&nbsp;<label><input type="checkbox" id="fshInMain" checked> Only extract items in Main Folder</label>',a),_=d({width:"100%"}),n(a,_),v=!0,g=!0,i(a,u([[h("fshInSt"),N],[h("fshInMain"),O],[R,F]])),p().then(H)}
//# sourceMappingURL=quickExtract-aea01d24.js.map

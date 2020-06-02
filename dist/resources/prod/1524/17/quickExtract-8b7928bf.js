import{w as t,z as e,f as n,o as i,s,p as r,ap as a,x as o,aB as c,bB as f}from"./calfSystem-dec5e071.js"
import{c as d}from"./createTable-e5b9da81.js"
import{j as l}from"./jConfirm-68e5f0c8.js"
import"./indexAjaxJson-ecf8d1f5.js"
import{d as m}from"./daUseItem-a1c5450c.js"
import{e as u}from"./eventHandler5-3bf558e6.js"
import"./cmdExport-965d881b.js"
import{g as p}from"./getInventory-722fd75f.js"
import{s as h}from"./selfIdIs-b67caa4c.js"
import{j as b,o as x}from"./jsonFail-12ebdb03.js"
let _,y,j,v,I,g,$
function E(t,e){return e.inv_id===t}function S(t){return`${t.amount} x ${f[t.type]}`}function k(t,e){var n
b(e,$)||(!function(t){const e=j.findIndex(s(E,t))
e>=0&&j.splice(e,1)}(t),x((n=e.r).item?`You successfully extracted 1 '${n.item.n}' component(s) from 1 resource(s).</span>`:n.frags?`You gained ${n.frags.map(S).join(", ")} Fragments by opening the Fragment Stash.`:'<span class="fshRed">You failed to extract any components from resource(s).</span>',$))}function w(t){m(t).then(s(k,t))}function D(t){const n=g[t.id.replace("fshExtr","")].invIDs
e(`extracting all ${n.length} resources`,t.parentNode),n.forEach(w)}function F(t){l("Extract Resources","Are you sure you want to extract all similar items?",s(D,t))}function q(t){return function(t){return I&&-1!==t.folder_id}(t)||function(t){return!v&&t.is_in_st}(t)}function A(t,e){return q(e)||(t[e.item_id]?t[e.item_id].invIDs.push(e.inv_id):t[e.item_id]={invIDs:[e.inv_id],inv_id:e.inv_id,item_name:e.item_name}),t}function C(t,e){const n=g[e]
return t+'<tr><td class="fshCenter"><span class="smallLink"'+` id="fshExtr${e}">Extract all ${n.invIDs.length}</span></td>`+`<td><img src="${c}items/${e}.gif" class="tip-dynamic" data-tipped="`+`fetchitem.php?item_id=${e}&inv_id=${n.inv_id}&t=1&p=${y}" border=0></td><td>${n.item_name}</td></tr>`}function M(){if(!j)return
g=j.reduce(A,{})
let t='<tr><th width="20%">Actions</th><th colspan="2">Items</th></tr><tr><td colspan="3"><ol id="qeresult"></ol></td></tr>'
t+=a(g).reduce(C,""),e(t,_),$=o("qeresult")}function Y(t){return"Zombie Coffin"===t.item_name||12===t.type||16===t.type}function B(t){y=t.player_id,j=t.items.filter(Y),M()}function H(){v=!v,M()}function O(){I=!I,M()}function R(t){return t.id.startsWith("fshExtr")}export default function(s){if(t())return
const a=s||r
e('<div class="qeHead"><b>Quick Extract</b></div>Select which type of plants you wish to extract all of. Only select extractable resources.<br><label><input type="checkbox" id="fshInSt" checked> Select items in ST</label>&nbsp;&nbsp;<label><input type="checkbox" id="fshInMain" checked> Only extract items in Main Folder</label>',a),_=d({width:"100%"}),n(a,_),v=!0,I=!0,i(a,u([[h("fshInSt"),H],[h("fshInMain"),O],[R,F]])),p().then(B)}
//# sourceMappingURL=quickExtract-8b7928bf.js.map

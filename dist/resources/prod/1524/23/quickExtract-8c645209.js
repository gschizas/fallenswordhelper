import{x as t,A as e,h as n,o as i,p as s,t as r,aq as a,y as o,aD as c,bw as f}from"./calfSystem-019de1cf.js"
import{c as d}from"./createTable-dfd6f8aa.js"
import"./indexAjaxJson-d1b1f9ac.js"
import"./cmdExport-ca1fffed.js"
import{g as l}from"./getInventory-37797909.js"
import{j as m,o as u}from"./jsonFail-85165c1e.js"
import{j as p}from"./jConfirm-5965c911.js"
import{d as h}from"./daUseItem-50349bce.js"
import{e as b}from"./eventHandler5-ba5b543f.js"
import{s as x}from"./selfIdIs-4d8c0d2b.js"
let y,_,j,v,I,g,$
function E(t,e){return e.inv_id===t}function S(t){return`${t.amount} x ${f[t.type]}`}function k(t,e){var n
m(e,$)||(!function(t){const e=j.findIndex(r(E,t))
e>=0&&j.splice(e,1)}(t),u((n=e.r).item?`You successfully extracted 1 '${n.item.n}' component(s) from 1 resource(s).</span>`:n.frags?`You gained ${n.frags.map(S).join(", ")} Fragments by opening the Fragment Stash.`:'<span class="fshRed">You failed to extract any components from resource(s).</span>',$))}function w(t){h(t).then(r(k,t))}function D(t){const n=g[t.id.replace("fshExtr","")].invIDs
e(`extracting all ${n.length} resources`,t.parentNode),n.forEach(w)}function q(t){p("Extract Resources","Are you sure you want to extract all similar items?",r(D,t))}function A(t){return function(t){return I&&-1!==t.folder_id}(t)||function(t){return!v&&t.is_in_st}(t)}function F(t,e){return A(e)||(t[e.item_id]?t[e.item_id].invIDs.push(e.inv_id):t[e.item_id]={invIDs:[e.inv_id],inv_id:e.inv_id,item_name:e.item_name}),t}function C(t,e){const n=g[e]
return t+'<tr><td class="fshCenter"><span class="smallLink"'+` id="fshExtr${e}">Extract all ${n.invIDs.length}</span></td>`+`<td><img src="${c}items/${e}.gif" class="tip-dynamic" data-tipped="`+`fetchitem.php?item_id=${e}&inv_id=${n.inv_id}&t=1&p=${_}" border=0></td><td>${n.item_name}</td></tr>`}function M(){if(!j)return
g=j.reduce(F,{})
let t='<tr><th width="20%">Actions</th><th colspan="2">Items</th></tr><tr><td colspan="3"><ol id="qeresult"></ol></td></tr>'
t+=a(g).reduce(C,""),e(t,y),$=o("qeresult")}function Y(t){return"Zombie Coffin"===t.item_name||12===t.type||16===t.type}function H(t){_=t.player_id,j=t.items.filter(Y),M()}function O(){v=!v,M()}function R(){I=!I,M()}function T(t){return t.id.startsWith("fshExtr")}export default function(r){if(t())return
const a=r||s
e('<div class="qeHead"><b>Quick Extract</b></div>Select which type of plants you wish to extract all of. Only select extractable resources.<br><label><input type="checkbox" id="fshInSt" checked> Select items in ST</label>&nbsp;&nbsp;<label><input type="checkbox" id="fshInMain" checked> Only extract items in Main Folder</label>',a),y=d({width:"100%"}),n(a,y),v=!0,I=!0,i(a,b([[x("fshInSt"),O],[x("fshInMain"),R],[T,q]])),l().then(H)}
//# sourceMappingURL=quickExtract-8c645209.js.map

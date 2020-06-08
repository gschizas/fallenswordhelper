import{j as e,a as t,g as n,b as r,p as s,d as o,c as a,o as c,i,e as f,f as d,h as m,k as p,l as u}from"./calfSystem-a2862afc.js"
import{c as l}from"./createInput-457456bb.js"
import{c as h}from"./createLabel-0e59a017.js"
import"./insertElementBefore-372e5ad6.js"
import{i as j}from"./insertElementAfterBegin-195a0721.js"
import{h as g}from"./hideElement-66d2f02e.js"
import"./makeFolderSpan-1e92cbcf.js"
import{m as b}from"./makeFolderSpans-60e6fe6d.js"
import"./indexAjaxJson-afc1ac85.js"
import"./cmdExport-356fd6f3.js"
import"./guildStore-559bcd67.js"
import"./getInventory-77b8ed5e.js"
import{g as N}from"./getInventoryById-7e10dff9.js"
import{t as E}from"./toggleForce-4bee24df.js"
let k,x,y,I,S,v=0
function F(e){const t=u(),n=e[0].parentNode
d(t,n),d(S,t)}function L(e){const t=e[0].parentNode.parentNode
E(t,function(e){return 0!==v&&e[2]!==v}(e)||function(e){return I.checked&&"Perfect"!==e[3]}(e))}function B(){S||(S=u({className:"fshItemGrid"}),x.forEach(F),j(k.parentNode,S),g(k)),x.forEach(L)}function M(e){if(!p("fshFolder",e.target))return
const t=Number(e.target.dataset.folder)
t!==v&&(v=t,B())}function A(e){const t=y[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function C(){x.forEach(A)}function P(e){if(e.items&&k){y=e.items,t(4,C)
!function(e){if("crafting"===a.cmd)return void(I={checked:!1})
const t=h({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
I=l({className:"fshVMid",type:"checkbox"}),f(I,"change",B),d(t,I),i(e," &ensp;"),d(e,t)}(function(e){const t=k.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),c(t,M),i(t,b(e,!0)),t}(e.folders))}}function V(e){const{tipped:t}=e.dataset
return[e,t.match(m)[2]]}function q(){k=function(){const e=r(o,s.lastElementChild)
return"crafting"===a.cmd?e[1]:e[0]}(),x=n("img",k).map(V)}export default function(){e()&&(N().then(P),t(3,q))}
//# sourceMappingURL=craftForge-3c0f2d67.js.map

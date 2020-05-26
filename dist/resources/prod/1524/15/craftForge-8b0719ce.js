import{j as e,a as t,g as n,b as s,p as r,d as o,c as a,o as c,i,e as f,f as m,h as d,k as p}from"./calfSystem-740ec4d2.js"
import{c as u}from"./createInput-e6e1d6b3.js"
import{c as l}from"./createLabel-de0fa934.js"
import"./insertElementBefore-d3961941.js"
import{i as h}from"./insertElementAfterBegin-08e27acb.js"
import{h as j}from"./hideElement-f48178cf.js"
import"./indexAjaxJson-1e1af708.js"
import"./makeFolderSpan-5ec2fcee.js"
import{m as g}from"./makeFolderSpans-2543603e.js"
import"./cmdExport-7c541a4f.js"
import"./getInventory-9c412ba4.js"
import{g as N}from"./getInventoryById-627b014e.js"
import{t as b}from"./toggleForce-d0f18056.js"
let E,k,x,y,I,L=0
function v(e){const t=p(),n=e[0].parentNode
m(t,n),m(I,t)}function F(e){const t=e[0].parentNode.parentNode
b(t,function(e){return 0!==L&&e[2]!==L}(e)||function(e){return y.checked&&"Perfect"!==e[3]}(e))}function S(){I||(I=p({className:"fshItemGrid"}),k.forEach(v),h(E.parentNode,I),j(E)),k.forEach(F)}function B(e){if(!e.target.classList.contains("fshFolder"))return
const t=Number(e.target.dataset.folder)
t!==L&&(L=t,S())}function M(e){const t=x[e[1]]
t&&e.push(function(e){return e.equipped?-2:e.folder_id}(t),t.craft)}function A(){k.forEach(M)}function C(e){if(e.items&&E){x=e.items,t(4,A)
!function(e){if("crafting"===a.cmd)return void(y={checked:!1})
const t=l({className:"fshVMid",innerHTML:'<span class="fshLink">Perfect</span> '})
y=u({className:"fshVMid",type:"checkbox"}),f(y,"change",S),m(t,y),i(e," &ensp;"),m(e,t)}(function(e){const t=E.parentNode.parentNode.previousElementSibling.children[0]
return t.classList.add("fshCenter"),c(t,B),i(t,g(e,!0)),t}(e.folders))}}function P(e){const{tipped:t}=e.dataset
return[e,t.match(d)[2]]}function V(){E=function(){const e=s(o,r.lastElementChild)
return"crafting"===a.cmd?e[1]:e[0]}(),k=n("img",E).map(P)}export default function(){e()&&(N().then(C),t(3,V))}
//# sourceMappingURL=craftForge-8b0719ce.js.map

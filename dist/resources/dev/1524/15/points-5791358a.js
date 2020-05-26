import{I as e,A as n,x as t,z as a,s,aS as i,aT as l,W as r,e as o,f as c,y as f,N as m}from"./calfSystem-ee582533.js"
import{n as u}from"./numberIsNaN-c9f76e43.js"
import{i as p}from"./insertTextBeforeEnd-85cd30d6.js"
import{i as d}from"./intValue-a842cf8a.js"
import{c as x}from"./createSpan-63b97269.js"
import{p as b}from"./parseGoldUpgrades-fea30c3b.js"
let S,g
const E={}
function h(e,t){return n(t).includes(e)}function N(e){return S.find(s(h,e))}function j(e,t,a){if(!E[e][a]){const s=function(e,n){return"amount"===n?new RegExp("\\+(\\d+) "+e):/(\d+)\xA0/}(e,a),i=n(t).match(s)[1]
E[e][a]=i}return E[e][a]}function y(e,n,t,a){const s=function(e,n){return j(e,n,"amount")}(e,n),i=function(e,n){return j(e,n.nextElementSibling,"cost")}(e,n)
let l
t*i<=g?(l=t*s,a.className="fshBlue"):(l=Math.floor(g/i)*s,a.className="fshRed"),f(`(+${l} stamina)`,a)}function M(e,n,t){const{target:a}=t,s=Number(a.value),i=function(e,n){if(E[e]||(E[e]={}),!E[e].span){const t=x()
p(n," "),c(n,t),E[e].span=t}return E[e].span}(e,n)
u(s)||0===s?i.className="fshHide":y(e,n,s,i)}function k(e){const n=N(e)
o(n.nextElementSibling.nextElementSibling.nextElementSibling.children[0].rows[0].cells[0].children[0],"keyup",s(M,e,n))}function A(){g=d(n(t("statbar-fsp"))),k("Current"),k("Maximum"),a(`<a href="${i}${l}marketplace">Sell at Marketplace</a>`,N("Gold").nextElementSibling.nextElementSibling.nextElementSibling)}function C(e,n){const t=N(e).nextElementSibling.nextElementSibling
if(t){const e=Number(/(\d+) \/ 115/.exec(t.innerHTML)[1])
r(n,e+5)}}export default function(){"1"===m("type")?b():(S=e("#pCC > table:last-of-type > tbody > tr:nth-child(even) > td:first-child"),C("+1 Max Allies","alliestotal"),C("+1 Max Enemies","enemiestotal"),A())}
//# sourceMappingURL=points-5791358a.js.map

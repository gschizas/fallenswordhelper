import{D as e,B as n,y as t,A as a,t as s,a6 as i,a7 as l,Z as r,f as o,h as c,z as f,Q as m}from"./calfSystem-70c7a660.js"
import{n as u}from"./numberIsNaN-871eca26.js"
import{i as d}from"./insertTextBeforeEnd-46662d9e.js"
import{i as p}from"./intValue-ef353ded.js"
import{c as x}from"./createSpan-fc68466d.js"
import{p as b}from"./parseGoldUpgrades-951328a2.js"
let g,h
const E={}
function S(e,t){return n(t).includes(e)}function N(e){return g.find(s(S,e))}function j(e,t,a){if(!E[e][a]){const s=function(e,n){return"amount"===n?new RegExp("\\+(\\d+) "+e):/(\d+)\xA0/}(e,a),i=n(t).match(s)[1]
E[e][a]=i}return E[e][a]}function y(e,n,t,a){const s=function(e,n){return j(e,n,"amount")}(e,n),i=function(e,n){return j(e,n.nextElementSibling,"cost")}(e,n)
let l
t*i<=h?(l=t*s,a.className="fshBlue"):(l=Math.floor(h/i)*s,a.className="fshRed"),f(`(+${l} stamina)`,a)}function M(e,n,t){const{target:a}=t,s=Number(a.value),i=function(e,n){if(E[e]||(E[e]={}),!E[e].span){const t=x()
d(n," "),c(n,t),E[e].span=t}return E[e].span}(e,n)
u(s)||0===s?i.className="fshHide":y(e,n,s,i)}function k(e){const n=N(e)
o(n.nextElementSibling.nextElementSibling.nextElementSibling.children[0].rows[0].cells[0].children[0],"keyup",s(M,e,n))}function A(){h=p(n(t("statbar-fsp"))),k("Current"),k("Maximum"),a(`<a href="${i}${l}marketplace">Sell at Marketplace</a>`,N("Gold").nextElementSibling.nextElementSibling.nextElementSibling)}function B(e,n){const t=N(e).nextElementSibling.nextElementSibling
if(t){const e=Number(/(\d+) \/ 115/.exec(t.innerHTML)[1])
r(n,e+5)}}function C(){"1"===m("type")?b():(g=e("#pCC > table:last-of-type > tbody > tr:nth-child(even) > td:first-child"),B("+1 Max Allies","alliestotal"),B("+1 Max Enemies","enemiestotal"),A())}export default C
//# sourceMappingURL=points-e416ed71.js.map

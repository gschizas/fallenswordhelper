import{D as n,B as e,y as t,A as a,t as s,a5 as i,a6 as l,Y as r,e as o,f as c,z as m,P as f}from"./calfSystem-03970067.js"
import{n as u}from"./numberIsNaN-b19dc958.js"
import{i as d}from"./insertTextBeforeEnd-2cd4288e.js"
import{i as p}from"./intValue-0d844fc4.js"
import{c as x}from"./createSpan-3c9a32c0.js"
import{p as b}from"./parseGoldUpgrades-8d55742e.js"
let g,E
const S={}
function h(n,t){return e(t).includes(n)}function N(n){return g.find(s(h,n))}function j(n,t,a){if(!S[n][a]){const s=function(n,e){return"amount"===e?new RegExp("\\+(\\d+) "+n):/(\d+)\xA0/}(n,a),i=e(t).match(s)[1]
S[n][a]=i}return S[n][a]}function y(n,e,t,a){const s=function(n,e){return j(n,e,"amount")}(n,e),i=function(n,e){return j(n,e.nextElementSibling,"cost")}(n,e)
let l
t*i<=E?(l=t*s,a.className="fshBlue"):(l=Math.floor(E/i)*s,a.className="fshRed"),m(`(+${l} stamina)`,a)}function M(n,e,t){const{target:a}=t,s=Number(a.value),i=function(n,e){if(S[n]||(S[n]={}),!S[n].span){const t=x()
d(e," "),c(e,t),S[n].span=t}return S[n].span}(n,e)
u(s)||0===s?i.className="fshHide":y(n,e,s,i)}function k(n){const e=N(n)
o(e.nextElementSibling.nextElementSibling.nextElementSibling.children[0].rows[0].cells[0].children[0],"keyup",s(M,n,e))}function A(){E=p(e(t("statbar-fsp"))),k("Current"),k("Maximum"),a(`<a href="${i}${l}marketplace">Sell at Marketplace</a>`,N("Gold").nextElementSibling.nextElementSibling.nextElementSibling)}function B(n,e){const t=N(n).nextElementSibling.nextElementSibling
if(t){const n=Number(/(\d+) \/ 115/.exec(t.innerHTML)[1])
r(e,n+5)}}export default function(){"1"===f("type")?b():(g=n("#pCC > table:last-of-type > tbody > tr:nth-child(even) > td:first-child"),B("+1 Max Allies","alliestotal"),B("+1 Max Enemies","enemiestotal"),A())}
//# sourceMappingURL=points-1c21dd84.js.map

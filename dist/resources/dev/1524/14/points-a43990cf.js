import{M as n,H as e,C as t,z as a,B as s,u as i,b8 as l,b9 as o,a4 as r,e as c,T as f,f as u,A as m,X as b,ba as d}from"./calfSystem-d96a3efd.js"
import{n as x}from"./numberIsNaN-5b8bfc11.js"
import{i as p}from"./insertTextBeforeEnd-4a698b23.js"
let E,g
const h={}
function S(n,e){return t(e).includes(n)}function M(n){return E.find(i(S,n))}function N(n,e,a){if(!h[n][a]){const s=function(n,e){return"amount"===e?new RegExp("\\+(\\d+) "+n):/(\d+)\xA0/}(n,a),i=t(e).match(s)[1]
h[n][a]=i}return h[n][a]}function y(n,e,t,a){const s=function(n,e){return N(n,e,"amount")}(n,e),i=function(n,e){return N(n,e.nextElementSibling,"cost")}(n,e)
let l
t*i<=g?(l=t*s,a.className="fshBlue"):(l=Math.floor(g/i)*s,a.className="fshRed"),m(`(+${l} stamina)`,a)}function C(n,e,t){const{target:a}=t,s=Number(a.value),i=function(n,e){if(h[n]||(h[n]={}),!h[n].span){const t=f()
p(e," "),u(e,t),h[n].span=t}return h[n].span}(n,e)
x(s)||0===s?i.className="fshHide":y(n,e,s,i)}function j(n){const e=M(n)
c(e.nextElementSibling.nextElementSibling.nextElementSibling.children[0].rows[0].cells[0].children[0],"keyup",i(C,n,e))}function k(){g=e(t(a("statbar-fsp"))),j("Current"),j("Maximum"),s(`<a href="${l}${o}marketplace">Sell at Marketplace</a>`,M("Gold").nextElementSibling.nextElementSibling.nextElementSibling)}function A(n,e){const t=M(n).nextElementSibling.nextElementSibling
if(t){const n=Number(/(\d+) \/ 115/.exec(t.innerHTML)[1])
r(e,n+5)}}export default function(){"1"===b("type")?d():(E=n("#pCC > table:last-of-type > tbody > tr:nth-child(even) > td:first-child"),A("+1 Max Allies","alliestotal"),A("+1 Max Enemies","enemiestotal"),k())}
//# sourceMappingURL=points-a43990cf.js.map

import{M as n,H as e,C as t,z as a,B as s,u as i,b4 as l,b5 as o,a3 as r,e as c,S as u,f,A as m,W as b,b6 as d}from"./calfSystem-371c414c.js"
import{n as x}from"./numberIsNaN-987e3021.js"
import{i as p}from"./insertTextBeforeEnd-b8da3766.js"
let E,S
const g={}
function h(n,e){return t(e).includes(n)}function M(n){return E.find(i(h,n))}function N(n,e,a){if(!g[n][a]){const s=function(n,e){return"amount"===e?new RegExp("\\+(\\d+) "+n):/(\d+)\xA0/}(n,a),i=t(e).match(s)[1]
g[n][a]=i}return g[n][a]}function y(n,e,t,a){const s=function(n,e){return N(n,e,"amount")}(n,e),i=function(n,e){return N(n,e.nextElementSibling,"cost")}(n,e)
let l
t*i<=S?(l=t*s,a.className="fshBlue"):(l=Math.floor(S/i)*s,a.className="fshRed"),m(`(+${l} stamina)`,a)}function C(n,e,t){const{target:a}=t,s=Number(a.value),i=function(n,e){if(g[n]||(g[n]={}),!g[n].span){const t=u()
p(e," "),f(e,t),g[n].span=t}return g[n].span}(n,e)
x(s)||0===s?i.className="fshHide":y(n,e,s,i)}function j(n){const e=M(n)
c(e.nextElementSibling.nextElementSibling.nextElementSibling.children[0].rows[0].cells[0].children[0],"keyup",i(C,n,e))}function k(){S=e(t(a("statbar-fsp"))),j("Current"),j("Maximum"),s(`<a href="${l}${o}marketplace">Sell at Marketplace</a>`,M("Gold").nextElementSibling.nextElementSibling.nextElementSibling)}function A(n,e){const t=M(n).nextElementSibling.nextElementSibling
if(t){const n=Number(/(\d+) \/ 115/.exec(t.innerHTML)[1])
r(e,n+5)}}export default function(){"1"===b("type")?d():(E=n("#pCC > table:last-of-type > tbody > tr:nth-child(even) > td:first-child"),A("+1 Max Allies","alliestotal"),A("+1 Max Enemies","enemiestotal"),k())}
//# sourceMappingURL=points-d5e5f905.js.map

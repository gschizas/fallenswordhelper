import{N as n,I as e,D as t,A as s,C as a,v as i,b5 as l,b6 as o,a4 as r,f as c,T as f,h as u,B as m,X as b,b7 as x}from"./calfSystem-cb871cc0.js"
import{n as d}from"./numberIsNaN-3061f097.js"
import{i as p}from"./insertTextBeforeEnd-f41f334f.js"
let h,E
const g={}
function S(n,e){return t(e).includes(n)}function N(n){return h.find(i(S,n))}function M(n,e,s){if(!g[n][s]){const a=function(n,e){return"amount"===e?new RegExp(`\\+(\\d+) ${n}`):/(\d+)\xA0/}(n,s),i=t(e).match(a)[1]
g[n][s]=i}return g[n][s]}function y(n,e,t,s){const a=function(n,e){return M(n,e,"amount")}(n,e),i=function(n,e){return M(n,e.nextElementSibling,"cost")}(n,e)
let l
t*i<=E?(l=t*a,s.className="fshBlue"):(l=Math.floor(E/i)*a,s.className="fshRed"),m(`(+${l} stamina)`,s)}function C(n,e,t){const{target:s}=t,a=Number(s.value),i=function(n,e){if(g[n]||(g[n]={}),!g[n].span){const t=f()
p(e," "),u(e,t),g[n].span=t}return g[n].span}(n,e)
d(a)||0===a?i.className="fshHide":y(n,e,a,i)}function $(n){const e=N(n)
c(e.nextElementSibling.nextElementSibling.nextElementSibling.children[0].rows[0].cells[0].children[0],"keyup",i(C,n,e))}function j(){E=e(t(s("statbar-fsp"))),$("Current"),$("Maximum"),a(`<a href="${l}${o}marketplace">Sell at Marketplace</a>`,N("Gold").nextElementSibling.nextElementSibling.nextElementSibling)}function k(n,e){const t=N(n).nextElementSibling.nextElementSibling
if(t){const n=Number(/(\d+) \/ 115/.exec(t.innerHTML)[1])
r(e,n+5)}}export default function(){"1"===b("type")?x():(h=n("#pCC > table:last-of-type > tbody > tr:nth-child(even) > td:first-child"),k("+1 Max Allies","alliestotal"),k("+1 Max Enemies","enemiestotal"),j())}
//# sourceMappingURL=points-a057f523.js.map

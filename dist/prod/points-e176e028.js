import{N as n,I as e,D as t,A as a,C as s,v as i,b5 as l,b6 as o,a4 as r,f as c,T as f,h as u,B as m,X as b,b7 as d}from"./calfSystem-72fdbe97.js"
import{n as x}from"./numberIsNaN-7d89f7bf.js"
import{i as p}from"./insertTextBeforeEnd-549ab030.js"
let h,E
const g={}
function S(n,e){return t(e).includes(n)}function N(n){return h.find(i(S,n))}function M(n,e,a){if(!g[n][a]){const s=function(n,e){return"amount"===e?new RegExp(`\\+(\\d+) ${n}`):/(\d+)\xA0/}(n,a),i=t(e).match(s)[1]
g[n][a]=i}return g[n][a]}function y(n,e,t,a){const s=function(n,e){return M(n,e,"amount")}(n,e),i=function(n,e){return M(n,e.nextElementSibling,"cost")}(n,e)
let l
t*i<=E?(l=t*s,a.className="fshBlue"):(l=Math.floor(E/i)*s,a.className="fshRed"),m(`(+${l} stamina)`,a)}function C(n,e,t){const{target:a}=t,s=Number(a.value),i=function(n,e){if(g[n]||(g[n]={}),!g[n].span){const t=f()
p(e," "),u(e,t),g[n].span=t}return g[n].span}(n,e)
x(s)||0===s?i.className="fshHide":y(n,e,s,i)}function $(n){const e=N(n)
c(e.nextElementSibling.nextElementSibling.nextElementSibling.children[0].rows[0].cells[0].children[0],"keyup",i(C,n,e))}function j(){E=e(t(a("statbar-fsp"))),$("Current"),$("Maximum"),s(`<a href="${l}${o}marketplace">Sell at Marketplace</a>`,N("Gold").nextElementSibling.nextElementSibling.nextElementSibling)}function k(n,e){const t=N(n).nextElementSibling.nextElementSibling
if(t){const n=Number(/(\d+) \/ 115/.exec(t.innerHTML)[1])
r(e,n+5)}}export default function(){"1"===b("type")?d():(h=n("#pCC > table:last-of-type > tbody > tr:nth-child(even) > td:first-child"),k("+1 Max Allies","alliestotal"),k("+1 Max Enemies","enemiestotal"),j())}
//# sourceMappingURL=points-e176e028.js.map

import{I as e,A as n,x as t,z as a,s,a3 as i,a4 as l,W as r,e as o,f as c,y as f,N as m}from"./calfSystem-57340987.js"
import{n as u}from"./numberIsNaN-9e712afc.js"
import{i as d}from"./insertTextBeforeEnd-b1da3db5.js"
import{i as p}from"./intValue-e99f58ac.js"
import{c as b}from"./createSpan-14d38ba8.js"
import{p as x}from"./parseGoldUpgrades-363beedf.js"
let g,E
const S={}
function h(e,t){return n(t).includes(e)}function N(e){return g.find(s(h,e))}function j(e,t,a){if(!S[e][a]){const s=function(e,n){return"amount"===n?new RegExp("\\+(\\d+) "+e):/(\d+)\xA0/}(e,a),i=n(t).match(s)[1]
S[e][a]=i}return S[e][a]}function y(e,n,t,a){const s=function(e,n){return j(e,n,"amount")}(e,n),i=function(e,n){return j(e,n.nextElementSibling,"cost")}(e,n)
let l
t*i<=E?(l=t*s,a.className="fshBlue"):(l=Math.floor(E/i)*s,a.className="fshRed"),f(`(+${l} stamina)`,a)}function M(e,n,t){const{target:a}=t,s=Number(a.value),i=function(e,n){if(S[e]||(S[e]={}),!S[e].span){const t=b()
d(n," "),c(n,t),S[e].span=t}return S[e].span}(e,n)
u(s)||0===s?i.className="fshHide":y(e,n,s,i)}function k(e){const n=N(e)
o(n.nextElementSibling.nextElementSibling.nextElementSibling.children[0].rows[0].cells[0].children[0],"keyup",s(M,e,n))}function A(){E=p(n(t("statbar-fsp"))),k("Current"),k("Maximum"),a(`<a href="${i}${l}marketplace">Sell at Marketplace</a>`,N("Gold").nextElementSibling.nextElementSibling.nextElementSibling)}function C(e,n){const t=N(e).nextElementSibling.nextElementSibling
if(t){const e=Number(/(\d+) \/ 115/.exec(t.innerHTML)[1])
r(n,e+5)}}export default function(){"1"===m("type")?x():(g=e("#pCC > table:last-of-type > tbody > tr:nth-child(even) > td:first-child"),C("+1 Max Allies","alliestotal"),C("+1 Max Enemies","enemiestotal"),A())}
//# sourceMappingURL=points-2b566f7d.js.map

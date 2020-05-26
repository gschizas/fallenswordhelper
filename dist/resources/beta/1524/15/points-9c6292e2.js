import{I as e,A as n,x as t,z as a,s,aO as i,aP as l,V as r,e as o,f as c,y as f,M as m}from"./calfSystem-1262535f.js"
import{n as u}from"./numberIsNaN-e4fe1516.js"
import{i as p}from"./insertTextBeforeEnd-e16ecd0f.js"
import{i as d}from"./intValue-c4584407.js"
import{c as x}from"./createSpan-aa5e4be8.js"
import{p as b}from"./parseGoldUpgrades-23c5c2d8.js"
let g,E
const S={}
function h(e,t){return n(t).includes(e)}function M(e){return g.find(s(h,e))}function N(e,t,a){if(!S[e][a]){const s=function(e,n){return"amount"===n?new RegExp("\\+(\\d+) "+e):/(\d+)\xA0/}(e,a),i=n(t).match(s)[1]
S[e][a]=i}return S[e][a]}function j(e,n,t,a){const s=function(e,n){return N(e,n,"amount")}(e,n),i=function(e,n){return N(e,n.nextElementSibling,"cost")}(e,n)
let l
t*i<=E?(l=t*s,a.className="fshBlue"):(l=Math.floor(E/i)*s,a.className="fshRed"),f(`(+${l} stamina)`,a)}function y(e,n,t){const{target:a}=t,s=Number(a.value),i=function(e,n){if(S[e]||(S[e]={}),!S[e].span){const t=x()
p(n," "),c(n,t),S[e].span=t}return S[e].span}(e,n)
u(s)||0===s?i.className="fshHide":j(e,n,s,i)}function k(e){const n=M(e)
o(n.nextElementSibling.nextElementSibling.nextElementSibling.children[0].rows[0].cells[0].children[0],"keyup",s(y,e,n))}function A(){E=d(n(t("statbar-fsp"))),k("Current"),k("Maximum"),a(`<a href="${i}${l}marketplace">Sell at Marketplace</a>`,M("Gold").nextElementSibling.nextElementSibling.nextElementSibling)}function C(e,n){const t=M(e).nextElementSibling.nextElementSibling
if(t){const e=Number(/(\d+) \/ 115/.exec(t.innerHTML)[1])
r(n,e+5)}}export default function(){"1"===m("type")?b():(g=e("#pCC > table:last-of-type > tbody > tr:nth-child(even) > td:first-child"),C("+1 Max Allies","alliestotal"),C("+1 Max Enemies","enemiestotal"),A())}
//# sourceMappingURL=points-9c6292e2.js.map

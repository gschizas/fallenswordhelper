import{D as e,B as n,y as t,A as a,t as s,a5 as i,a6 as l,Y as r,e as o,f as c,z as f,P as m}from"./calfSystem-05554bae.js"
import{n as u}from"./numberIsNaN-d04aa9f7.js"
import{i as p}from"./insertTextBeforeEnd-0b7ac991.js"
import{i as d}from"./intValue-f723fc88.js"
import{c as b}from"./createSpan-472d43ae.js"
import{p as x}from"./parseGoldUpgrades-4b2c0e87.js"
let g,E
const S={}
function h(e,t){return n(t).includes(e)}function N(e){return g.find(s(h,e))}function j(e,t,a){if(!S[e][a]){const s=function(e,n){return"amount"===n?new RegExp("\\+(\\d+) "+e):/(\d+)\xA0/}(e,a),i=n(t).match(s)[1]
S[e][a]=i}return S[e][a]}function y(e,n,t,a){const s=function(e,n){return j(e,n,"amount")}(e,n),i=function(e,n){return j(e,n.nextElementSibling,"cost")}(e,n)
let l
t*i<=E?(l=t*s,a.className="fshBlue"):(l=Math.floor(E/i)*s,a.className="fshRed"),f(`(+${l} stamina)`,a)}function M(e,n,t){const{target:a}=t,s=Number(a.value),i=function(e,n){if(S[e]||(S[e]={}),!S[e].span){const t=b()
p(n," "),c(n,t),S[e].span=t}return S[e].span}(e,n)
u(s)||0===s?i.className="fshHide":y(e,n,s,i)}function k(e){const n=N(e)
o(n.nextElementSibling.nextElementSibling.nextElementSibling.children[0].rows[0].cells[0].children[0],"keyup",s(M,e,n))}function A(){E=d(n(t("statbar-fsp"))),k("Current"),k("Maximum"),a(`<a href="${i}${l}marketplace">Sell at Marketplace</a>`,N("Gold").nextElementSibling.nextElementSibling.nextElementSibling)}function B(e,n){const t=N(e).nextElementSibling.nextElementSibling
if(t){const e=Number(/(\d+) \/ 115/.exec(t.innerHTML)[1])
r(n,e+5)}}export default function(){"1"===m("type")?x():(g=e("#pCC > table:last-of-type > tbody > tr:nth-child(even) > td:first-child"),B("+1 Max Allies","alliestotal"),B("+1 Max Enemies","enemiestotal"),A())}
//# sourceMappingURL=points-8e2760bd.js.map

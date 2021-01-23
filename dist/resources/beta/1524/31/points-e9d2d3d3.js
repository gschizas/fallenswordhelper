import{D as e,B as n,y as t,A as a,t as s,a5 as i,a6 as l,Y as r,f as o,h as c,z as f,Q as m}from"./calfSystem-47fc08ae.js"
import{p as u}from"./parseGoldUpgrades-8b56827d.js"
import{c as p}from"./createSpan-6b0a8c35.js"
import{i as d}from"./insertTextBeforeEnd-0d01bc1c.js"
import{i as b}from"./intValue-e7ef611d.js"
import{n as x}from"./numberIsNaN-53300e34.js"
let g,h
const E={}
function S(e,t){return n(t).includes(e)}function N(e){return g.find(s(S,e))}function j(e,t,a){if(!E[e][a]){const s=function(e,n){return"amount"===n?new RegExp(`\\+(\\d+) ${e}`):/(\d+)\xA0/}(e,a),i=n(t).match(s)[1]
E[e][a]=i}return E[e][a]}function y(e,n,t,a){const s=function(e,n){return j(e,n,"amount")}(e,n),i=function(e,n){return j(e,n.nextElementSibling,"cost")}(e,n)
let l
t*i<=h?(l=t*s,a.className="fshBlue"):(l=Math.floor(h/i)*s,a.className="fshRed"),f(`(+${l} stamina)`,a)}function M(e,n,t){const{target:a}=t,s=Number(a.value),i=function(e,n){if(E[e]||(E[e]={}),!E[e].span){const t=p()
d(n," "),c(n,t),E[e].span=t}return E[e].span}(e,n)
x(s)||0===s?i.className="fshHide":y(e,n,s,i)}function $(e){const n=N(e)
o(n.nextElementSibling.nextElementSibling.nextElementSibling.children[0].rows[0].cells[0].children[0],"keyup",s(M,e,n))}function k(){h=b(n(t("statbar-fsp"))),$("Current"),$("Maximum"),a(`<a href="${i}${l}marketplace">Sell at Marketplace</a>`,N("Gold").nextElementSibling.nextElementSibling.nextElementSibling)}function A(e,n){const t=N(e).nextElementSibling.nextElementSibling
if(t){const e=Number(/(\d+) \/ 115/.exec(t.innerHTML)[1])
r(n,e+5)}}function B(){"1"===m("type")?u():(g=e("#pCC > table:last-of-type > tbody > tr:nth-child(even) > td:first-child"),A("+1 Max Allies","alliestotal"),A("+1 Max Enemies","enemiestotal"),k())}export default B
//# sourceMappingURL=points-e9d2d3d3.js.map

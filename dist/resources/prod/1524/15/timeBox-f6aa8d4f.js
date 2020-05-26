import{F as e,ay as t,ax as a}from"./calfSystem-740ec4d2.js"
import{i as r}from"./intValue-576c2dec.js"
import{v as s}from"./valueText-3095af99.js"
import{p as o}from"./padZ-54c74bdd.js"
function n(t){return r(s(e(t)))}function m(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var n
if(s)return`<dd>${n=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(n.getHours())}:${o(n.getMinutes())} ${n.toLocaleString("en",{weekday:"short"})} ${o(n.getDate())}/${a[n.getMonth()]}/${n.getFullYear()}`}</dd>`}export{n as a,m as t}
//# sourceMappingURL=timeBox-f6aa8d4f.js.map

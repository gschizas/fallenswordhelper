import{J as e,a4 as t,aE as a}from"./calfSystem-d3aab5a8.js"
import{i as r}from"./intValue-65d3c36c.js"
import{v as s}from"./valueText-00c55739.js"
import{p as o}from"./padZ-0c2f5370.js"
function n(t){return r(s(e(t)))}function m(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var n
if(s)return`<dd>${n=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(n.getHours())}:${o(n.getMinutes())} ${n.toLocaleString("en",{weekday:"short"})} ${o(n.getDate())}/${a[n.getMonth()]}/${n.getFullYear()}`}</dd>`}export{n as a,m as t}
//# sourceMappingURL=timeBox-899e1677.js.map

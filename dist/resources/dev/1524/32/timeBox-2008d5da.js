import{J as e,a6 as t,aA as a}from"./calfSystem-19a5d332.js"
import{i as r}from"./intValue-da5ad0eb.js"
import{v as s}from"./valueText-c9c4edc1.js"
import{p as o}from"./padZ-0fd2ec23.js"
function n(t){return r(s(e(t)))}function m(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var n
if(s)return`<dd>${n=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(n.getHours())}:${o(n.getMinutes())} ${n.toLocaleString("en",{weekday:"short"})} ${o(n.getDate())}/${a[n.getMonth()]}/${n.getFullYear()}`}</dd>`}export{n as a,m as t}
//# sourceMappingURL=timeBox-2008d5da.js.map

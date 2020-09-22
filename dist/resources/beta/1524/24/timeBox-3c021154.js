import{J as e,a4 as t,aE as a}from"./calfSystem-019a589c.js"
import{i as r}from"./intValue-44683b42.js"
import{v as s}from"./valueText-5851fcdc.js"
import{p as o}from"./padZ-cba8efb8.js"
function n(t){return r(s(e(t)))}function m(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var n
if(s)return`<dd>${n=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(n.getHours())}:${o(n.getMinutes())} ${n.toLocaleString("en",{weekday:"short"})} ${o(n.getDate())}/${a[n.getMonth()]}/${n.getFullYear()}`}</dd>`}export{n as a,m as t}
//# sourceMappingURL=timeBox-3c021154.js.map

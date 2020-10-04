import{J as e,a5 as t,aF as a}from"./calfSystem-3bdf319e.js"
import{i as r}from"./intValue-ef353ded.js"
import{v as s}from"./valueText-0f01a014.js"
import{p as o}from"./padZ-b87d0d09.js"
function n(t){return r(s(e(t)))}function m(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var n
if(s)return`<dd>${n=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(n.getHours())}:${o(n.getMinutes())} ${n.toLocaleString("en",{weekday:"short"})} ${o(n.getDate())}/${a[n.getMonth()]}/${n.getFullYear()}`}</dd>`}export{n as a,m as t}
//# sourceMappingURL=timeBox-0f33cd4b.js.map

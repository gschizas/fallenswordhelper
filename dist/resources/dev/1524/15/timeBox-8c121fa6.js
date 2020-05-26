import{F as e,aB as t,aA as a}from"./calfSystem-ee582533.js"
import{i as r}from"./intValue-a842cf8a.js"
import{v as s}from"./valueText-a2e47d93.js"
import{p as o}from"./padZ-55be60ec.js"
function n(t){return r(s(e(t)))}function m(e,r){const s=/([0-9]+)m ([0-9]+)s/.exec(e)
var n
if(s)return`<dd>${n=new Date(t+1e3*(60*(60*r+Number(s[1]))+Number(s[2]))),`${o(n.getHours())}:${o(n.getMinutes())} ${n.toLocaleString("en",{weekday:"short"})} ${o(n.getDate())}/${a[n.getMonth()]}/${n.getFullYear()}`}</dd>`}export{n as a,m as t}
//# sourceMappingURL=timeBox-8c121fa6.js.map

import{G as t,H as n,I as r,J as a}from"./calfSystem-a2862afc.js"
import{i as e}from"./intValue-8b673ab3.js"
import{v as s}from"./valueText-0b6b2a96.js"
let u,f,i,o
const c=[t=>{if(t>=801)return 100},t=>{if(t>=752)return t-701},t=>{if(t>=351)return 50},t=>{if(t>=326)return t-301},()=>25]
function l(t){return t-function(t){return c.find(n=>n(t))(t)}(t)}function m(){const c=t(n)||e(s(r(a)))
u=function(t){let n=10
return t<=209&&(n=t-200),t<=205&&(n=5),t-n}(c),f=function(t){let n=10
return t<200&&(n=5),t+n}(c),i=l(c),o=function(t){let n=100
return t<=700&&(n=50),t<=300&&(n=25),t+n}(c)}export{i as a,u as b,m as c,o as g,f as p}
//# sourceMappingURL=levelHighlight-1bce539f.js.map

import{D as t,E as n,F as r,G as e}from"./calfSystem-dec5e071.js"
import{i as a}from"./intValue-8ad0a3ce.js"
import{v as s}from"./valueText-67a7e51e.js"
let u,i,f,o
const c=[t=>{if(t>=801)return 100},t=>{if(t>=752)return t-701},t=>{if(t>=351)return 50},t=>{if(t>=326)return t-301},()=>25]
function l(t){return t-function(t){return c.find(n=>n(t))(t)}(t)}function m(){const c=t(n)||a(s(r(e)))
u=function(t){let n=10
return t<=209&&(n=t-200),t<=205&&(n=5),t-n}(c),i=function(t){let n=10
return t<200&&(n=5),t+n}(c),f=l(c),o=function(t){let n=100
return t<=700&&(n=50),t<=300&&(n=25),t+n}(c)}export{f as a,u as b,m as c,o as g,i as p}
//# sourceMappingURL=levelHighlight-a4f5ecc7.js.map

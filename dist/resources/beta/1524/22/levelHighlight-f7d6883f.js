import{G as t,H as n,I as r,J as e}from"./calfSystem-1b876afa.js"
import{i as a}from"./intValue-4dd66c70.js"
import{v as f}from"./valueText-266fd211.js"
let s,u,i,o
const c=[t=>{if(t>=801)return 100},t=>{if(t>=752)return t-701},t=>{if(t>=351)return 50},t=>{if(t>=326)return t-301},()=>25]
function l(t){return t-function(t){return c.find(n=>n(t))(t)}(t)}function m(){const c=t(n)||a(f(r(e)))
s=function(t){let n=10
return t<=209&&(n=t-200),t<=205&&(n=5),t-n}(c),u=function(t){let n=10
return t<200&&(n=5),t+n}(c),i=l(c),o=function(t){let n=100
return t<=700&&(n=50),t<=300&&(n=25),t+n}(c)}export{i as a,s as b,m as c,o as g,u as p}
//# sourceMappingURL=levelHighlight-f7d6883f.js.map

import{v as n,a as t}from"./calfSystem-0e5d6faf.js"
const o={}
let s=-1
function f(n,o){t(3,o.func,[n])}function c(t,s){if(console.log("publish",t),o[t])return o[t].forEach(n(f,s)),!0}function r(n,t){o[n]||(o[n]=[]),s+=1
const f=s.toString()
return o[n].push({token:f,func:t}),f}function u(n,t){return o[n]?o[n][0].token:r(n,t)}export{r as a,c as p,u as s}
//# sourceMappingURL=pubsub-a9414a28.js.map

import{u as n,a as t}from"./calfSystem-d96a3efd.js"
const o={}
let s=-1
function u(n,o){t(3,o.func,[n])}function c(t,s){if(console.log("publish",t),o[t])return o[t].forEach(n(u,s)),!0}function f(n,t){o[n]||(o[n]=[]),s+=1
const u=s.toString()
return o[n].push({token:u,func:t}),u}function r(n,t){return o[n]?o[n][0].token:f(n,t)}export{f as a,c as p,r as s}
//# sourceMappingURL=pubsub-dcfa18d6.js.map

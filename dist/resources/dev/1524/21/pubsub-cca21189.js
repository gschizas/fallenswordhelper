import{t as n,a as t}from"./calfSystem-9c7241dc.js"
const o={}
let c=-1
function s(n,o){t(3,o.func,[n])}function r(t,c){if(console.log("publish",t),o[t])return o[t].forEach(n(s,c)),!0}function u(n,t){o[n]||(o[n]=[]),c+=1
const s=c.toString()
return o[n].push({token:s,func:t}),s}function f(n,t){return o[n]?o[n][0].token:u(n,t)}export{u as a,r as p,f as s}
//# sourceMappingURL=pubsub-cca21189.js.map

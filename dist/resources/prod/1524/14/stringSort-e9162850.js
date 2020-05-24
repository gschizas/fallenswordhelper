import{al as t,a9 as s,b3 as r,c as a}from"./calfSystem-d587d232.js"
import{a as n}from"./alpha-7dc073eb.js"
function o(a,n,o){const c=function(t,a,n){let o=t
const c=a.split("."),e=c.length
for(let t=0;t<e;t+=1){if(s(!o,!r(o)))return n
o=o[c[t]]}return o}(a,n,o)
return t(c)?o:c}function c(t){return a.sortAsc?t:-t}function e(t,s){const r=o(t,a.sortBy,"a"),e=o(s,a.sortBy,"a")
return c(n(r,e))}export{e as a,o as p,c as s}
//# sourceMappingURL=stringSort-e9162850.js.map

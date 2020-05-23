import{am as t,aa as s,b4 as r,e as a}from"./calfSystem-1e164202.js"
import{a as n}from"./alpha-f9bc5317.js"
function o(a,n,o){const e=function(t,a,n){let o=t
const e=a.split("."),c=e.length
for(let t=0;t<c;t+=1){if(s(!o,!r(o)))return n
o=o[e[t]]}return o}(a,n,o)
return t(e)?o:e}function e(t){return a.sortAsc?t:-t}function c(t,s){const r=o(t,a.sortBy,"a"),c=o(s,a.sortBy,"a")
return e(n(r,c))}export{c as a,o as p,e as s}
//# sourceMappingURL=stringSort-83e47d68.js.map

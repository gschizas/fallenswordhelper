import{aj as t,a3 as s,aT as r,c as a}from"./calfSystem-3bdf319e.js"
import{a as n}from"./alpha-d5278d39.js"
function o(a,n,o){const e=function(t,a,n){let o=t
const e=a.split("."),c=e.length
for(let t=0;t<c;t+=1){if(s(!o,!r(o)))return n
o=o[e[t]]}return o}(a,n,o)
return t(e)?o:e}function e(t){return a.sortAsc?t:-t}function c(t,s){const r=o(t,a.sortBy,"a"),c=o(s,a.sortBy,"a")
return e(n(r,c))}export{c as a,o as p,e as s}
//# sourceMappingURL=stringSort-331e7e45.js.map

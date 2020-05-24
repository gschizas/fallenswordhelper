import{bm as t}from"./calfSystem-d96a3efd.js"
import{t as a}from"./toLowerCase-a0540d2c.js"
function e(t){let a=6
for(let e=0;e<t.length;e+=1)a=Math.imul(a^t.charCodeAt(e),9**9)
return(a^a>>>9)>>>0}function r(t,a=0){let e=3735928559^a,r=1103547991^a
for(let a,m=0;m<t.length;m++)a=t.charCodeAt(m),e=Math.imul(e^a,2654435761),r=Math.imul(r^a,1597334677)
return e=Math.imul(e^e>>>16,2246822507)^Math.imul(r^r>>>13,3266489909),r=Math.imul(r^r>>>16,2246822507)^Math.imul(e^e>>>13,3266489909),4294967296*(2097151&r)+(e>>>0)}function m(e,r){return e(t.map(a).map(t=>r[t]).filter(t=>t).join())}export{e as a,r as c,m}
//# sourceMappingURL=makeHash-38477382.js.map

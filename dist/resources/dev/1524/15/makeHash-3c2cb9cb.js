import{bi as t}from"./calfSystem-ee582533.js"
import{t as a}from"./toLowerCase-6383ba3b.js"
function e(t){let a=6
for(let e=0;e<t.length;e+=1)a=Math.imul(a^t.charCodeAt(e),9**9)
return(a^a>>>9)>>>0}function r(t,a=0){let e=3735928559^a,r=1103547991^a
for(let a,i=0;i<t.length;i++)a=t.charCodeAt(i),e=Math.imul(e^a,2654435761),r=Math.imul(r^a,1597334677)
return e=Math.imul(e^e>>>16,2246822507)^Math.imul(r^r>>>13,3266489909),r=Math.imul(r^r>>>16,2246822507)^Math.imul(e^e>>>13,3266489909),4294967296*(2097151&r)+(e>>>0)}function i(e,r){return e(t.map(a).map(t=>r[t]).filter(t=>t).join())}export{e as a,r as c,i as m}
//# sourceMappingURL=makeHash-3c2cb9cb.js.map

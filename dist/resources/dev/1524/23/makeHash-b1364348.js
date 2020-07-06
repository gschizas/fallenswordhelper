import{b2 as t}from"./calfSystem-9901ad27.js"
import{t as a}from"./toLowerCase-dda30e6b.js"
function e(t){let a=6
for(let e=0;e<t.length;e+=1)a=Math.imul(a^t.charCodeAt(e),9**9)
return(a^a>>>9)>>>0}function r(t,a=0){let e=3735928559^a,r=1103547991^a
for(let a,l=0;l<t.length;l++)a=t.charCodeAt(l),e=Math.imul(e^a,2654435761),r=Math.imul(r^a,1597334677)
return e=Math.imul(e^e>>>16,2246822507)^Math.imul(r^r>>>13,3266489909),r=Math.imul(r^r>>>16,2246822507)^Math.imul(e^e>>>13,3266489909),4294967296*(2097151&r)+(e>>>0)}function l(e,r){return e(t.map(a).map(t=>r[t]).filter(t=>t).join())}export{e as a,r as c,l as m}
//# sourceMappingURL=makeHash-b1364348.js.map

import{b3 as t}from"./calfSystem-f7574730.js"
import{t as a}from"./toLowerCase-9cb6a319.js"
function r(t){let a=6
for(let r=0;r<t.length;r+=1)a=Math.imul(a^t.charCodeAt(r),9**9)
return(a^a>>>9)>>>0}function e(t,a=0){let r=3735928559^a,e=1103547991^a
for(let a,l=0;l<t.length;l++)a=t.charCodeAt(l),r=Math.imul(r^a,2654435761),e=Math.imul(e^a,1597334677)
return r=Math.imul(r^r>>>16,2246822507)^Math.imul(e^e>>>13,3266489909),e=Math.imul(e^e>>>16,2246822507)^Math.imul(r^r>>>13,3266489909),4294967296*(2097151&e)+(r>>>0)}function l(r,e){return r(t.map(a).map(t=>e[t]).filter(t=>t).join())}export{r as a,e as c,l as m}
//# sourceMappingURL=makeHash-31530d0b.js.map

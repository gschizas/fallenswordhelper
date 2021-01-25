import{c as r}from"./currentGuildId-daa4c793.js"
import{C as t,bv as a,bx as e}from"./calfSystem-19a5d332.js"
let n,s,c,f
function o(){return n||(s=t(`#pCC a[href^="${a}"]`),n=!0),s}function u(){return c||(f=function(){const r=o()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===r(),c=!0),f}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-292e0ced.js.map

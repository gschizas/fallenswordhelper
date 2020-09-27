import{C as r,bo as t,bl as a}from"./calfSystem-d3aab5a8.js"
import{c as e}from"./currentGuildId-b5159547.js"
let n,o,s,f
function c(){return n||(o=r(`#pCC a[href^="${t}"]`),n=!0),o}function u(){return s||(f=function(){const r=c()
if(r){const t=a.exec(r.href)
if(t)return Number(t[1])}}()===e(),s=!0),f}export{u as a,c as g}
//# sourceMappingURL=getIsOwnGuild-92ab65a1.js.map

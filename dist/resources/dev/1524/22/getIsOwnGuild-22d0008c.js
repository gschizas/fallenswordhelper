import{C as r,bq as t,bo as e}from"./calfSystem-4cc738f8.js"
import{c as n}from"./currentGuildId-53b525a7.js"
let c,f,o,s
function a(){return c||(f=r(`#pCC a[href^="${t}"]`),c=!0),f}function u(){return o||(s=function(){const r=a()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===n(),o=!0),s}export{u as a,a as g}
//# sourceMappingURL=getIsOwnGuild-22d0008c.js.map

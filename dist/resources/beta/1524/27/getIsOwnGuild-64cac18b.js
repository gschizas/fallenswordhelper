import{C as r,bm as t,bj as e}from"./calfSystem-70c7a660.js"
import{c as n}from"./currentGuildId-b3e9b6a5.js"
let a,s,c,f
function o(){return a||(s=r(`#pCC a[href^="${t}"]`),a=!0),s}function u(){return c||(f=function(){const r=o()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===n(),c=!0),f}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-64cac18b.js.map

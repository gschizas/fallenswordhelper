import{c as r}from"./currentGuildId-2e15c82d.js"
import{C as e,c4 as t,bq as n}from"./calfSystem-7aee5245.js"
let c,s,a,f
function o(){return c||(s=e(`#pCC a[href^="${t}"]`),c=!0),s}function u(){return a||(f=function(){const r=o()
if(r){const e=n.exec(r.href)
if(e)return Number(e[1])}}()===r(),a=!0),f}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-e40ed67c.js.map

import{C as r,bo as t,bl as e}from"./calfSystem-05554bae.js"
import{c as n}from"./currentGuildId-03628998.js"
let o,s,a,f
function c(){return o||(s=r(`#pCC a[href^="${t}"]`),o=!0),s}function u(){return a||(f=function(){const r=c()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===n(),a=!0),f}export{u as a,c as g}
//# sourceMappingURL=getIsOwnGuild-afdeee21.js.map

import{C as r,bq as t,bo as e}from"./calfSystem-9901ad27.js"
import{c as n}from"./currentGuildId-86da8be9.js"
let a,o,s,f
function c(){return a||(o=r(`#pCC a[href^="${t}"]`),a=!0),o}function u(){return s||(f=function(){const r=c()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===n(),s=!0),f}export{u as a,c as g}
//# sourceMappingURL=getIsOwnGuild-94fa006d.js.map

import{C as r,bq as t,bo as e}from"./calfSystem-38898f3e.js"
import{c as n}from"./currentGuildId-7855dbba.js"
let f,o,s,a
function c(){return f||(o=r(`#pCC a[href^="${t}"]`),f=!0),o}function u(){return s||(a=function(){const r=c()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===n(),s=!0),a}export{u as a,c as g}
//# sourceMappingURL=getIsOwnGuild-925780e2.js.map

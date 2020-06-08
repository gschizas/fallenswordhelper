import{C as r,bq as e,bo as t}from"./calfSystem-a2862afc.js"
import{c as n}from"./currentGuildId-e84c528e.js"
let a,c,f,o
function s(){return a||(c=r(`#pCC a[href^="${e}"]`),a=!0),c}function u(){return f||(o=function(){const r=s()
if(r){const e=t.exec(r.href)
if(e)return Number(e[1])}}()===n(),f=!0),o}export{u as a,s as g}
//# sourceMappingURL=getIsOwnGuild-f1633f48.js.map

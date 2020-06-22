import{C as r,bo as t,bl as e}from"./calfSystem-1b876afa.js"
import{c as n}from"./currentGuildId-000cb2c0.js"
let a,c,f,o
function s(){return a||(c=r(`#pCC a[href^="${t}"]`),a=!0),c}function u(){return f||(o=function(){const r=s()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===n(),f=!0),o}export{u as a,s as g}
//# sourceMappingURL=getIsOwnGuild-f4f2e7ff.js.map

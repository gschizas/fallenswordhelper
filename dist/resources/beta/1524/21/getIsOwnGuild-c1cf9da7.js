import{C as r,bo as t,bl as e}from"./calfSystem-89b939c8.js"
import{c as n}from"./currentGuildId-ae8f3699.js"
let f,o,s,a
function c(){return f||(o=r(`#pCC a[href^="${t}"]`),f=!0),o}function u(){return s||(a=function(){const r=c()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===n(),s=!0),a}export{u as a,c as g}
//# sourceMappingURL=getIsOwnGuild-c1cf9da7.js.map

import{C as r,bn as e,bl as t}from"./calfSystem-54df10e3.js"
import{c as n}from"./currentGuildId-7eae4191.js"
let f,s,a,o
function c(){return f||(s=r(`#pCC a[href^="${e}"]`),f=!0),s}function u(){return a||(o=function(){const r=c()
if(r){const e=t.exec(r.href)
if(e)return Number(e[1])}}()===n(),a=!0),o}export{u as a,c as g}
//# sourceMappingURL=getIsOwnGuild-a8f0f4ea.js.map

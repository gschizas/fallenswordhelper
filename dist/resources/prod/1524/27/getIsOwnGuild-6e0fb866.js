import{C as r,c5 as e,bh as t}from"./calfSystem-3bdf319e.js"
import{c as n}from"./currentGuildId-e8170186.js"
let f,s,c,o
function a(){return f||(s=r(`#pCC a[href^="${e}"]`),f=!0),s}function u(){return c||(o=function(){const r=a()
if(r){const e=t.exec(r.href)
if(e)return Number(e[1])}}()===n(),c=!0),o}export{u as a,a as g}
//# sourceMappingURL=getIsOwnGuild-6e0fb866.js.map

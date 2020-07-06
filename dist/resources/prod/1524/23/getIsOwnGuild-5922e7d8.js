import{C as r,c5 as e,bj as t}from"./calfSystem-019de1cf.js"
import{c as n}from"./currentGuildId-a399e8da.js"
let a,c,f,s
function o(){return a||(c=r(`#pCC a[href^="${e}"]`),a=!0),c}function u(){return f||(s=function(){const r=o()
if(r){const e=t.exec(r.href)
if(e)return Number(e[1])}}()===n(),f=!0),s}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-5922e7d8.js.map

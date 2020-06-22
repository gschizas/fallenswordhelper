import{C as e,c5 as r,bj as t}from"./calfSystem-d04e4be4.js"
import{c as n}from"./currentGuildId-9ae9b1fe.js"
let f,s,a,c
function o(){return f||(s=e(`#pCC a[href^="${r}"]`),f=!0),s}function u(){return a||(c=function(){const e=o()
if(e){const r=t.exec(e.href)
if(r)return Number(r[1])}}()===n(),a=!0),c}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-7c85e920.js.map

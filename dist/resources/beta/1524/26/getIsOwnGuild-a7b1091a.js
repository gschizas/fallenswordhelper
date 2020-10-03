import{C as r,bm as t,bj as e}from"./calfSystem-cf4d22a7.js"
import{c as n}from"./currentGuildId-5763962b.js"
let f,s,a,c
function o(){return f||(s=r(`#pCC a[href^="${t}"]`),f=!0),s}function u(){return a||(c=function(){const r=o()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===n(),a=!0),c}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-a7b1091a.js.map

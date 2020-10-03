import{C as r,c5 as t,bh as c}from"./calfSystem-a5fc99d4.js"
import{c as e}from"./currentGuildId-c73fd152.js"
let f,n,s,a
function o(){return f||(n=r(`#pCC a[href^="${t}"]`),f=!0),n}function u(){return s||(a=function(){const r=o()
if(r){const t=c.exec(r.href)
if(t)return Number(t[1])}}()===e(),s=!0),a}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-a65361f5.js.map

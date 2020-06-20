import{C as r,c5 as t,bj as e}from"./calfSystem-2741d97b.js"
import{c as n}from"./currentGuildId-2c5ea0ad.js"
let a,c,s,f
function o(){return a||(c=r(`#pCC a[href^="${t}"]`),a=!0),c}function u(){return s||(f=function(){const r=o()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===n(),s=!0),f}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-938b333b.js.map

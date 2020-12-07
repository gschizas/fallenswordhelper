import{C as r,c4 as t,bg as a}from"./calfSystem-6459f18a.js"
import{c as e}from"./currentGuildId-da0b8fda.js"
let f,n,s,c
function o(){return f||(n=r(`#pCC a[href^="${t}"]`),f=!0),n}function u(){return s||(c=function(){const r=o()
if(r){const t=a.exec(r.href)
if(t)return Number(t[1])}}()===e(),s=!0),c}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-9b05c4d3.js.map

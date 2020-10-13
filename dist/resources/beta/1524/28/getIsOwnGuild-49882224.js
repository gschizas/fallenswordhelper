import{C as r,bl as t,bi as c}from"./calfSystem-964f4fc9.js"
import{c as e}from"./currentGuildId-26c6bca8.js"
let f,n,s,a
function o(){return f||(n=r(`#pCC a[href^="${t}"]`),f=!0),n}function i(){return s||(a=function(){const r=o()
if(r){const t=c.exec(r.href)
if(t)return Number(t[1])}}()===e(),s=!0),a}export{i as a,o as g}
//# sourceMappingURL=getIsOwnGuild-49882224.js.map

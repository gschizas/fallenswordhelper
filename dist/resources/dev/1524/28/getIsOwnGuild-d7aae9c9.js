import{C as r,bn as t,bl as n}from"./calfSystem-b136673a.js"
import{c as e}from"./currentGuildId-4405d1bb.js"
let s,a,f,o
function c(){return s||(a=r(`#pCC a[href^="${t}"]`),s=!0),a}function u(){return f||(o=function(){const r=c()
if(r){const t=n.exec(r.href)
if(t)return Number(t[1])}}()===e(),f=!0),o}export{u as a,c as g}
//# sourceMappingURL=getIsOwnGuild-d7aae9c9.js.map

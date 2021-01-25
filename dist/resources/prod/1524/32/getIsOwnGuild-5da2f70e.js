import{c as r}from"./currentGuildId-2687cdb7.js"
import{C as t,c5 as e,br as n}from"./calfSystem-45544049.js"
let c,s,f,o
function a(){return c||(s=t(`#pCC a[href^="${e}"]`),c=!0),s}function u(){return f||(o=function(){const r=a()
if(r){const t=n.exec(r.href)
if(t)return Number(t[1])}}()===r(),f=!0),o}export{u as a,a as g}
//# sourceMappingURL=getIsOwnGuild-5da2f70e.js.map

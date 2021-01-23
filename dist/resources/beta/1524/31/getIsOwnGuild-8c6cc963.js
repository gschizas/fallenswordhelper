import{c as r}from"./currentGuildId-72bd2a1a.js"
import{C as t,br as e,bt as a}from"./calfSystem-47fc08ae.js"
let n,f,s,c
function o(){return n||(f=t(`#pCC a[href^="${e}"]`),n=!0),f}function u(){return s||(c=function(){const r=o()
if(r){const t=a.exec(r.href)
if(t)return Number(t[1])}}()===r(),s=!0),c}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-8c6cc963.js.map

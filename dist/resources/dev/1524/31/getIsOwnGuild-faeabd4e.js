import{c as r}from"./currentGuildId-469c60c3.js"
import{C as t,bu as e,bw as n}from"./calfSystem-393ab895.js"
let c,s,a,f
function o(){return c||(s=t(`#pCC a[href^="${e}"]`),c=!0),s}function u(){return a||(f=function(){const r=o()
if(r){const t=n.exec(r.href)
if(t)return Number(t[1])}}()===r(),a=!0),f}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-faeabd4e.js.map

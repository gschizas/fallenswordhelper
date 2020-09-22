import{C as r,c5 as t,bj as e}from"./calfSystem-ec854151.js"
import{c}from"./currentGuildId-1299fc05.js"
let n,f,s,o
function a(){return n||(f=r(`#pCC a[href^="${t}"]`),n=!0),f}function u(){return s||(o=function(){const r=a()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===c(),s=!0),o}export{u as a,a as g}
//# sourceMappingURL=getIsOwnGuild-df46ec89.js.map

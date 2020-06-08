import{C as r,c4 as t,bj as e}from"./calfSystem-03970067.js"
import{c}from"./currentGuildId-cce6862b.js"
let n,s,f,o
function a(){return n||(s=r(`#pCC a[href^="${t}"]`),n=!0),s}function u(){return f||(o=function(){const r=a()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===c(),f=!0),o}export{u as a,a as g}
//# sourceMappingURL=getIsOwnGuild-22a187f1.js.map

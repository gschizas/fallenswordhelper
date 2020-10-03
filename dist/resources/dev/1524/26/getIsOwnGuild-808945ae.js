import{C as r,bo as t,bm as e}from"./calfSystem-4991bf5b.js"
import{c as n}from"./currentGuildId-56c2c861.js"
let c,f,o,s
function a(){return c||(f=r(`#pCC a[href^="${t}"]`),c=!0),f}function u(){return o||(s=function(){const r=a()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===n(),o=!0),s}export{u as a,a as g}
//# sourceMappingURL=getIsOwnGuild-808945ae.js.map

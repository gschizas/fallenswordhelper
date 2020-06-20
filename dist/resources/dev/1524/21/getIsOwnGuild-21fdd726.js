import{C as r,bq as t,bo as e}from"./calfSystem-9c7241dc.js"
import{c as n}from"./currentGuildId-00053b50.js"
let c,o,s,f
function a(){return c||(o=r(`#pCC a[href^="${t}"]`),c=!0),o}function u(){return s||(f=function(){const r=a()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===n(),s=!0),f}export{u as a,a as g}
//# sourceMappingURL=getIsOwnGuild-21fdd726.js.map

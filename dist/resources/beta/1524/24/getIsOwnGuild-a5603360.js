import{C as r,bo as e,bl as t}from"./calfSystem-019a589c.js"
import{c}from"./currentGuildId-29e13ecc.js"
let n,o,s,a
function f(){return n||(o=r(`#pCC a[href^="${e}"]`),n=!0),o}function u(){return s||(a=function(){const r=f()
if(r){const e=t.exec(r.href)
if(e)return Number(e[1])}}()===c(),s=!0),a}export{u as a,f as g}
//# sourceMappingURL=getIsOwnGuild-a5603360.js.map

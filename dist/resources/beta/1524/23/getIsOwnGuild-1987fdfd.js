import{C as r,bo as t,bl as e}from"./calfSystem-34fcd691.js"
import{c as f}from"./currentGuildId-fa7da475.js"
let n,a,o,s
function c(){return n||(a=r(`#pCC a[href^="${t}"]`),n=!0),a}function u(){return o||(s=function(){const r=c()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===f(),o=!0),s}export{u as a,c as g}
//# sourceMappingURL=getIsOwnGuild-1987fdfd.js.map

import{C as r,bo as e,bm as t}from"./calfSystem-ec5e5725.js"
import{c as n}from"./currentGuildId-4732beaa.js"
let a,o,s,c
function f(){return a||(o=r(`#pCC a[href^="${e}"]`),a=!0),o}function u(){return s||(c=function(){const r=f()
if(r){const e=t.exec(r.href)
if(e)return Number(e[1])}}()===n(),s=!0),c}export{u as a,f as g}
//# sourceMappingURL=getIsOwnGuild-161f8289.js.map

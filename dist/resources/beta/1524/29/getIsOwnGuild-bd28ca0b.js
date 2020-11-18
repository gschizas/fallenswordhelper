import{C as r,bl as t,bi as e}from"./calfSystem-f9a27018.js"
import{c as f}from"./currentGuildId-a542fdb9.js"
let n,a,s,o
function c(){return n||(a=r(`#pCC a[href^="${t}"]`),n=!0),a}function i(){return s||(o=function(){const r=c()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===f(),s=!0),o}export{i as a,c as g}
//# sourceMappingURL=getIsOwnGuild-bd28ca0b.js.map

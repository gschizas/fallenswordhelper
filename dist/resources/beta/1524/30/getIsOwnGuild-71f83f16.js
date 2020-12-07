import{C as r,bl as e,bi as t}from"./calfSystem-ebf4b17d.js"
import{c as f}from"./currentGuildId-f7450bbe.js"
let n,s,o,a
function c(){return n||(s=r(`#pCC a[href^="${e}"]`),n=!0),s}function i(){return o||(a=function(){const r=c()
if(r){const e=t.exec(r.href)
if(e)return Number(e[1])}}()===f(),o=!0),a}export{i as a,c as g}
//# sourceMappingURL=getIsOwnGuild-71f83f16.js.map

import{c as r}from"./currentGuildId-b9dbffa6.js"
import{C as t,bs as f,bu as e}from"./calfSystem-26bcf570.js"
let n,s,a,c
function o(){return n||(s=t(`#pCC a[href^="${f}"]`),n=!0),s}function u(){return a||(c=function(){const r=o()
if(r){const t=e.exec(r.href)
if(t)return Number(t[1])}}()===r(),a=!0),c}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-b5417a67.js.map

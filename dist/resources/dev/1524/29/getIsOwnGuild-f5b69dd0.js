import{C as r,bn as e,bl as f}from"./calfSystem-02c48ff5.js"
import{c as t}from"./currentGuildId-cefcefd6.js"
let n,c,s,o
function a(){return n||(c=r(`#pCC a[href^="${e}"]`),n=!0),c}function u(){return s||(o=function(){const r=a()
if(r){const e=f.exec(r.href)
if(e)return Number(e[1])}}()===t(),s=!0),o}export{u as a,a as g}
//# sourceMappingURL=getIsOwnGuild-f5b69dd0.js.map

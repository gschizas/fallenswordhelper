import{C as r,c4 as e,bg as t}from"./calfSystem-a5da5210.js"
import{c as n}from"./currentGuildId-87288eec.js"
let a,c,s,f
function o(){return a||(c=r(`#pCC a[href^="${e}"]`),a=!0),c}function u(){return s||(f=function(){const r=o()
if(r){const e=t.exec(r.href)
if(e)return Number(e[1])}}()===n(),s=!0),f}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-6ec2868d.js.map

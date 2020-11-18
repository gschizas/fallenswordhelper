import{C as r,c4 as e,bg as t}from"./calfSystem-57628ebe.js"
import{c as n}from"./currentGuildId-909a3fed.js"
let f,s,a,c
function o(){return f||(s=r(`#pCC a[href^="${e}"]`),f=!0),s}function u(){return a||(c=function(){const r=o()
if(r){const e=t.exec(r.href)
if(e)return Number(e[1])}}()===n(),a=!0),c}export{u as a,o as g}
//# sourceMappingURL=getIsOwnGuild-64030e21.js.map

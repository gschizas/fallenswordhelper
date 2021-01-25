import{w as t,t as n,T as e}from"./calfSystem-26bcf570.js"
import{g as o,s}from"./idb-47b3fdf8.js"
function r(){return t({cmd:"superelite"})}let i,c,u
function f(){c&&(window.clearTimeout(c),c=!1),u&&(window.clearInterval(u),u=!1)}function a(t,n){const e=t-n.time,o=n.creature.name.replace(" (Super Elite)","");(!i.se[o]||i.se[o]<e)&&(i.se[o]=e)}function l(t){(function(t){return t&&t.t})(t)&&function(t){const e=Number(t.t.split(" ")[1])
i||(i={lastUpdate:0,se:{}}),i.lastUpdate=e
const o=t.r
o&&(o.forEach(n(a,e)),s("fsh_seLog",i))}(t)}function m(){return r().then(l)}function d(){return f(),u=window.setInterval(m,3e5),m()}function p(){const t=e-(i&&i.lastUpdate||0)
t>=600?d():c=window.setTimeout(d,1e3*(600-t))}function w(t){t&&(i=t)}function h(){return o("fsh_seLog").then(w)}function b(){h().then(p)}export{f as disableBackgroundChecks,d as doBackgroundCheck,h as getFshSeLog,i as oldLog,b as seLog}
//# sourceMappingURL=seLog-fefa0ab9.js.map

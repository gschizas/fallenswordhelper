import{w as t,t as n,S as e}from"./calfSystem-d3aab5a8.js"
import{g as o,s}from"./idb-f33380fa.js"
function r(){return t({cmd:"superelite"})}let i,a,c
function u(){a&&(window.clearTimeout(a),a=!1),c&&(window.clearInterval(c),c=!1)}function f(t,n){const e=t-n.time,o=n.creature.name.replace(" (Super Elite)","");(!i.se[o]||i.se[o]<e)&&(i.se[o]=e)}function l(t){(function(t){return t&&t.t})(t)&&function(t){const e=Number(t.t.split(" ")[1])
i||(i={lastUpdate:0,se:{}}),i.lastUpdate=e
const o=t.r
o&&(o.forEach(n(f,e)),s("fsh_seLog",i))}(t)}function m(){return r().then(l)}function d(){return u(),c=window.setInterval(m,3e5),m()}function p(){const t=e-(i&&i.lastUpdate||0)
t>=600?d():a=window.setTimeout(d,1e3*(600-t))}function w(t){t&&(i=t)}function h(){return o("fsh_seLog").then(w)}function b(){h().then(p)}export{u as disableBackgroundChecks,d as doBackgroundCheck,h as getFshSeLog,i as oldLog,b as seLog}
//# sourceMappingURL=seLog-e6a7edab.js.map

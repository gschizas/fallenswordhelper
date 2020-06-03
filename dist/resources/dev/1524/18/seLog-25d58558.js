import{v as t,s as e,R as n}from"./calfSystem-5545a3e6.js"
import{g as o,s}from"./idb-ab1a88c6.js"
function r(){return t({cmd:"superelite"})}let i,c,a
function u(){c&&(window.clearTimeout(c),c=!1),a&&(window.clearInterval(a),a=!1)}function f(t,e){const n=t-e.time,o=e.creature.name.replace(" (Super Elite)","");(!i.se[o]||i.se[o]<n)&&(i.se[o]=n)}function l(t){(function(t){return t&&t.t})(t)&&function(t){const n=Number(t.t.split(" ")[1])
i||(i={lastUpdate:0,se:{}}),i.lastUpdate=n
const o=t.r
o&&(o.forEach(e(f,n)),s("fsh_seLog",i))}(t)}function m(){return r().then(l)}function p(){return u(),a=window.setInterval(m,3e5),m()}function d(){const t=n-(i&&i.lastUpdate||0)
t>=600?p():c=window.setTimeout(p,1e3*(600-t))}function w(t){t&&(i=t)}function h(){return o("fsh_seLog").then(w)}function b(){h().then(d)}export{u as disableBackgroundChecks,p as doBackgroundCheck,h as getFshSeLog,i as oldLog,b as seLog}
//# sourceMappingURL=seLog-25d58558.js.map

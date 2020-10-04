import{w as t,t as e,U as n}from"./calfSystem-ec5e5725.js"
import{g as o,s}from"./idb-cecca562.js"
function c(){return t({cmd:"superelite"})}let r,i,u
function a(){i&&(window.clearTimeout(i),i=!1),u&&(window.clearInterval(u),u=!1)}function f(t,e){const n=t-e.time,o=e.creature.name.replace(" (Super Elite)","");(!r.se[o]||r.se[o]<n)&&(r.se[o]=n)}function l(t){(function(t){return t&&t.t})(t)&&function(t){const n=Number(t.t.split(" ")[1])
r||(r={lastUpdate:0,se:{}}),r.lastUpdate=n
const o=t.r
o&&(o.forEach(e(f,n)),s("fsh_seLog",r))}(t)}function m(){return c().then(l)}function p(){return a(),u=window.setInterval(m,3e5),m()}function d(){const t=n-(r&&r.lastUpdate||0)
t>=600?p():i=window.setTimeout(p,1e3*(600-t))}function w(t){t&&(r=t)}function h(){return o("fsh_seLog").then(w)}function U(){h().then(d)}export{a as disableBackgroundChecks,p as doBackgroundCheck,h as getFshSeLog,r as oldLog,U as seLog}
//# sourceMappingURL=seLog-e95dfa79.js.map

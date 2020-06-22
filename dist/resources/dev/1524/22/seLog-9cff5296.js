import{w as t,t as n,T as e}from"./calfSystem-4cc738f8.js"
import{g as o,s as c}from"./idb-670c0cca.js"
function s(){return t({cmd:"superelite"})}let r,i,u
function a(){i&&(window.clearTimeout(i),i=!1),u&&(window.clearInterval(u),u=!1)}function f(t,n){const e=t-n.time,o=n.creature.name.replace(" (Super Elite)","");(!r.se[o]||r.se[o]<e)&&(r.se[o]=e)}function l(t){(function(t){return t&&t.t})(t)&&function(t){const e=Number(t.t.split(" ")[1])
r||(r={lastUpdate:0,se:{}}),r.lastUpdate=e
const o=t.r
o&&(o.forEach(n(f,e)),c("fsh_seLog",r))}(t)}function m(){return s().then(l)}function p(){return a(),u=window.setInterval(m,3e5),m()}function d(){const t=e-(r&&r.lastUpdate||0)
t>=600?p():i=window.setTimeout(p,1e3*(600-t))}function w(t){t&&(r=t)}function h(){return o("fsh_seLog").then(w)}function g(){h().then(d)}export{a as disableBackgroundChecks,p as doBackgroundCheck,h as getFshSeLog,r as oldLog,g as seLog}
//# sourceMappingURL=seLog-9cff5296.js.map

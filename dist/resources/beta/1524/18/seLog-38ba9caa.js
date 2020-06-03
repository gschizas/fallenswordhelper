import{v as t,s as n,Q as e}from"./calfSystem-4197cc22.js"
import{g as o,s}from"./idb-f3252f63.js"
function r(){return t({cmd:"superelite"})}let c,i,u
function a(){i&&(window.clearTimeout(i),i=!1),u&&(window.clearInterval(u),u=!1)}function f(t,n){const e=t-n.time,o=n.creature.name.replace(" (Super Elite)","");(!c.se[o]||c.se[o]<e)&&(c.se[o]=e)}function l(t){(function(t){return t&&t.t})(t)&&function(t){const e=Number(t.t.split(" ")[1])
c||(c={lastUpdate:0,se:{}}),c.lastUpdate=e
const o=t.r
o&&(o.forEach(n(f,e)),s("fsh_seLog",c))}(t)}function m(){return r().then(l)}function p(){return a(),u=window.setInterval(m,3e5),m()}function d(){const t=e-(c&&c.lastUpdate||0)
t>=600?p():i=window.setTimeout(p,1e3*(600-t))}function w(t){t&&(c=t)}function h(){return o("fsh_seLog").then(w)}function g(){h().then(d)}export{a as disableBackgroundChecks,p as doBackgroundCheck,h as getFshSeLog,c as oldLog,g as seLog}
//# sourceMappingURL=seLog-38ba9caa.js.map

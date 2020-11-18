import{w as t,t as n,S as e}from"./calfSystem-f9a27018.js"
import{g as o,s}from"./idb-5c501cd3.js"
function r(){return t({cmd:"superelite"})}let c,i,u
function a(){i&&(window.clearTimeout(i),i=!1),u&&(window.clearInterval(u),u=!1)}function f(t,n){const e=t-n.time,o=n.creature.name.replace(" (Super Elite)","");(!c.se[o]||c.se[o]<e)&&(c.se[o]=e)}function l(t){(function(t){return t&&t.t})(t)&&function(t){const e=Number(t.t.split(" ")[1])
c||(c={lastUpdate:0,se:{}}),c.lastUpdate=e
const o=t.r
o&&(o.forEach(n(f,e)),s("fsh_seLog",c))}(t)}function m(){return r().then(l)}function d(){return a(),u=window.setInterval(m,3e5),m()}function p(){const t=e-(c&&c.lastUpdate||0)
t>=600?d():i=window.setTimeout(d,1e3*(600-t))}function w(t){t&&(c=t)}function h(){return o("fsh_seLog").then(w)}function g(){h().then(p)}export{a as disableBackgroundChecks,d as doBackgroundCheck,h as getFshSeLog,c as oldLog,g as seLog}
//# sourceMappingURL=seLog-a64b1d03.js.map

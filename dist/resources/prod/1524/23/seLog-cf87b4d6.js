import{w as t,t as e,S as n}from"./calfSystem-019de1cf.js"
import{g as o,s}from"./idb-1bb3cee2.js"
function r(){return t({cmd:"superelite"})}let c,i,u
function a(){i&&(window.clearTimeout(i),i=!1),u&&(window.clearInterval(u),u=!1)}function f(t,e){const n=t-e.time,o=e.creature.name.replace(" (Super Elite)","");(!c.se[o]||c.se[o]<n)&&(c.se[o]=n)}function l(t){(function(t){return t&&t.t})(t)&&function(t){const n=Number(t.t.split(" ")[1])
c||(c={lastUpdate:0,se:{}}),c.lastUpdate=n
const o=t.r
o&&(o.forEach(e(f,n)),s("fsh_seLog",c))}(t)}function m(){return r().then(l)}function d(){return a(),u=window.setInterval(m,3e5),m()}function p(){const t=n-(c&&c.lastUpdate||0)
t>=600?d():i=window.setTimeout(d,1e3*(600-t))}function w(t){t&&(c=t)}function h(){return o("fsh_seLog").then(w)}function b(){h().then(p)}export{a as disableBackgroundChecks,d as doBackgroundCheck,h as getFshSeLog,c as oldLog,b as seLog}
//# sourceMappingURL=seLog-cf87b4d6.js.map

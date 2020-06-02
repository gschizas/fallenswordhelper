import{v as t,s as e,Q as n}from"./calfSystem-9554b525.js"
import{g as o,s}from"./idb-e27acc21.js"
function r(){return t({cmd:"superelite"})}let c,i,u
function a(){i&&(window.clearTimeout(i),i=!1),u&&(window.clearInterval(u),u=!1)}function f(t,e){const n=t-e.time,o=e.creature.name.replace(" (Super Elite)","");(!c.se[o]||c.se[o]<n)&&(c.se[o]=n)}function l(t){(function(t){return t&&t.t})(t)&&function(t){const n=Number(t.t.split(" ")[1])
c||(c={lastUpdate:0,se:{}}),c.lastUpdate=n
const o=t.r
o&&(o.forEach(e(f,n)),s("fsh_seLog",c))}(t)}function m(){return r().then(l)}function p(){return a(),u=window.setInterval(m,3e5),m()}function d(){const t=n-(c&&c.lastUpdate||0)
t>=600?p():i=window.setTimeout(p,1e3*(600-t))}function w(t){t&&(c=t)}function h(){return o("fsh_seLog").then(w)}function b(){h().then(d)}export{a as disableBackgroundChecks,p as doBackgroundCheck,h as getFshSeLog,c as oldLog,b as seLog}
//# sourceMappingURL=seLog-c03864db.js.map

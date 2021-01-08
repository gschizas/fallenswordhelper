import{w as t,t as n,S as e}from"./calfSystem-6459f18a.js"
import{g as o,s}from"./idb-737f325b.js"
function r(){return t({cmd:"superelite"})}let i,c,u
function a(){c&&(window.clearTimeout(c),c=!1),u&&(window.clearInterval(u),u=!1)}function f(t,n){const e=t-n.time,o=n.creature.name.replace(" (Super Elite)","");(!i.se[o]||i.se[o]<e)&&(i.se[o]=e)}function l(t){(function(t){return t&&t.t})(t)&&function(t){const e=Number(t.t.split(" ")[1])
i||(i={lastUpdate:0,se:{}}),i.lastUpdate=e
const o=t.r
o&&(o.forEach(n(f,e)),s("fsh_seLog",i))}(t)}function m(){return r().then(l)}function p(){return a(),u=window.setInterval(m,3e5),m()}function d(){const t=e-(i&&i.lastUpdate||0)
t>=600?p():c=window.setTimeout(p,1e3*(600-t))}function w(t){t&&(i=t)}function h(){return o("fsh_seLog").then(w)}function b(){h().then(d)}export{a as disableBackgroundChecks,p as doBackgroundCheck,h as getFshSeLog,i as oldLog,b as seLog}
//# sourceMappingURL=seLog-37790384.js.map

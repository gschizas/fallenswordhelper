import{w as t,t as e,T as n}from"./calfSystem-9901ad27.js"
import{g as o,s}from"./idb-efff97cf.js"
function r(){return t({cmd:"superelite"})}let i,c,u
function f(){c&&(window.clearTimeout(c),c=!1),u&&(window.clearInterval(u),u=!1)}function a(t,e){const n=t-e.time,o=e.creature.name.replace(" (Super Elite)","");(!i.se[o]||i.se[o]<n)&&(i.se[o]=n)}function l(t){(function(t){return t&&t.t})(t)&&function(t){const n=Number(t.t.split(" ")[1])
i||(i={lastUpdate:0,se:{}}),i.lastUpdate=n
const o=t.r
o&&(o.forEach(e(a,n)),s("fsh_seLog",i))}(t)}function m(){return r().then(l)}function d(){return f(),u=window.setInterval(m,3e5),m()}function p(){const t=n-(i&&i.lastUpdate||0)
t>=600?d():c=window.setTimeout(d,1e3*(600-t))}function w(t){t&&(i=t)}function h(){return o("fsh_seLog").then(w)}function g(){h().then(p)}export{f as disableBackgroundChecks,d as doBackgroundCheck,h as getFshSeLog,i as oldLog,g as seLog}
//# sourceMappingURL=seLog-ec1abed0.js.map

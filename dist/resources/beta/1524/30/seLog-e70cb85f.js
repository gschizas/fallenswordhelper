import{w as t,t as e,S as n}from"./calfSystem-ebf4b17d.js"
import{g as o,s}from"./idb-b7d9067e.js"
function r(){return t({cmd:"superelite"})}let i,c,u
function a(){c&&(window.clearTimeout(c),c=!1),u&&(window.clearInterval(u),u=!1)}function f(t,e){const n=t-e.time,o=e.creature.name.replace(" (Super Elite)","");(!i.se[o]||i.se[o]<n)&&(i.se[o]=n)}function l(t){(function(t){return t&&t.t})(t)&&function(t){const n=Number(t.t.split(" ")[1])
i||(i={lastUpdate:0,se:{}}),i.lastUpdate=n
const o=t.r
o&&(o.forEach(e(f,n)),s("fsh_seLog",i))}(t)}function d(){return r().then(l)}function m(){return a(),u=window.setInterval(d,3e5),d()}function p(){const t=n-(i&&i.lastUpdate||0)
t>=600?m():c=window.setTimeout(m,1e3*(600-t))}function w(t){t&&(i=t)}function h(){return o("fsh_seLog").then(w)}function b(){h().then(p)}export{a as disableBackgroundChecks,m as doBackgroundCheck,h as getFshSeLog,i as oldLog,b as seLog}
//# sourceMappingURL=seLog-e70cb85f.js.map

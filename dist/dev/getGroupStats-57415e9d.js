import{ab as t,b0 as a,o as s,v as o,au as e,h as n,b1 as r,a$ as f,x as c}from"./calfSystem-0e5d6faf.js"
import{c as u}from"./createUl-514dab20.js"
import{c as i}from"./createButton-e9aea5fa.js"
import{g as m}from"./groupViewStats-95e5d3c2.js"
function p(a,s,o){const e=Math.floor(o/16)
return a[e]=t(a[e],[]),a[e].push(s),a}function d(t,f,c){const u=f.join(","),m=r[c],p=a(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(e,u)),n(p,d),n(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,u())}function h(t){const a=c(t)
return m(a)}function b(t){return f(t).then(h)}export{l as d,b as g}
//# sourceMappingURL=getGroupStats-57415e9d.js.map

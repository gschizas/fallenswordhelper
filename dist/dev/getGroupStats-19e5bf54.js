import{ab as t,b0 as s,o as a,v as o,au as e,h as n,b1 as r,a$ as c,x as f}from"./calfSystem-8dc0fa4b.js"
import{c as u}from"./createUl-ea106be9.js"
import{c as i}from"./createButton-0d666b00.js"
import{g as m}from"./groupViewStats-ed114cc2.js"
function p(s,a,o){const e=Math.floor(o/16)
return s[e]=t(s[e],[]),s[e].push(a),s}function d(t,c,f){const u=c.join(","),m=r[f],p=s(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(d,o(e,u)),n(p,d),n(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,u())}function b(t){const s=f(t)
return m(s)}function h(t){return c(t).then(b)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-19e5bf54.js.map

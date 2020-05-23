import{aa as t,a$ as a,o as s,v as o,ar as e,h as r,b0 as n,a_ as f,x as c}from"./calfSystem-1e164202.js"
import{c as u}from"./createUl-477ed217.js"
import{c as i}from"./createButton-85e0a2ef.js"
import{g as m}from"./groupViewStats-cbb9adf0.js"
function p(a,s,o){const e=Math.floor(o/16)
return a[e]=t(a[e],[]),a[e].push(s),a}function d(t,f,c){const u=f.join(","),m=n[c],p=a(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(e,u)),r(p,d),r(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,u())}function h(t){const a=c(t)
return m(a)}function j(t){return f(t).then(h)}export{l as d,j as g}
//# sourceMappingURL=getGroupStats-e4e6ac84.js.map

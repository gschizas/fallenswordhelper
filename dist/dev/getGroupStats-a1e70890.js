import{ab as t,b0 as a,o as s,v as o,au as e,h as n,b1 as r,a$ as f,x as c}from"./calfSystem-9b1fa4ca.js"
import{c as u}from"./createUl-4f91ab2c.js"
import{c as i}from"./createButton-91feba56.js"
import{g as m}from"./groupViewStats-8eb7ee83.js"
function p(a,s,o){const e=Math.floor(o/16)
return a[e]=t(a[e],[]),a[e].push(s),a}function b(t,f,c){const u=f.join(","),m=r[c],p=a(),b=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(b,o(e,u)),n(p,b),n(t,p),t}function l(t){return t.reduce(p,[]).reduce(b,u())}function d(t){const a=c(t)
return m(a)}function h(t){return f(t).then(d)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-a1e70890.js.map

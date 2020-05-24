import{aa as t,a$ as a,o as s,u as o,at as e,f as n,b0 as r,a_ as f,w as c}from"./calfSystem-d96a3efd.js"
import{c as u}from"./createUl-78e0780b.js"
import{c as i}from"./createButton-e6d20fb1.js"
import{g as m}from"./groupViewStats-fc9bca6b.js"
function p(a,s,o){const e=Math.floor(o/16)
return a[e]=t(a[e],[]),a[e].push(s),a}function d(t,f,c){const u=f.join(","),m=r[c],p=a(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(e,u)),n(p,d),n(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,u())}function b(t){const a=c(t)
return m(a)}function h(t){return f(t).then(b)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-c4f3e3f6.js.map

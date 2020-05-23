import{aa as t,a$ as a,o as s,v as o,ar as r,h as n,b0 as e,a_ as c,x as f}from"./calfSystem-2fb02284.js"
import{c as u}from"./createUl-b1ac3c76.js"
import{c as i}from"./createButton-2380baa8.js"
import{g as m}from"./groupViewStats-0bc3f0f0.js"
function p(a,s,o){const r=Math.floor(o/16)
return a[r]=t(a[r],[]),a[r].push(s),a}function l(t,c,f){const u=c.join(","),m=e[f],p=a(),l=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(l,o(r,u)),n(p,l),n(t,p),t}function b(t){return t.reduce(p,[]).reduce(l,u())}function d(t){const a=f(t)
return m(a)}function h(t){return c(t).then(d)}export{b as d,h as g}
//# sourceMappingURL=getGroupStats-a47e4368.js.map

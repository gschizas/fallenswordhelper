import{aa as t,a$ as a,o as s,v as o,ar as r,h as n,b0 as e,a_ as c,x as f}from"./calfSystem-07c25a1c.js"
import{c as u}from"./createUl-06e31567.js"
import{c as i}from"./createButton-ffeacb28.js"
import{g as m}from"./groupViewStats-83bbf950.js"
function p(a,s,o){const r=Math.floor(o/16)
return a[r]=t(a[r],[]),a[r].push(s),a}function l(t,c,f){const u=c.join(","),m=e[f],p=a(),l=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(l,o(r,u)),n(p,l),n(t,p),t}function d(t){return t.reduce(p,[]).reduce(l,u())}function h(t){const a=f(t)
return m(a)}function b(t){return c(t).then(h)}export{d,b as g}
//# sourceMappingURL=getGroupStats-57ae4f76.js.map

import{aa as t,a$ as a,o as s,v as o,ar as r,h as n,b0 as e,a_ as c,x as f}from"./calfSystem-72fdbe97.js"
import{c as u}from"./createUl-43d45b37.js"
import{c as i}from"./createButton-24b50aa0.js"
import{g as m}from"./groupViewStats-d15a6c7a.js"
function p(a,s,o){const r=Math.floor(o/16)
return a[r]=t(a[r],[]),a[r].push(s),a}function d(t,c,f){const u=c.join(","),m=e[f],p=a(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(r,u)),n(p,d),n(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,u())}function h(t){const a=f(t)
return m(a)}function b(t){return c(t).then(h)}export{l as d,b as g}
//# sourceMappingURL=getGroupStats-756b3cc6.js.map

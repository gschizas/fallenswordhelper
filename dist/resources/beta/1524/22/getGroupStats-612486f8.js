import{a2 as t,o as a,t as o,h as s,aP as e,ax as r,v as f}from"./calfSystem-1b876afa.js"
import{o as n}from"./openQuickBuffByName-40bbfe57.js"
import{c}from"./createUl-b5389607.js"
import{c as i}from"./createButton-9abbf075.js"
import{c as u}from"./createLi-a08cafae.js"
import{g as m}from"./groupViewStats-6d33ecea.js"
function p(a,o,s){const e=Math.floor(s/16)
return a[e]=t(a[e],[]),a[e].push(o),a}function l(t,r,f){const c=r.join(","),m=e[f],p=u(),l=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(l,o(n,c)),s(p,l),s(t,p),t}function b(t){return t.reduce(p,[]).reduce(l,c())}function d(t){const a=f(t)
return m(a)}function j(t){return r(t).then(d)}export{b as d,j as g}
//# sourceMappingURL=getGroupStats-612486f8.js.map

import{a1 as t,o as a,s,f as o,aS as e,aR as r,u as n}from"./calfSystem-d49dbbd3.js"
import{o as c}from"./openQuickBuffByName-b2ea945d.js"
import{c as f}from"./createUl-679c9bc5.js"
import{c as u}from"./createButton-27be9a2a.js"
import{c as i}from"./createLi-db4bb92d.js"
import{g as m}from"./groupViewStats-e8ea5aa4.js"
function p(a,s,o){const e=Math.floor(o/16)
return a[e]=t(a[e],[]),a[e].push(s),a}function d(t,r,n){const f=r.join(","),m=e[n],p=i(),d=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(d,s(c,f)),o(p,d),o(t,p),t}function b(t){return t.reduce(p,[]).reduce(d,f())}function l(t){const a=n(t)
return m(a)}function j(t){return r(t).then(l)}export{b as d,j as g}
//# sourceMappingURL=getGroupStats-c29fb5ac.js.map

import{a2 as t,o,t as s,f as a,aP as r,ax as e,v as n}from"./calfSystem-05554bae.js"
import{o as c}from"./openQuickBuffByName-5ddc4d1b.js"
import{c as f}from"./createUl-8c07ba25.js"
import{c as i}from"./createButton-3a781ecf.js"
import{c as u}from"./createLi-6810292b.js"
import{g as m}from"./groupViewStats-839c0051.js"
function p(o,s,a){const r=Math.floor(a/16)
return o[r]=t(o[r],[]),o[r].push(s),o}function d(t,e,n){const f=e.join(","),m=r[n],p=u(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return o(d,s(c,f)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,f())}function j(t){const o=n(t)
return m(o)}function B(t){return e(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-0a5ba709.js.map

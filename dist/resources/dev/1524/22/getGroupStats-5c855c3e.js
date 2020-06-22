import{a3 as t,o,t as s,h as a,aR as r,aB as e,v as f}from"./calfSystem-4cc738f8.js"
import{o as c}from"./openQuickBuffByName-ecb987ca.js"
import{c as n}from"./createUl-a7d90b4b.js"
import{c as i}from"./createButton-8ff4d3ce.js"
import{c as u}from"./createLi-05521fe0.js"
import{g as m}from"./groupViewStats-7d14dd2f.js"
function p(o,s,a){const r=Math.floor(a/16)
return o[r]=t(o[r],[]),o[r].push(s),o}function d(t,e,f){const n=e.join(","),m=r[f],p=u(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return o(d,s(c,n)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,n())}function j(t){const o=f(t)
return m(o)}function B(t){return e(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-5c855c3e.js.map

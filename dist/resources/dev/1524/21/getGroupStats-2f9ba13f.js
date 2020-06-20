import{a3 as t,o,t as s,h as a,aR as r,aB as e,v as f}from"./calfSystem-9c7241dc.js"
import{o as n}from"./openQuickBuffByName-fbd53231.js"
import{c}from"./createUl-4c283c28.js"
import{c as i}from"./createButton-9da72fb3.js"
import{c as u}from"./createLi-064eff10.js"
import{g as m}from"./groupViewStats-166072d8.js"
function p(o,s,a){const r=Math.floor(a/16)
return o[r]=t(o[r],[]),o[r].push(s),o}function d(t,e,f){const c=e.join(","),m=r[f],p=u(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return o(d,s(n,c)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,c())}function j(t){const o=f(t)
return m(o)}function B(t){return e(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-2f9ba13f.js.map

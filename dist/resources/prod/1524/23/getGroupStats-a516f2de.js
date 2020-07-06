import{a2 as t,o,t as s,h as a,aP as r,ax as f,v as e}from"./calfSystem-019de1cf.js"
import{o as n}from"./openQuickBuffByName-9757122d.js"
import{c}from"./createUl-80b6130b.js"
import{c as i}from"./createButton-d01168f9.js"
import{c as u}from"./createLi-ff517651.js"
import{g as m}from"./groupViewStats-4a9fbfc2.js"
function p(o,s,a){const r=Math.floor(a/16)
return o[r]=t(o[r],[]),o[r].push(s),o}function d(t,f,e){const c=f.join(","),m=r[e],p=u(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return o(d,s(n,c)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,c())}function j(t){const o=e(t)
return m(o)}function h(t){return f(t).then(j)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-a516f2de.js.map

import{a2 as t,o,t as s,f as a,aP as r,ax as e,v as n}from"./calfSystem-03970067.js"
import{o as c}from"./openQuickBuffByName-d2028079.js"
import{c as f}from"./createUl-ac0a6ac2.js"
import{c as i}from"./createButton-082f5876.js"
import{c as u}from"./createLi-1e5d4784.js"
import{g as m}from"./groupViewStats-bddb9c75.js"
function p(o,s,a){const r=Math.floor(a/16)
return o[r]=t(o[r],[]),o[r].push(s),o}function d(t,e,n){const f=e.join(","),m=r[n],p=u(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return o(d,s(c,f)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,f())}function j(t){const o=n(t)
return m(o)}function B(t){return e(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-7b21e6cd.js.map

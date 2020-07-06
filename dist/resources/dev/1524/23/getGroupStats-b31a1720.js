import{a3 as t,o as a,t as o,h as s,aR as r,aB as e,v as n}from"./calfSystem-9901ad27.js"
import{o as f}from"./openQuickBuffByName-181ee98a.js"
import{c}from"./createUl-850a409c.js"
import{c as i}from"./createButton-109df573.js"
import{c as u}from"./createLi-1a2b8a09.js"
import{g as m}from"./groupViewStats-871935ff.js"
function p(a,o,s){const r=Math.floor(s/16)
return a[r]=t(a[r],[]),a[r].push(o),a}function d(t,e,n){const c=e.join(","),m=r[n],p=u(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(d,o(f,c)),s(p,d),s(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,c())}function j(t){const a=n(t)
return m(a)}function B(t){return e(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-b31a1720.js.map

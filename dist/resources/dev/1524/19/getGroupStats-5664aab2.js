import{a1 as t,o as s,s as o,f as a,aS as r,aR as e,u as f}from"./calfSystem-f7574730.js"
import{o as n}from"./openQuickBuffByName-811c9a22.js"
import{c}from"./createUl-817f6f2d.js"
import{c as u}from"./createButton-0ed19c7f.js"
import{c as i}from"./createLi-2d521b48.js"
import{g as m}from"./groupViewStats-51acd02b.js"
function p(s,o,a){const r=Math.floor(a/16)
return s[r]=t(s[r],[]),s[r].push(o),s}function d(t,e,f){const c=e.join(","),m=r[f],p=i(),d=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(n,c)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,c())}function j(t){const s=f(t)
return m(s)}function B(t){return e(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-5664aab2.js.map

import{a1 as t,o as s,s as o,f as a,aS as r,aR as e,u as n}from"./calfSystem-1c103624.js"
import{o as c}from"./openQuickBuffByName-f6a38ccb.js"
import{c as f}from"./createUl-16e74031.js"
import{c as u}from"./createButton-c8469336.js"
import{c as i}from"./createLi-04a1a597.js"
import{g as m}from"./groupViewStats-21979267.js"
function p(s,o,a){const r=Math.floor(a/16)
return s[r]=t(s[r],[]),s[r].push(o),s}function l(t,e,n){const f=e.join(","),m=r[n],p=i(),l=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(l,o(c,f)),a(p,l),a(t,p),t}function j(t){return t.reduce(p,[]).reduce(l,f())}function d(t){const s=n(t)
return m(s)}function B(t){return e(t).then(d)}export{j as d,B as g}
//# sourceMappingURL=getGroupStats-28e852e0.js.map

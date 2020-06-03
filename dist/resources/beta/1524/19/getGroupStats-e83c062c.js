import{a0 as t,o as s,s as o,f as r,aQ as a,aP as e,u as n}from"./calfSystem-57340987.js"
import{o as c}from"./openQuickBuffByName-69b6986b.js"
import{c as f}from"./createUl-177687e9.js"
import{c as u}from"./createButton-9767d7d7.js"
import{c as i}from"./createLi-75db58db.js"
import{g as m}from"./groupViewStats-41cecc06.js"
function p(s,o,r){const a=Math.floor(r/16)
return s[a]=t(s[a],[]),s[a].push(o),s}function d(t,e,n){const f=e.join(","),m=a[n],p=i(),d=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(c,f)),r(p,d),r(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,f())}function j(t){const s=n(t)
return m(s)}function B(t){return e(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-e83c062c.js.map

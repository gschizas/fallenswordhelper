import{a0 as t,o as s,s as o,f as a,aQ as e,aP as f,u as r}from"./calfSystem-be09bdff.js"
import{o as n}from"./openQuickBuffByName-cbbf176e.js"
import{c}from"./createUl-56f7f17c.js"
import{c as u}from"./createButton-37baa643.js"
import{c as i}from"./createLi-e0f45f24.js"
import{g as m}from"./groupViewStats-1f55ee17.js"
function p(s,o,a){const e=Math.floor(a/16)
return s[e]=t(s[e],[]),s[e].push(o),s}function l(t,f,r){const c=f.join(","),m=e[r],p=i(),l=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(l,o(n,c)),a(p,l),a(t,p),t}function d(t){return t.reduce(p,[]).reduce(l,c())}function j(t){const s=r(t)
return m(s)}function b(t){return f(t).then(j)}export{d,b as g}
//# sourceMappingURL=getGroupStats-d88d21df.js.map

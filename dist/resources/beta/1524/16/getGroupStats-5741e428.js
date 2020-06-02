import{a0 as t,o as s,s as o,f as a,aQ as r,aP as f,u as e}from"./calfSystem-9554b525.js"
import{o as n}from"./openQuickBuffByName-72f82ff2.js"
import{c}from"./createUl-260acec8.js"
import{c as u}from"./createButton-6939b69a.js"
import{c as i}from"./createLi-83e7dd59.js"
import{g as m}from"./groupViewStats-f33f19af.js"
function p(s,o,a){const r=Math.floor(a/16)
return s[r]=t(s[r],[]),s[r].push(o),s}function d(t,f,e){const c=f.join(","),m=r[e],p=i(),d=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(n,c)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,c())}function j(t){const s=e(t)
return m(s)}function B(t){return f(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-5741e428.js.map

import{a0 as t,o as s,s as o,f as a,aQ as r,aP as e,u as f}from"./calfSystem-8b6534a5.js"
import{o as n}from"./openQuickBuffByName-ccc15ff1.js"
import{c}from"./createUl-56d1bad6.js"
import{c as u}from"./createButton-04628709.js"
import{c as i}from"./createLi-696c646d.js"
import{g as m}from"./groupViewStats-e821bbf3.js"
function p(s,o,a){const r=Math.floor(a/16)
return s[r]=t(s[r],[]),s[r].push(o),s}function d(t,e,f){const c=e.join(","),m=r[f],p=i(),d=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(n,c)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,c())}function j(t){const s=f(t)
return m(s)}function B(t){return e(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-796bc466.js.map

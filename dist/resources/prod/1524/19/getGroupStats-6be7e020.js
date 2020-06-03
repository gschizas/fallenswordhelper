import{a0 as t,o as s,s as o,f as a,aQ as r,aP as e,u as n}from"./calfSystem-6fc0cc1b.js"
import{o as c}from"./openQuickBuffByName-b0838d7a.js"
import{c as f}from"./createUl-a91b6072.js"
import{c as u}from"./createButton-d2526ab3.js"
import{c as i}from"./createLi-9b7c875f.js"
import{g as m}from"./groupViewStats-2943077d.js"
function p(s,o,a){const r=Math.floor(a/16)
return s[r]=t(s[r],[]),s[r].push(o),s}function d(t,e,n){const f=e.join(","),m=r[n],p=i(),d=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(c,f)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,f())}function j(t){const s=n(t)
return m(s)}function b(t){return e(t).then(j)}export{l as d,b as g}
//# sourceMappingURL=getGroupStats-6be7e020.js.map

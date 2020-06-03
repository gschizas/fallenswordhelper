import{a0 as t,o as s,s as o,f as a,aQ as r,aP as e,u as n}from"./calfSystem-4197cc22.js"
import{o as c}from"./openQuickBuffByName-d8a01295.js"
import{c as f}from"./createUl-57f7af43.js"
import{c as u}from"./createButton-7607da1c.js"
import{c as i}from"./createLi-35e5de37.js"
import{g as m}from"./groupViewStats-54e7c379.js"
function p(s,o,a){const r=Math.floor(a/16)
return s[r]=t(s[r],[]),s[r].push(o),s}function d(t,e,n){const f=e.join(","),m=r[n],p=i(),d=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(c,f)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,f())}function j(t){const s=n(t)
return m(s)}function B(t){return e(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-9d2784ad.js.map

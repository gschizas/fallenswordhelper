import{a0 as t,o as s,s as o,f as a,aQ as e,aP as r,u as c}from"./calfSystem-dec5e071.js"
import{o as n}from"./openQuickBuffByName-71c2a436.js"
import{c as f}from"./createUl-78e7ca74.js"
import{c as u}from"./createButton-2bca06f8.js"
import{c as i}from"./createLi-32610676.js"
import{g as m}from"./groupViewStats-4d6edfc1.js"
function p(s,o,a){const e=Math.floor(a/16)
return s[e]=t(s[e],[]),s[e].push(o),s}function d(t,r,c){const f=r.join(","),m=e[c],p=i(),d=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(n,f)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,f())}function j(t){const s=c(t)
return m(s)}function B(t){return r(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-2453a2cd.js.map

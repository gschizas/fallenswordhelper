import{a1 as t,o as s,s as a,f as o,aS as r,aR as e,u as c}from"./calfSystem-5545a3e6.js"
import{o as n}from"./openQuickBuffByName-790a8d74.js"
import{c as f}from"./createUl-4ac3809c.js"
import{c as u}from"./createButton-8ad42cc5.js"
import{c as i}from"./createLi-721e020f.js"
import{g as m}from"./groupViewStats-6c958ecc.js"
function p(s,a,o){const r=Math.floor(o/16)
return s[r]=t(s[r],[]),s[r].push(a),s}function d(t,e,c){const f=e.join(","),m=r[c],p=i(),d=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,a(n,f)),o(p,d),o(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,f())}function j(t){const s=c(t)
return m(s)}function B(t){return e(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-7437e673.js.map

import{$ as t,o as s,s as o,f as e,aK as r,aJ as a,u as f}from"./calfSystem-740ec4d2.js"
import{o as n}from"./openQuickBuffByName-e399773d.js"
import{c}from"./createUl-ebfbcd93.js"
import{c as u}from"./createButton-cf2f339d.js"
import{c as i}from"./createLi-1ed628b4.js"
import{g as m}from"./groupViewStats-f71b0e85.js"
function p(s,o,e){const r=Math.floor(e/16)
return s[r]=t(s[r],[]),s[r].push(o),s}function d(t,a,f){const c=a.join(","),m=r[f],p=i(),d=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(n,c)),e(p,d),e(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,c())}function j(t){const s=f(t)
return m(s)}function B(t){return a(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-ee5c54b1.js.map

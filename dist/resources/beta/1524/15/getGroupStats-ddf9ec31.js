import{$ as t,o as s,s as o,f as a,aK as r,aJ as e,u as f}from"./calfSystem-1262535f.js"
import{o as n}from"./openQuickBuffByName-05521d4e.js"
import{c}from"./createUl-17d107e3.js"
import{c as u}from"./createButton-641ff4d6.js"
import{c as i}from"./createLi-03da7c3b.js"
import{g as m}from"./groupViewStats-a19cc2a0.js"
function p(s,o,a){const r=Math.floor(a/16)
return s[r]=t(s[r],[]),s[r].push(o),s}function d(t,e,f){const c=e.join(","),m=r[f],p=i(),d=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(n,c)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,c())}function j(t){const s=f(t)
return m(s)}function B(t){return e(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-ddf9ec31.js.map

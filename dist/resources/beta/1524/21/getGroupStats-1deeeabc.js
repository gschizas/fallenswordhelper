import{a2 as t,o,t as s,h as a,aP as r,ax as e,v as f}from"./calfSystem-89b939c8.js"
import{o as n}from"./openQuickBuffByName-47f4b290.js"
import{c}from"./createUl-f8d9693f.js"
import{c as i}from"./createButton-01e8c8ad.js"
import{c as u}from"./createLi-985f971f.js"
import{g as m}from"./groupViewStats-5b0d6cc7.js"
function p(o,s,a){const r=Math.floor(a/16)
return o[r]=t(o[r],[]),o[r].push(s),o}function d(t,e,f){const c=e.join(","),m=r[f],p=u(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return o(d,s(n,c)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,c())}function j(t){const o=f(t)
return m(o)}function h(t){return e(t).then(j)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-1deeeabc.js.map

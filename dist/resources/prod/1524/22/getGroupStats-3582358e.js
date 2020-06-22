import{a2 as t,o,t as s,h as a,aP as r,ax as e,v as f}from"./calfSystem-d04e4be4.js"
import{o as n}from"./openQuickBuffByName-3b6db0bb.js"
import{c}from"./createUl-0f36c584.js"
import{c as i}from"./createButton-d330fff9.js"
import{c as u}from"./createLi-392dacb2.js"
import{g as m}from"./groupViewStats-f367d3e1.js"
function p(o,s,a){const r=Math.floor(a/16)
return o[r]=t(o[r],[]),o[r].push(s),o}function d(t,e,f){const c=e.join(","),m=r[f],p=u(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return o(d,s(n,c)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,c())}function b(t){const o=f(t)
return m(o)}function j(t){return e(t).then(b)}export{l as d,j as g}
//# sourceMappingURL=getGroupStats-3582358e.js.map

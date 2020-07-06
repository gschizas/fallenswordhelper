import{a2 as t,o as a,t as o,h as s,aP as e,ax as r,v as n}from"./calfSystem-34fcd691.js"
import{o as c}from"./openQuickBuffByName-f52e13a3.js"
import{c as f}from"./createUl-215dc001.js"
import{c as i}from"./createButton-4a2de711.js"
import{c as u}from"./createLi-6977e253.js"
import{g as m}from"./groupViewStats-cea0556a.js"
function p(a,o,s){const e=Math.floor(s/16)
return a[e]=t(a[e],[]),a[e].push(o),a}function d(t,r,n){const f=r.join(","),m=e[n],p=u(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(d,o(c,f)),s(p,d),s(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,f())}function j(t){const a=n(t)
return m(a)}function h(t){return r(t).then(j)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-7e9479c2.js.map

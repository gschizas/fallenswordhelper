import{a2 as t,o,t as s,h as a,aP as r,ax as e,v as n}from"./calfSystem-2741d97b.js"
import{o as f}from"./openQuickBuffByName-85bc7291.js"
import{c}from"./createUl-f9269e30.js"
import{c as i}from"./createButton-3011f1ad.js"
import{c as u}from"./createLi-31c092b1.js"
import{g as m}from"./groupViewStats-31925435.js"
function p(o,s,a){const r=Math.floor(a/16)
return o[r]=t(o[r],[]),o[r].push(s),o}function d(t,e,n){const c=e.join(","),m=r[n],p=u(),d=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return o(d,s(f,c)),a(p,d),a(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,c())}function j(t){const o=n(t)
return m(o)}function h(t){return e(t).then(j)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-b72badc6.js.map

import{a3 as t,o as a,t as o,f as s,aR as r,aB as e,v as f}from"./calfSystem-a2862afc.js"
import{o as n}from"./openQuickBuffByName-808f9233.js"
import{c}from"./createUl-1aaeeb73.js"
import{c as i}from"./createButton-62b6c44a.js"
import{c as u}from"./createLi-bf7f453f.js"
import{g as m}from"./groupViewStats-496448bb.js"
function p(a,o,s){const r=Math.floor(s/16)
return a[r]=t(a[r],[]),a[r].push(o),a}function l(t,e,f){const c=e.join(","),m=r[f],p=u(),l=i({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return a(l,o(n,c)),s(p,l),s(t,p),t}function j(t){return t.reduce(p,[]).reduce(l,c())}function B(t){const a=f(t)
return m(a)}function b(t){return e(t).then(B)}export{j as d,b as g}
//# sourceMappingURL=getGroupStats-cbd31dac.js.map

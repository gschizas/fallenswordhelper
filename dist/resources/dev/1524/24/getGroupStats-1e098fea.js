import{a3 as t,o,h as e,aR as a,aB as r,v as s}from"./calfSystem-38898f3e.js"
import{o as f}from"./openQuickBuffByName-a5e51df0.js"
import{c as n}from"./createUl-ea06d8e3.js"
import{c}from"./createButton-ee9aa2e8.js"
import{c as u}from"./createLi-51008dca.js"
import{g as i}from"./groupViewStats-f7412e33.js"
function m(o,e,a){const r=Math.floor(a/16)
return o[r]=t(o[r],[]),o[r].push(e),o}function p(t,r,s){const n=r.join(","),i=a[s],m=u(),p=c({className:"fshBl fshBls tooltip-top-left",dataset:{tooltip:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${i} 16`})
return o(p,t=>{t.target.blur(),f(n)}),e(m,p),e(t,m),t}function l(t){return t.reduce(m,[]).reduce(p,n())}function d(t){const o=s(t)
return i(o)}function j(t){return r(t).then(d)}export{l as d,j as g}
//# sourceMappingURL=getGroupStats-1e098fea.js.map

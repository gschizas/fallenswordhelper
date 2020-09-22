import{a2 as t,o,h as r,aP as s,ax as a,v as e}from"./calfSystem-ec854151.js"
import{o as c}from"./openQuickBuffByName-94ccc2ce.js"
import{c as n}from"./createUl-d4749131.js"
import{c as f}from"./createButton-204d9ba6.js"
import{c as u}from"./createLi-ed584bda.js"
import{g as i}from"./groupViewStats-c8d94264.js"
function m(o,r,s){const a=Math.floor(s/16)
return o[a]=t(o[a],[]),o[a].push(r),o}function p(t,a,e){const n=a.join(","),i=s[e],m=u(),p=f({className:"fshBl fshBls tooltip-top-left",dataset:{tooltip:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${i} 16`})
return o(p,t=>{t.target.blur(),c(n)}),r(m,p),r(t,m),t}function l(t){return t.reduce(m,[]).reduce(p,n())}function d(t){const o=e(t)
return i(o)}function j(t){return a(t).then(d)}export{l as d,j as g}
//# sourceMappingURL=getGroupStats-0c9d7411.js.map

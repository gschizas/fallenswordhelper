import{a2 as t,o,h as r,aP as s,ax as a,v as e}from"./calfSystem-019a589c.js"
import{o as f}from"./openQuickBuffByName-d09d5fd8.js"
import{c as n}from"./createUl-5b761c85.js"
import{c}from"./createButton-c1ed8050.js"
import{c as u}from"./createLi-99cf3233.js"
import{g as i}from"./groupViewStats-59bf9020.js"
function m(o,r,s){const a=Math.floor(s/16)
return o[a]=t(o[a],[]),o[a].push(r),o}function p(t,a,e){const n=a.join(","),i=s[e],m=u(),p=c({className:"fshBl fshBls tooltip-top-left",dataset:{tooltip:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${i} 16`})
return o(p,t=>{t.target.blur(),f(n)}),r(m,p),r(t,m),t}function l(t){return t.reduce(m,[]).reduce(p,n())}function d(t){const o=e(t)
return i(o)}function j(t){return a(t).then(d)}export{l as d,j as g}
//# sourceMappingURL=getGroupStats-034a6481.js.map

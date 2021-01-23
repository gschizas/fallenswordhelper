import{c as t}from"./chunk-a5250b9a.js"
import{c as o}from"./createButton-3f9a1ed2.js"
import{c as r}from"./createLi-f8ee049c.js"
import{c as s}from"./createUl-7863af9d.js"
import{h as e,o as a,V as f,bc as n,aC as c,v as u}from"./calfSystem-393ab895.js"
import{o as i}from"./openQuickBuffByName-47bff80e.js"
import{g as m}from"./groupViewStats-7e6214e3.js"
function p(t,s){const n=r(),c=o({className:"fshBl fshBls",textContent:t})
return a(c,(o=>{o.target.blur(),i(s),f("doBuffLinks",t)})),e(n,c),n}function j(t,o,r){return e(t,p(`Buff ${n[r]} 16`,o.join(","))),t}function l(o){const r=t(16,o),a=s()
return r.length>1&&e(a,p("Buff All",o.join(","))),r.reduce(j,a)}function B(t){const o=u(t)
return m(o)}function h(t){return c(t).then(B)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-82205add.js.map

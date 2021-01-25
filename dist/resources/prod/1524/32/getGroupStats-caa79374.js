import{c as t}from"./chunk-b2ca1969.js"
import{c as o}from"./createButton-ba5300bd.js"
import{c as r}from"./createLi-d9f67232.js"
import{c as s}from"./createUl-cac51f38.js"
import{h as a,o as n,V as f,b6 as c,av as e,v as u}from"./calfSystem-45544049.js"
import{o as i}from"./openQuickBuffByName-81a3ab3b.js"
import{g as m}from"./groupViewStats-fa028c91.js"
function p(t,s){const c=r(),e=o({className:"fshBl fshBls",textContent:t})
return n(e,(o=>{o.target.blur(),i(s),f("doBuffLinks",t)})),a(c,e),c}function j(t,o,r){return a(t,p(`Buff ${c[r]} 16`,o.join(","))),t}function l(o){const r=t(16,o),n=s()
return r.length>1&&a(n,p("Buff All",o.join(","))),r.reduce(j,n)}function B(t){const o=u(t)
return m(o)}function b(t){return e(t).then(B)}export{l as d,b as g}
//# sourceMappingURL=getGroupStats-caa79374.js.map

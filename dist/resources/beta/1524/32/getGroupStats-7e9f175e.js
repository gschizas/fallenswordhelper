import{c as t}from"./chunk-b2ca1969.js"
import{c as o}from"./createButton-426dccef.js"
import{c as r}from"./createLi-19fc157a.js"
import{c as s}from"./createUl-720b8c49.js"
import{h as f,o as a,V as n,b8 as e,ax as c,v as u}from"./calfSystem-26bcf570.js"
import{o as i}from"./openQuickBuffByName-effe4147.js"
import{g as m}from"./groupViewStats-6aabf859.js"
function p(t,s){const e=r(),c=o({className:"fshBl fshBls",textContent:t})
return a(c,(o=>{o.target.blur(),i(s),n("doBuffLinks",t)})),f(e,c),e}function j(t,o,r){return f(t,p(`Buff ${e[r]} 16`,o.join(","))),t}function l(o){const r=t(16,o),a=s()
return r.length>1&&f(a,p("Buff All",o.join(","))),r.reduce(j,a)}function B(t){const o=u(t)
return m(o)}function b(t){return c(t).then(B)}export{l as d,b as g}
//# sourceMappingURL=getGroupStats-7e9f175e.js.map

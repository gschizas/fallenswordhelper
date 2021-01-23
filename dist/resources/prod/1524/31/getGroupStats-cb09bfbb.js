import{c as t}from"./chunk-a5250b9a.js"
import{c as o}from"./createButton-504c23fa.js"
import{c as r}from"./createLi-d50677c3.js"
import{c as s}from"./createUl-e99a308b.js"
import{h as a,o as e,U as n,b5 as f,au as c,v as u}from"./calfSystem-7aee5245.js"
import{o as i}from"./openQuickBuffByName-88fe8230.js"
import{g as m}from"./groupViewStats-a14d046b.js"
function p(t,s){const f=r(),c=o({className:"fshBl fshBls",textContent:t})
return e(c,(o=>{o.target.blur(),i(s),n("doBuffLinks",t)})),a(f,c),f}function j(t,o,r){return a(t,p(`Buff ${f[r]} 16`,o.join(","))),t}function l(o){const r=t(16,o),e=s()
return r.length>1&&a(e,p("Buff All",o.join(","))),r.reduce(j,e)}function B(t){const o=u(t)
return m(o)}function h(t){return c(t).then(B)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-cb09bfbb.js.map

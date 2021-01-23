import{c as t}from"./chunk-a5250b9a.js"
import{c as e}from"./createButton-ee808427.js"
import{c as o}from"./createLi-582e821e.js"
import{c as r}from"./createUl-9aef984f.js"
import{h as s,o as a,U as n,b7 as f,aw as c,v as u}from"./calfSystem-47fc08ae.js"
import{o as i}from"./openQuickBuffByName-af8be47a.js"
import{g as m}from"./groupViewStats-e633cd97.js"
function p(t,r){const f=o(),c=e({className:"fshBl fshBls",textContent:t})
return a(c,(e=>{e.target.blur(),i(r),n("doBuffLinks",t)})),s(f,c),f}function j(t,e,o){return s(t,p(`Buff ${f[o]} 16`,e.join(","))),t}function l(e){const o=t(16,e),a=r()
return o.length>1&&s(a,p("Buff All",e.join(","))),o.reduce(j,a)}function B(t){const e=u(t)
return m(e)}function h(t){return c(t).then(B)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-23812a19.js.map

import{c as t}from"./chunk-b2ca1969.js"
import{c as a}from"./createButton-e73f2638.js"
import{c as o}from"./createLi-10f1145a.js"
import{c as r}from"./createUl-eb9ba17c.js"
import{h as s,o as n,W as e,bd as f,aD as c,v as u}from"./calfSystem-19a5d332.js"
import{o as i}from"./openQuickBuffByName-a375d5da.js"
import{g as m}from"./groupViewStats-c58b4aa0.js"
function p(t,r){const f=o(),c=a({className:"fshBl fshBls",textContent:t})
return n(c,(a=>{a.target.blur(),i(r),e("doBuffLinks",t)})),s(f,c),f}function j(t,a,o){return s(t,p(`Buff ${f[o]} 16`,a.join(","))),t}function l(a){const o=t(16,a),n=r()
return o.length>1&&s(n,p("Buff All",a.join(","))),o.reduce(j,n)}function B(t){const a=u(t)
return m(a)}function d(t){return c(t).then(B)}export{l as d,d as g}
//# sourceMappingURL=getGroupStats-366c8b41.js.map

import{h as t,o as a,V as o,aR as r,aB as s,v as f}from"./calfSystem-4991bf5b.js"
import{o as n}from"./openQuickBuffByName-94fca028.js"
import{c as e}from"./createUl-f7da9962.js"
import{c}from"./createButton-48f285a2.js"
import{c as u}from"./createLi-674aae30.js"
import{c as i}from"./chunk-5f9a7027.js"
import{g as m}from"./groupViewStats-20e7691a.js"
function p(r,s){const f=u(),e=c({className:"fshBl fshBls",textContent:r})
return a(e,t=>{t.target.blur(),n(s),o("doBuffLinks",r)}),t(f,e),f}function j(a,o,s){return t(a,p(`Buff ${r[s]} 16`,o.join(","))),a}function l(a){const o=i(16,a),r=e()
return o.length>1&&t(r,p("Buff All",a.join(","))),o.reduce(j,r)}function B(t){const a=f(t)
return m(a)}function h(t){return s(t).then(B)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-455cf92c.js.map

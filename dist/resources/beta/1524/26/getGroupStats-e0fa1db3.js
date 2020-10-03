import{h as t,o,U as r,aP as s,ax as a,v as c}from"./calfSystem-cf4d22a7.js"
import{o as n}from"./openQuickBuffByName-905195be.js"
import{c as f}from"./createUl-47f4cf49.js"
import{c as e}from"./createButton-28cc4a62.js"
import{c as u}from"./createLi-c2c5249d.js"
import{c as i}from"./chunk-5f9a7027.js"
import{g as m}from"./groupViewStats-bc1654c0.js"
function p(s,a){const c=u(),f=e({className:"fshBl fshBls",textContent:s})
return o(f,t=>{t.target.blur(),n(a),r("doBuffLinks",s)}),t(c,f),c}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=f()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=c(t)
return m(o)}function h(t){return a(t).then(B)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-e0fa1db3.js.map

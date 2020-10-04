import{h as t,o,V as r,aP as s,ay as a,v as n}from"./calfSystem-70c7a660.js"
import{o as c}from"./openQuickBuffByName-caa214c8.js"
import{c as e}from"./createUl-41b45dbb.js"
import{c as f}from"./createButton-e241a765.js"
import{c as u}from"./createLi-ab74d72c.js"
import{c as i}from"./chunk-001468bc.js"
import{g as m}from"./groupViewStats-05616b2c.js"
function p(s,a){const n=u(),e=f({className:"fshBl fshBls",textContent:s})
return o(e,t=>{t.target.blur(),c(a),r("doBuffLinks",s)}),t(n,e),n}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=e()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=n(t)
return m(o)}function b(t){return a(t).then(B)}export{l as d,b as g}
//# sourceMappingURL=getGroupStats-23687841.js.map

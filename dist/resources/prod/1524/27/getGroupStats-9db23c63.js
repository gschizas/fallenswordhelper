import{h as t,o,V as r,aP as s,ay as a,v as f}from"./calfSystem-3bdf319e.js"
import{o as n}from"./openQuickBuffByName-223a30ec.js"
import{c as e}from"./createUl-4c832f49.js"
import{c}from"./createButton-ef816a4f.js"
import{c as u}from"./createLi-ffa2cc54.js"
import{c as i}from"./chunk-001468bc.js"
import{g as m}from"./groupViewStats-0d5a3c82.js"
function p(s,a){const f=u(),e=c({className:"fshBl fshBls",textContent:s})
return o(e,t=>{t.target.blur(),n(a),r("doBuffLinks",s)}),t(f,e),f}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=e()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=f(t)
return m(o)}function h(t){return a(t).then(B)}export{l as d,h as g}
//# sourceMappingURL=getGroupStats-9db23c63.js.map

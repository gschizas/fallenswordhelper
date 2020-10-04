import{h as t,o,W as r,aR as s,aC as a,v as e}from"./calfSystem-ec5e5725.js"
import{o as n}from"./openQuickBuffByName-9db0dd32.js"
import{c as f}from"./createUl-94da6fbb.js"
import{c}from"./createButton-142ef647.js"
import{c as u}from"./createLi-3233a571.js"
import{c as i}from"./chunk-001468bc.js"
import{g as m}from"./groupViewStats-8aca1ce7.js"
function p(s,a){const e=u(),f=c({className:"fshBl fshBls",textContent:s})
return o(f,t=>{t.target.blur(),n(a),r("doBuffLinks",s)}),t(e,f),e}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=f()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=e(t)
return m(o)}function d(t){return a(t).then(B)}export{l as d,d as g}
//# sourceMappingURL=getGroupStats-46cc7ba4.js.map

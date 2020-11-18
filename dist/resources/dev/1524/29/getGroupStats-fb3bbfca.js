import{h as t,o,V as r,aQ as s,aB as a,v as e}from"./calfSystem-02c48ff5.js"
import{o as n}from"./openQuickBuffByName-6e7bf41a.js"
import{c as f}from"./createUl-50d3a920.js"
import{c}from"./createButton-b782218b.js"
import{c as u}from"./createLi-31f6d1e3.js"
import{c as i}from"./chunk-a86d7cea.js"
import{g as m}from"./groupViewStats-bd6e1a8d.js"
function p(s,a){const e=u(),f=c({className:"fshBl fshBls",textContent:s})
return o(f,t=>{t.target.blur(),n(a),r("doBuffLinks",s)}),t(e,f),e}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=f()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=e(t)
return m(o)}function d(t){return a(t).then(B)}export{l as d,d as g}
//# sourceMappingURL=getGroupStats-fb3bbfca.js.map

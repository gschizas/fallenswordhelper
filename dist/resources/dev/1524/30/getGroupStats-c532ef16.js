import{h as t,o,V as r,aQ as s,aB as a,v as f}from"./calfSystem-54df10e3.js"
import{o as n}from"./openQuickBuffByName-437ea92a.js"
import{c as e}from"./createUl-1f6da03c.js"
import{c}from"./createButton-077faa0f.js"
import{c as u}from"./createLi-679bc3b4.js"
import{c as i}from"./chunk-c85463de.js"
import{g as m}from"./groupViewStats-41b449bf.js"
function p(s,a){const f=u(),e=c({className:"fshBl fshBls",textContent:s})
return o(e,t=>{t.target.blur(),n(a),r("doBuffLinks",s)}),t(f,e),f}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=e()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=f(t)
return m(o)}function d(t){return a(t).then(B)}export{l as d,d as g}
//# sourceMappingURL=getGroupStats-c532ef16.js.map

import{h as t,o,V as r,aR as s,aB as a,v as f}from"./calfSystem-69dd5601.js"
import{o as n}from"./openQuickBuffByName-a66e5d09.js"
import{c as e}from"./createUl-713f95e6.js"
import{c}from"./createButton-fadf93b3.js"
import{c as u}from"./createLi-55cf2570.js"
import{c as i}from"./chunk-a1c62f77.js"
import{g as m}from"./groupViewStats-94096c34.js"
function p(s,a){const f=u(),e=c({className:"fshBl fshBls",textContent:s})
return o(e,t=>{t.target.blur(),n(a),r("doBuffLinks",s)}),t(f,e),f}function j(o,r,a){return t(o,p(`Buff ${s[a]} 16`,r.join(","))),o}function l(o){const r=i(16,o),s=e()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(j,s)}function B(t){const o=f(t)
return m(o)}function d(t){return a(t).then(B)}export{l as d,d as g}
//# sourceMappingURL=getGroupStats-3eb271fa.js.map

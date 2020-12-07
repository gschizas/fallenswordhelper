import{h as t,o,U as r,aO as s,ax as e,v as a}from"./calfSystem-ebf4b17d.js"
import{o as n}from"./openQuickBuffByName-2e10a304.js"
import{c as f}from"./createUl-9ed188c7.js"
import{c}from"./createButton-b3c6a5bd.js"
import{c as u}from"./createLi-298ce08d.js"
import{c as i}from"./chunk-c85463de.js"
import{g as m}from"./groupViewStats-bff0a45d.js"
function p(s,e){const a=u(),f=c({className:"fshBl fshBls",textContent:s})
return o(f,t=>{t.target.blur(),n(e),r("doBuffLinks",s)}),t(a,f),a}function d(o,r,e){return t(o,p(`Buff ${s[e]} 16`,r.join(","))),o}function j(o){const r=i(16,o),s=f()
return r.length>1&&t(s,p("Buff All",o.join(","))),r.reduce(d,s)}function l(t){const o=a(t)
return m(o)}function B(t){return e(t).then(l)}export{j as d,B as g}
//# sourceMappingURL=getGroupStats-83a4a156.js.map

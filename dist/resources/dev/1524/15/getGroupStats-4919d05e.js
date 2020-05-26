import{a0 as t,o as s,s as o,f as e,aL as a,aK as r,u as n}from"./calfSystem-ee582533.js"
import{o as f}from"./openQuickBuffByName-60dde0f6.js"
import{c}from"./createUl-25b39286.js"
import{c as u}from"./createButton-6e7396b9.js"
import{c as i}from"./createLi-7e31709a.js"
import{g as m}from"./groupViewStats-839ced79.js"
function p(s,o,e){const a=Math.floor(e/16)
return s[a]=t(s[a],[]),s[a].push(o),s}function d(t,r,n){const c=r.join(","),m=a[n],p=i(),d=u({className:"fshBl fshBls tip-static",dataset:{tipped:"Quick buff functionality from HCS only does 16"},textContent:`Buff ${m} 16`})
return s(d,o(f,c)),e(p,d),e(t,p),t}function l(t){return t.reduce(p,[]).reduce(d,c())}function j(t){const s=n(t)
return m(s)}function B(t){return r(t).then(j)}export{l as d,B as g}
//# sourceMappingURL=getGroupStats-4919d05e.js.map

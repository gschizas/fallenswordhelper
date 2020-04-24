import{G as s,ax as e,bF as t,C as o,l as a,h as n,f as c,v as i,a0 as r}from"./calfSystem-3956a623.js"
import{c as f}from"./createInput-f6e26d5e.js"
import{o as m}from"./onlineDot-b559f6bb.js"
import{b as p}from"./batch-b53a2e4f.js"
import{c as l}from"./createLabel-6f6560b1.js"
function u(s){const e=t.exec(s.dataset.tipped)
o(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function b(){s("enhanceOnlineDots")&&p([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function h(s){const e=a({className:"fshCompressor"})
!function(s){const e=n(s,f({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,a({className:"fshCompress"}))
o(s.innerHTML,t),o("",s)}(s,e),n(s,e)}function g(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&h(s)}export{b as a,g as c}
//# sourceMappingURL=compressBio-fcb33b6b.js.map

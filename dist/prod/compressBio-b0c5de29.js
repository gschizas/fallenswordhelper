import{G as e,ax as s,bF as t,C as a,l as o,h as n,f as c,v as i,a0 as r}from"./calfSystem-d06402b1.js"
import{c as m}from"./createInput-91da4003.js"
import{o as p}from"./onlineDot-48ee187c.js"
import{b as f}from"./batch-ae75c711.js"
import{c as l}from"./createLabel-eced65a6.js"
function u(e){const s=t.exec(e.dataset.tipped)
a(p({min:s[3],hour:s[2],day:s[1]}),e.parentNode.previousElementSibling)}function d(){e("enhanceOnlineDots")&&f([5,3,s('#pCC a[data-tipped*="Last Activity"]'),0,u])}function h(e){const s=o({className:"fshCompressor"})
!function(e){const s=n(e,m({id:"fshCompressToggle",type:"checkbox"}))
c(s,"change",i(r,"bio","toggle"))}(s),n(s,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(e,s){const t=n(s,o({className:"fshCompress"}))
a(e.innerHTML,t),a("",e)}(e,s),n(e,s)}function g(e){e.clientHeight/function(e){const s=getComputedStyle(e)
return parseInt(s.getPropertyValue("font-size"),10)}(e)>10&&h(e)}export{d as a,g as c}
//# sourceMappingURL=compressBio-b0c5de29.js.map

import{G as e,ax as s,bF as t,C as o,l as a,h as n,f as c,v as i,a0 as r}from"./calfSystem-4b4fbec4.js"
import{c as f}from"./createInput-b0cbdcde.js"
import{o as m}from"./onlineDot-49f8ec51.js"
import{b as p}from"./batch-e2f1c9c8.js"
import{c as l}from"./createLabel-4edbf9a6.js"
function u(e){const s=t.exec(e.dataset.tipped)
o(m({min:s[3],hour:s[2],day:s[1]}),e.parentNode.previousElementSibling)}function b(){e("enhanceOnlineDots")&&p([5,3,s('#pCC a[data-tipped*="Last Activity"]'),0,u])}function d(e){const s=a({className:"fshCompressor"})
!function(e){const s=n(e,f({id:"fshCompressToggle",type:"checkbox"}))
c(s,"change",i(r,"bio","toggle"))}(s),n(s,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(e,s){const t=n(s,a({className:"fshCompress"}))
o(e.innerHTML,t),o("",e)}(e,s),n(e,s)}function h(e){e.clientHeight/function(e){const s=getComputedStyle(e)
return parseInt(s.getPropertyValue("font-size"),10)}(e)>10&&d(e)}export{b as a,h as c}
//# sourceMappingURL=compressBio-dbcec323.js.map

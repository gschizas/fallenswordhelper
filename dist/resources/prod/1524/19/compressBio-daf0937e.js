import{D as e,a7 as s,bl as t,z as o,k as a,f as n,e as c,s as i,S as r}from"./calfSystem-6fc0cc1b.js"
import{c as f}from"./createInput-75e5aa25.js"
import{o as m}from"./onlineDot-22e472e6.js"
import{b as p}from"./batch-b39f76d0.js"
import{c as l}from"./createLabel-2a8f516e.js"
function u(e){const s=t.exec(e.dataset.tipped)
o(m({min:s[3],hour:s[2],day:s[1]}),e.parentNode.previousElementSibling)}function g(){e("enhanceOnlineDots")&&p([5,3,s('#pCC a[data-tipped*="Last Activity"]'),0,u])}function h(e){const s=a({className:"fshCompressor"})
!function(e){const s=n(e,f({id:"fshCompressToggle",type:"checkbox"}))
c(s,"change",i(r,"bio","toggle"))}(s),n(s,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(e,s){const t=n(s,a({className:"fshCompress"}))
o(e.innerHTML,t),o("",e)}(e,s),n(e,s)}function d(e){e.clientHeight/function(e){const s=getComputedStyle(e)
return parseInt(s.getPropertyValue("font-size"),10)}(e)>10&&h(e)}export{g as a,d as c}
//# sourceMappingURL=compressBio-daf0937e.js.map

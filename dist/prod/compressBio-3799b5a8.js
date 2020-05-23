import{G as e,ax as s,bF as t,C as o,l as a,h as n,f as c,v as i,a0 as r}from"./calfSystem-4f7c0235.js"
import{c as m}from"./createInput-6766e17a.js"
import{o as p}from"./onlineDot-e2a5d8e2.js"
import{b as f}from"./batch-970fe719.js"
import{c as l}from"./createLabel-41462017.js"
function u(e){const s=t.exec(e.dataset.tipped)
o(p({min:s[3],hour:s[2],day:s[1]}),e.parentNode.previousElementSibling)}function h(){e("enhanceOnlineDots")&&f([5,3,s('#pCC a[data-tipped*="Last Activity"]'),0,u])}function g(e){const s=a({className:"fshCompressor"})
!function(e){const s=n(e,m({id:"fshCompressToggle",type:"checkbox"}))
c(s,"change",i(r,"bio","toggle"))}(s),n(s,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(e,s){const t=n(s,a({className:"fshCompress"}))
o(e.innerHTML,t),o("",e)}(e,s),n(e,s)}function d(e){e.clientHeight/function(e){const s=getComputedStyle(e)
return parseInt(s.getPropertyValue("font-size"),10)}(e)>10&&g(e)}export{h as a,d as c}
//# sourceMappingURL=compressBio-3799b5a8.js.map

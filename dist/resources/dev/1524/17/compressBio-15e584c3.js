import{D as e,ab as s,br as t,z as o,k as a,f as n,e as c,s as i,T as r}from"./calfSystem-1c103624.js"
import{c as f}from"./createInput-7f1f4562.js"
import{o as m}from"./onlineDot-764e0ffe.js"
import{b as p}from"./batch-5d6f84ee.js"
import{c as l}from"./createLabel-da6d9667.js"
function u(e){const s=t.exec(e.dataset.tipped)
o(m({min:s[3],hour:s[2],day:s[1]}),e.parentNode.previousElementSibling)}function d(){e("enhanceOnlineDots")&&p([5,3,s('#pCC a[data-tipped*="Last Activity"]'),0,u])}function g(e){const s=a({className:"fshCompressor"})
!function(e){const s=n(e,f({id:"fshCompressToggle",type:"checkbox"}))
c(s,"change",i(r,"bio","toggle"))}(s),n(s,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(e,s){const t=n(s,a({className:"fshCompress"}))
o(e.innerHTML,t),o("",e)}(e,s),n(e,s)}function h(e){e.clientHeight/function(e){const s=getComputedStyle(e)
return parseInt(s.getPropertyValue("font-size"),10)}(e)>10&&g(e)}export{d as a,h as c}
//# sourceMappingURL=compressBio-15e584c3.js.map

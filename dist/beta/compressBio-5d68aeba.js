import{G as e,ax as s,bL as t,C as a,l as o,h as n,f as c,v as i,a0 as r}from"./calfSystem-c91e004c.js"
import{c as f}from"./createInput-2ffac67f.js"
import{o as m}from"./onlineDot-ae8b9648.js"
import{b as p}from"./batch-1e9ecac6.js"
import{c as l}from"./createLabel-9169f406.js"
function u(e){const s=t.exec(e.dataset.tipped)
a(m({min:s[3],hour:s[2],day:s[1]}),e.parentNode.previousElementSibling)}function h(){e("enhanceOnlineDots")&&p([5,3,s('#pCC a[data-tipped*="Last Activity"]'),0,u])}function g(e){const s=o({className:"fshCompressor"})
!function(e){const s=n(e,f({id:"fshCompressToggle",type:"checkbox"}))
c(s,"change",i(r,"bio","toggle"))}(s),n(s,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(e,s){const t=n(s,o({className:"fshCompress"}))
a(e.innerHTML,t),a("",e)}(e,s),n(e,s)}function d(e){e.clientHeight/function(e){const s=getComputedStyle(e)
return parseInt(s.getPropertyValue("font-size"),10)}(e)>10&&g(e)}export{h as a,d as c}
//# sourceMappingURL=compressBio-5d68aeba.js.map

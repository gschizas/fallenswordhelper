import{G as e,ax as s,bF as t,C as o,l as a,h as n,f as c,v as i,a0 as r}from"./calfSystem-e6a24264.js"
import{c as m}from"./createInput-0d3b3ee8.js"
import{o as p}from"./onlineDot-7be5e04f.js"
import{b as f}from"./batch-7ebdfd88.js"
import{c as l}from"./createLabel-31db3868.js"
function d(e){const s=t.exec(e.dataset.tipped)
o(p({min:s[3],hour:s[2],day:s[1]}),e.parentNode.previousElementSibling)}function u(){e("enhanceOnlineDots")&&f([5,3,s('#pCC a[data-tipped*="Last Activity"]'),0,d])}function h(e){const s=a({className:"fshCompressor"})
!function(e){const s=n(e,m({id:"fshCompressToggle",type:"checkbox"}))
c(s,"change",i(r,"bio","toggle"))}(s),n(s,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(e,s){const t=n(s,a({className:"fshCompress"}))
o(e.innerHTML,t),o("",e)}(e,s),n(e,s)}function b(e){e.clientHeight/function(e){const s=getComputedStyle(e)
return parseInt(s.getPropertyValue("font-size"),10)}(e)>10&&h(e)}export{u as a,b as c}
//# sourceMappingURL=compressBio-625e890a.js.map

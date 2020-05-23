import{G as s,ax as e,bL as t,C as o,l as a,h as n,f as c,v as i,a0 as r}from"./calfSystem-70c0e373.js"
import{c as m}from"./createInput-0bc2f786.js"
import{o as p}from"./onlineDot-cbb49e00.js"
import{b as f}from"./batch-5d2b5520.js"
import{c as l}from"./createLabel-1ae85585.js"
function u(s){const e=t.exec(s.dataset.tipped)
o(p({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function h(){s("enhanceOnlineDots")&&f([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function b(s){const e=a({className:"fshCompressor"})
!function(s){const e=n(s,m({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,a({className:"fshCompress"}))
o(s.innerHTML,t),o("",s)}(s,e),n(s,e)}function g(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&b(s)}export{h as a,g as c}
//# sourceMappingURL=compressBio-084f79eb.js.map

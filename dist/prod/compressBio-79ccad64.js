import{G as s,ax as e,bF as t,C as o,l as a,h as n,f as c,v as i,a0 as r}from"./calfSystem-72fdbe97.js"
import{c as m}from"./createInput-00d19dd2.js"
import{o as p}from"./onlineDot-8dcf0c88.js"
import{b as f}from"./batch-b03d6988.js"
import{c as l}from"./createLabel-0393d946.js"
function d(s){const e=t.exec(s.dataset.tipped)
o(p({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function u(){s("enhanceOnlineDots")&&f([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,d])}function h(s){const e=a({className:"fshCompressor"})
!function(s){const e=n(s,m({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,a({className:"fshCompress"}))
o(s.innerHTML,t),o("",s)}(s,e),n(s,e)}function g(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&h(s)}export{u as a,g as c}
//# sourceMappingURL=compressBio-79ccad64.js.map

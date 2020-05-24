import{F as s,aw as e,bK as t,B as o,k as a,f as n,e as c,u as i,$ as r}from"./calfSystem-371c414c.js"
import{c as f}from"./createInput-d378f9d2.js"
import{o as m}from"./onlineDot-b47e695a.js"
import{b as p}from"./batch-96f40a5d.js"
import{c as l}from"./createLabel-146da34f.js"
function u(s){const e=t.exec(s.dataset.tipped)
o(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function d(){s("enhanceOnlineDots")&&p([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function g(s){const e=a({className:"fshCompressor"})
!function(s){const e=n(s,f({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,a({className:"fshCompress"}))
o(s.innerHTML,t),o("",s)}(s,e),n(s,e)}function h(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&g(s)}export{d as a,h as c}
//# sourceMappingURL=compressBio-ca6fc476.js.map

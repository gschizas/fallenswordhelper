import{D as s,a7 as e,bk as t,z as o,k as a,f as n,e as c,s as i,S as r}from"./calfSystem-dec5e071.js"
import{c as f}from"./createInput-6f4c3b04.js"
import{o as m}from"./onlineDot-093223e2.js"
import{b as p}from"./batch-6962fbd8.js"
import{c as l}from"./createLabel-2805259f.js"
function u(s){const e=t.exec(s.dataset.tipped)
o(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function d(){s("enhanceOnlineDots")&&p([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function g(s){const e=a({className:"fshCompressor"})
!function(s){const e=n(s,f({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,a({className:"fshCompress"}))
o(s.innerHTML,t),o("",s)}(s,e),n(s,e)}function h(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&g(s)}export{d as a,h as c}
//# sourceMappingURL=compressBio-ba4303f6.js.map

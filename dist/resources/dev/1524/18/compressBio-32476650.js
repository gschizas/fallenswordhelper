import{D as s,ab as e,bs as t,z as o,k as a,f as n,e as c,s as i,T as r}from"./calfSystem-5545a3e6.js"
import{c as f}from"./createInput-836d9f1f.js"
import{o as m}from"./onlineDot-2be3f424.js"
import{b as p}from"./batch-21ff5577.js"
import{c as l}from"./createLabel-062664fb.js"
function u(s){const e=t.exec(s.dataset.tipped)
o(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function g(){s("enhanceOnlineDots")&&p([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function h(s){const e=a({className:"fshCompressor"})
!function(s){const e=n(s,f({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,a({className:"fshCompress"}))
o(s.innerHTML,t),o("",s)}(s,e),n(s,e)}function b(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&h(s)}export{g as a,b as c}
//# sourceMappingURL=compressBio-32476650.js.map

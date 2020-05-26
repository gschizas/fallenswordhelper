import{D as s,ah as e,bx as t,z as o,k as a,f as n,e as c,s as i,R as r}from"./calfSystem-1262535f.js"
import{c as f}from"./createInput-62cab8cf.js"
import{o as m}from"./onlineDot-7b6024de.js"
import{b as p}from"./batch-f97a2ba5.js"
import{c as l}from"./createLabel-7ec6b2f8.js"
function u(s){const e=t.exec(s.dataset.tipped)
o(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function h(){s("enhanceOnlineDots")&&p([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function b(s){const e=a({className:"fshCompressor"})
!function(s){const e=n(s,f({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,a({className:"fshCompress"}))
o(s.innerHTML,t),o("",s)}(s,e),n(s,e)}function g(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&b(s)}export{h as a,g as c}
//# sourceMappingURL=compressBio-2909e2b8.js.map

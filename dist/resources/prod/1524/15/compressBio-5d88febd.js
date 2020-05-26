import{D as e,ah as s,bs as t,z as o,k as a,f as n,e as c,s as i,R as r}from"./calfSystem-740ec4d2.js"
import{c as m}from"./createInput-e6e1d6b3.js"
import{o as p}from"./onlineDot-176ac2e8.js"
import{b as f}from"./batch-b6a89158.js"
import{c as l}from"./createLabel-de0fa934.js"
function u(e){const s=t.exec(e.dataset.tipped)
o(p({min:s[3],hour:s[2],day:s[1]}),e.parentNode.previousElementSibling)}function d(){e("enhanceOnlineDots")&&f([5,3,s('#pCC a[data-tipped*="Last Activity"]'),0,u])}function h(e){const s=a({className:"fshCompressor"})
!function(e){const s=n(e,m({id:"fshCompressToggle",type:"checkbox"}))
c(s,"change",i(r,"bio","toggle"))}(s),n(s,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(e,s){const t=n(s,a({className:"fshCompress"}))
o(e.innerHTML,t),o("",e)}(e,s),n(e,s)}function g(e){e.clientHeight/function(e){const s=getComputedStyle(e)
return parseInt(s.getPropertyValue("font-size"),10)}(e)>10&&h(e)}export{d as a,g as c}
//# sourceMappingURL=compressBio-5d88febd.js.map

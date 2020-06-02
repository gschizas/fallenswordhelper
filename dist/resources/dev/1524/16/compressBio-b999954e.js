import{D as s,ab as e,bs as t,z as o,k as a,f as n,e as c,s as i,T as r}from"./calfSystem-d49dbbd3.js"
import{c as m}from"./createInput-1699d448.js"
import{o as p}from"./onlineDot-ccdd1fa5.js"
import{b as f}from"./batch-3c533826.js"
import{c as d}from"./createLabel-f30a5e2d.js"
function l(s){const e=t.exec(s.dataset.tipped)
o(p({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function u(){s("enhanceOnlineDots")&&f([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,l])}function g(s){const e=a({className:"fshCompressor"})
!function(s){const e=n(s,m({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,d({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,a({className:"fshCompress"}))
o(s.innerHTML,t),o("",s)}(s,e),n(s,e)}function h(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&g(s)}export{u as a,h as c}
//# sourceMappingURL=compressBio-b999954e.js.map

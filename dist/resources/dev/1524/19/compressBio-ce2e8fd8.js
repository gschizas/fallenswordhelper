import{D as s,ab as e,bs as t,z as o,k as a,f as n,e as c,s as i,T as r}from"./calfSystem-f7574730.js"
import{c as f}from"./createInput-ca63b3fd.js"
import{o as m}from"./onlineDot-92df8d13.js"
import{b as p}from"./batch-0781b5ad.js"
import{c as l}from"./createLabel-b9e7f95b.js"
function d(s){const e=t.exec(s.dataset.tipped)
o(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function u(){s("enhanceOnlineDots")&&p([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,d])}function b(s){const e=a({className:"fshCompressor"})
!function(s){const e=n(s,f({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,a({className:"fshCompress"}))
o(s.innerHTML,t),o("",s)}(s,e),n(s,e)}function g(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&b(s)}export{u as a,g as c}
//# sourceMappingURL=compressBio-ce2e8fd8.js.map

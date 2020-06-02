import{D as s,a7 as e,bl as t,z as o,k as a,f as n,e as c,s as i,S as r}from"./calfSystem-be09bdff.js"
import{c as f}from"./createInput-e2c4d8a7.js"
import{o as m}from"./onlineDot-39b7f8ab.js"
import{b as p}from"./batch-6fef336a.js"
import{c as l}from"./createLabel-b8c141b8.js"
function b(s){const e=t.exec(s.dataset.tipped)
o(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function u(){s("enhanceOnlineDots")&&p([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,b])}function d(s){const e=a({className:"fshCompressor"})
!function(s){const e=n(s,f({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,a({className:"fshCompress"}))
o(s.innerHTML,t),o("",s)}(s,e),n(s,e)}function g(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&d(s)}export{u as a,g as c}
//# sourceMappingURL=compressBio-0faac298.js.map

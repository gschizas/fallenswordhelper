import{G as s,aA as e,bP as t,C as a,l as o,h as n,f as c,v as i,a1 as r}from"./calfSystem-8dc0fa4b.js"
import{c as f}from"./createInput-29f46dac.js"
import{o as m}from"./onlineDot-1912add8.js"
import{b as p}from"./batch-5f01c08c.js"
import{c as l}from"./createLabel-fd3e7486.js"
function d(s){const e=t.exec(s.dataset.tipped)
a(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function u(){s("enhanceOnlineDots")&&p([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,d])}function h(s){const e=o({className:"fshCompressor"})
!function(s){const e=n(s,f({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,o({className:"fshCompress"}))
a(s.innerHTML,t),a("",s)}(s,e),n(s,e)}function g(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&h(s)}export{u as a,g as c}
//# sourceMappingURL=compressBio-6b3e10d2.js.map

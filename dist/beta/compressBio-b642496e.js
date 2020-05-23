import{G as s,ax as e,bL as t,C as a,l as o,h as n,f as c,v as i,a0 as r}from"./calfSystem-fb94ddf0.js"
import{c as f}from"./createInput-ba8eca60.js"
import{o as m}from"./onlineDot-f63d817a.js"
import{b as p}from"./batch-48a2259e.js"
import{c as l}from"./createLabel-32cbbbf5.js"
function u(s){const e=t.exec(s.dataset.tipped)
a(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function b(){s("enhanceOnlineDots")&&p([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function d(s){const e=o({className:"fshCompressor"})
!function(s){const e=n(s,f({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,o({className:"fshCompress"}))
a(s.innerHTML,t),a("",s)}(s,e),n(s,e)}function h(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&d(s)}export{b as a,h as c}
//# sourceMappingURL=compressBio-b642496e.js.map

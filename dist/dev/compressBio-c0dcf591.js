import{G as s,aA as e,bP as t,C as a,l as o,h as n,f as c,v as i,a1 as r}from"./calfSystem-70b0df7f.js"
import{c as f}from"./createInput-9a444f78.js"
import{o as m}from"./onlineDot-75119c69.js"
import{b as p}from"./batch-a98ea1eb.js"
import{c as l}from"./createLabel-f4168a93.js"
function u(s){const e=t.exec(s.dataset.tipped)
a(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function h(){s("enhanceOnlineDots")&&p([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function g(s){const e=o({className:"fshCompressor"})
!function(s){const e=n(s,f({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,o({className:"fshCompress"}))
a(s.innerHTML,t),a("",s)}(s,e),n(s,e)}function d(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&g(s)}export{h as a,d as c}
//# sourceMappingURL=compressBio-c0dcf591.js.map

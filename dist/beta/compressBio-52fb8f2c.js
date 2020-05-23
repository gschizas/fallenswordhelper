import{G as s,ax as e,bL as t,C as a,l as o,h as n,f as c,v as i,a0 as r}from"./calfSystem-2fb02284.js"
import{c as m}from"./createInput-a9eddcea.js"
import{o as p}from"./onlineDot-734cdd2c.js"
import{b as f}from"./batch-7429ab00.js"
import{c as l}from"./createLabel-5cc48f5d.js"
function d(s){const e=t.exec(s.dataset.tipped)
a(p({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function u(){s("enhanceOnlineDots")&&f([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,d])}function h(s){const e=o({className:"fshCompressor"})
!function(s){const e=n(s,m({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,o({className:"fshCompress"}))
a(s.innerHTML,t),a("",s)}(s,e),n(s,e)}function g(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&h(s)}export{u as a,g as c}
//# sourceMappingURL=compressBio-52fb8f2c.js.map

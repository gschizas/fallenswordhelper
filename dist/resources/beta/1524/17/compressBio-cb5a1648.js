import{D as s,a7 as e,bp as t,z as a,k as o,f as n,e as c,s as i,S as r}from"./calfSystem-02ae8657.js"
import{c as p}from"./createInput-cbb1c2cb.js"
import{o as m}from"./onlineDot-73a15da0.js"
import{b as f}from"./batch-149b9740.js"
import{c as l}from"./createLabel-73beda06.js"
function u(s){const e=t.exec(s.dataset.tipped)
a(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function b(){s("enhanceOnlineDots")&&f([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function d(s){const e=o({className:"fshCompressor"})
!function(s){const e=n(s,p({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,o({className:"fshCompress"}))
a(s.innerHTML,t),a("",s)}(s,e),n(s,e)}function g(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&d(s)}export{b as a,g as c}
//# sourceMappingURL=compressBio-cb5a1648.js.map

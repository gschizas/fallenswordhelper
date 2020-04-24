import{G as s,aA as e,bP as t,C as a,l as o,h as n,f as c,v as i,a1 as r}from"./calfSystem-9b1fa4ca.js"
import{c as f}from"./createInput-097870f4.js"
import{o as m}from"./onlineDot-ae55259c.js"
import{b as p}from"./batch-71913221.js"
import{c as l}from"./createLabel-9fc35de2.js"
function u(s){const e=t.exec(s.dataset.tipped)
a(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function h(){s("enhanceOnlineDots")&&p([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function g(s){const e=o({className:"fshCompressor"})
!function(s){const e=n(s,f({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,o({className:"fshCompress"}))
a(s.innerHTML,t),a("",s)}(s,e),n(s,e)}function d(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&g(s)}export{h as a,d as c}
//# sourceMappingURL=compressBio-194cf02b.js.map

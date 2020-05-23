import{G as s,aA as e,bP as t,C as o,l as a,h as n,f as c,v as i,a1 as r}from"./calfSystem-fd021443.js"
import{c as f}from"./createInput-309e97c5.js"
import{o as m}from"./onlineDot-4ccbcf3f.js"
import{b as p}from"./batch-111227ce.js"
import{c as l}from"./createLabel-7143722b.js"
function u(s){const e=t.exec(s.dataset.tipped)
o(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function h(){s("enhanceOnlineDots")&&p([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function g(s){const e=a({className:"fshCompressor"})
!function(s){const e=n(s,f({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,a({className:"fshCompress"}))
o(s.innerHTML,t),o("",s)}(s,e),n(s,e)}function d(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&g(s)}export{h as a,d as c}
//# sourceMappingURL=compressBio-289f7e59.js.map

import{G as s,aA as e,bQ as t,C as o,l as a,h as n,f as c,v as i,a1 as r}from"./calfSystem-94018cd0.js"
import{c as f}from"./createInput-cfb8faf0.js"
import{o as m}from"./onlineDot-954d045b.js"
import{b as p}from"./batch-952c7796.js"
import{c as l}from"./createLabel-7e7c4883.js"
function u(s){const e=t.exec(s.dataset.tipped)
o(m({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function h(){s("enhanceOnlineDots")&&p([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function d(s){const e=a({className:"fshCompressor"})
!function(s){const e=n(s,f({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,a({className:"fshCompress"}))
o(s.innerHTML,t),o("",s)}(s,e),n(s,e)}function g(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&d(s)}export{h as a,g as c}
//# sourceMappingURL=compressBio-c5a80000.js.map

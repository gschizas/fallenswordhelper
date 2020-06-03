import{D as s,a7 as e,bq as t,z as o,k as a,f as n,e as c,s as i,S as r}from"./calfSystem-57340987.js"
import{c as m}from"./createInput-b52727dd.js"
import{o as p}from"./onlineDot-b1eebf88.js"
import{b as f}from"./batch-e5312d78.js"
import{c as l}from"./createLabel-688f4536.js"
function u(s){const e=t.exec(s.dataset.tipped)
o(p({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function d(){s("enhanceOnlineDots")&&f([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function g(s){const e=a({className:"fshCompressor"})
!function(s){const e=n(s,m({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,a({className:"fshCompress"}))
o(s.innerHTML,t),o("",s)}(s,e),n(s,e)}function h(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&g(s)}export{d as a,h as c}
//# sourceMappingURL=compressBio-561c939f.js.map

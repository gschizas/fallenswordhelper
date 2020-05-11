import{G as s,ax as e,bL as t,C as a,l as o,h as n,f as c,v as i,a0 as r}from"./calfSystem-99da704d.js"
import{c as m}from"./createInput-bb469b2f.js"
import{o as p}from"./onlineDot-880eaa67.js"
import{b as f}from"./batch-a8b2cb72.js"
import{c as l}from"./createLabel-44120823.js"
function u(s){const e=t.exec(s.dataset.tipped)
a(p({min:e[3],hour:e[2],day:e[1]}),s.parentNode.previousElementSibling)}function b(){s("enhanceOnlineDots")&&f([5,3,e('#pCC a[data-tipped*="Last Activity"]'),0,u])}function h(s){const e=o({className:"fshCompressor"})
!function(s){const e=n(s,m({id:"fshCompressToggle",type:"checkbox"}))
c(e,"change",i(r,"bio","toggle"))}(e),n(e,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(s,e){const t=n(e,o({className:"fshCompress"}))
a(s.innerHTML,t),a("",s)}(s,e),n(s,e)}function d(s){s.clientHeight/function(s){const e=getComputedStyle(s)
return parseInt(e.getPropertyValue("font-size"),10)}(s)>10&&h(s)}export{b as a,d as c}
//# sourceMappingURL=compressBio-42eff893.js.map

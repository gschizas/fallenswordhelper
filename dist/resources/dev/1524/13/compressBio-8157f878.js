import{G as e,aA as s,bP as t,C as o,l as a,h as n,f as c,v as i,a1 as r}from"./calfSystem-01eb06ed.js"
import{c as f}from"./createInput-7fd54c66.js"
import{o as m}from"./onlineDot-15ff94f9.js"
import{b as p}from"./batch-bf64c121.js"
import{c as l}from"./createLabel-94fe4ec2.js"
function u(e){const s=t.exec(e.dataset.tipped)
o(m({min:s[3],hour:s[2],day:s[1]}),e.parentNode.previousElementSibling)}function h(){e("enhanceOnlineDots")&&p([5,3,s('#pCC a[data-tipped*="Last Activity"]'),0,u])}function d(e){const s=a({className:"fshCompressor"})
!function(e){const s=n(e,f({id:"fshCompressToggle",type:"checkbox"}))
c(s,"change",i(r,"bio","toggle"))}(s),n(s,l({className:"sendLink",htmlFor:"fshCompressToggle"})),function(e,s){const t=n(s,a({className:"fshCompress"}))
o(e.innerHTML,t),o("",e)}(e,s),n(e,s)}function g(e){e.clientHeight/function(e){const s=getComputedStyle(e)
return parseInt(s.getPropertyValue("font-size"),10)}(e)>10&&d(e)}export{h as a,g as c}
//# sourceMappingURL=compressBio-8157f878.js.map

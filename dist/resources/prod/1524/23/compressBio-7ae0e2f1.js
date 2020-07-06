import{y as e,f as t,t as o,U as s}from"./calfSystem-019de1cf.js"
import{c as r}from"./createInput-939428fe.js"
import{c as f}from"./createLabel-eacd9ffb.js"
import{i as n}from"./insertElementBefore-f1fdb06b.js"
function a(e){e.parentNode.classList.add("fshCompressor"),function(e){const f=n(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(f,"change",o(s,"bio","toggle"))}(e),n(f({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}export default function(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&a(t)}
//# sourceMappingURL=compressBio-7ae0e2f1.js.map

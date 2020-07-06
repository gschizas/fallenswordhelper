import{y as e,f as t,t as o,V as s}from"./calfSystem-9901ad27.js"
import{c as r}from"./createInput-49d3d974.js"
import{c as n}from"./createLabel-f12268f8.js"
import{i as a}from"./insertElementBefore-f1fdb06b.js"
function f(e){e.parentNode.classList.add("fshCompressor"),function(e){const n=a(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(n,"change",o(s,"bio","toggle"))}(e),a(n({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}export default function(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&f(t)}
//# sourceMappingURL=compressBio-a29f2a2d.js.map

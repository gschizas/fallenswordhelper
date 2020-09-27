import{y as e,f as t,t as o,U as s}from"./calfSystem-d3aab5a8.js"
import{c as a}from"./createInput-09f522aa.js"
import{c as r}from"./createLabel-ded80731.js"
import{i as n}from"./insertElementBefore-286ff14c.js"
function f(e){e.parentNode.classList.add("fshCompressor"),function(e){const r=n(a({id:"fshCompressToggle",type:"checkbox"}),e)
t(r,"change",o(s,"bio","toggle"))}(e),n(r({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function c(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&f(t)}export default c
//# sourceMappingURL=compressBio-e1c741b3.js.map

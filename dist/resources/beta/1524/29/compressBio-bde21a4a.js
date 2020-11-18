import{y as e,f as t,t as o,U as s}from"./calfSystem-f9a27018.js"
import{c as r}from"./createInput-491c2556.js"
import{c as a}from"./createLabel-27f57f4d.js"
import{i as n}from"./insertElementBefore-7e0a7ce8.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const a=n(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(a,"change",o(s,"bio","toggle"))}(e),n(a({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function f(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}export default f
//# sourceMappingURL=compressBio-bde21a4a.js.map

import{y as e,f as t,t as o,U as s}from"./calfSystem-ebf4b17d.js"
import{c as r}from"./createInput-31c9c0fc.js"
import{c}from"./createLabel-c7d42264.js"
import{i as n}from"./insertElementBefore-1b96a575.js"
function a(e){e.parentNode.classList.add("fshCompressor"),function(e){const c=n(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(c,"change",o(s,"bio","toggle"))}(e),n(c({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function f(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&a(t)}export default f
//# sourceMappingURL=compressBio-904d898d.js.map

import{y as e,f as t,t as o,U as s}from"./calfSystem-57628ebe.js"
import{c as r}from"./createInput-b0ce969c.js"
import{c}from"./createLabel-94345ce1.js"
import{i as n}from"./insertElementBefore-7e0a7ce8.js"
function a(e){e.parentNode.classList.add("fshCompressor"),function(e){const c=n(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(c,"change",o(s,"bio","toggle"))}(e),n(c({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function i(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&a(t)}export default i
//# sourceMappingURL=compressBio-927da060.js.map

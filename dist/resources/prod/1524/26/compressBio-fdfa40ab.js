import{y as e,f as t,t as o,U as s}from"./calfSystem-a5fc99d4.js"
import{c as a}from"./createInput-2b13b662.js"
import{c as r}from"./createLabel-aaaa0dcd.js"
import{i as n}from"./insertElementBefore-47c09359.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const r=n(a({id:"fshCompressToggle",type:"checkbox"}),e)
t(r,"change",o(s,"bio","toggle"))}(e),n(r({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function i(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}export default i
//# sourceMappingURL=compressBio-fdfa40ab.js.map

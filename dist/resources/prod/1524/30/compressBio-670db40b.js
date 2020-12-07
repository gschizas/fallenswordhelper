import{y as e,f as t,t as o,U as s}from"./calfSystem-6459f18a.js"
import{c as r}from"./createInput-7be6e294.js"
import{c as a}from"./createLabel-f5b2081a.js"
import{i as n}from"./insertElementBefore-1b96a575.js"
function f(e){e.parentNode.classList.add("fshCompressor"),function(e){const a=n(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(a,"change",o(s,"bio","toggle"))}(e),n(a({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function i(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&f(t)}export default i
//# sourceMappingURL=compressBio-670db40b.js.map

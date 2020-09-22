import{y as e,f as t,t as o,U as s}from"./calfSystem-019a589c.js"
import{c as r}from"./createInput-62d3b51a.js"
import{c as a}from"./createLabel-7b42bf61.js"
import{i as n}from"./insertElementBefore-2ad05963.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const a=n(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(a,"change",o(s,"bio","toggle"))}(e),n(a({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function i(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}export default i
//# sourceMappingURL=compressBio-34682f89.js.map

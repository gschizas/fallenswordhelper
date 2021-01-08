import{y as e,f as t,t as o,V as s}from"./calfSystem-54df10e3.js"
import{c as r}from"./createInput-0ba53f77.js"
import{c as a}from"./createLabel-eb1c6e94.js"
import{i as n}from"./insertElementBefore-1b96a575.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const a=n(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(a,"change",o(s,"bio","toggle"))}(e),n(a({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function f(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}export default f
//# sourceMappingURL=compressBio-b67730a3.js.map

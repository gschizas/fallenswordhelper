import{y as e,f as t,t as o,V as s}from"./calfSystem-b136673a.js"
import{c as r}from"./createInput-08c848a9.js"
import{c as a}from"./createLabel-04ce59e0.js"
import{i as n}from"./insertElementBefore-eada6f05.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const a=n(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(a,"change",o(s,"bio","toggle"))}(e),n(a({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function i(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}export default i
//# sourceMappingURL=compressBio-1d830ca2.js.map

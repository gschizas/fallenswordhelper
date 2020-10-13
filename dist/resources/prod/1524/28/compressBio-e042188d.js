import{y as e,f as t,t as o,U as s}from"./calfSystem-a5da5210.js"
import{c as a}from"./createInput-0af9c89a.js"
import{c as r}from"./createLabel-5fa02d85.js"
import{i as n}from"./insertElementBefore-eada6f05.js"
function f(e){e.parentNode.classList.add("fshCompressor"),function(e){const r=n(a({id:"fshCompressToggle",type:"checkbox"}),e)
t(r,"change",o(s,"bio","toggle"))}(e),n(r({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}function c(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&f(t)}export default c
//# sourceMappingURL=compressBio-e042188d.js.map

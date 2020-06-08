import{y as e,e as t,t as o,U as s}from"./calfSystem-05554bae.js"
import{c as r}from"./createInput-b4c4948c.js"
import{c as a}from"./createLabel-ce6d9261.js"
import{i as n}from"./insertElementBefore-2ba0b318.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const a=n(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(a,"change",o(s,"bio","toggle"))}(e),n(a({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}export default function(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}
//# sourceMappingURL=compressBio-5a732bb6.js.map

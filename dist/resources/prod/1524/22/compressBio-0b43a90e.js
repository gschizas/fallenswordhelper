import{y as e,f as t,t as o,U as s}from"./calfSystem-d04e4be4.js"
import{c as r}from"./createInput-06f9cad3.js"
import{c as n}from"./createLabel-19df454f.js"
import{i as a}from"./insertElementBefore-cc030078.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const n=a(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(n,"change",o(s,"bio","toggle"))}(e),a(n({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}export default function(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}
//# sourceMappingURL=compressBio-0b43a90e.js.map

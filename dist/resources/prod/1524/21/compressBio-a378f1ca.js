import{y as e,f as t,t as o,U as s}from"./calfSystem-2741d97b.js"
import{c as r}from"./createInput-0f2d72fe.js"
import{c as a}from"./createLabel-6c3713b4.js"
import{i as n}from"./insertElementBefore-1ac41a54.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const a=n(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(a,"change",o(s,"bio","toggle"))}(e),n(a({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}export default function(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}
//# sourceMappingURL=compressBio-a378f1ca.js.map

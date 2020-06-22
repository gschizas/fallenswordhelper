import{y as e,f as t,t as o,V as s}from"./calfSystem-4cc738f8.js"
import{c as r}from"./createInput-8a96566e.js"
import{c as a}from"./createLabel-f247c95a.js"
import{i as c}from"./insertElementBefore-dcd1920e.js"
function n(e){e.parentNode.classList.add("fshCompressor"),function(e){const a=c(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(a,"change",o(s,"bio","toggle"))}(e),c(a({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}export default function(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&n(t)}
//# sourceMappingURL=compressBio-1785ad07.js.map

import{y as e,e as t,t as o,V as s}from"./calfSystem-a2862afc.js"
import{c as r}from"./createInput-457456bb.js"
import{c as a}from"./createLabel-0e59a017.js"
import{i as n}from"./insertElementBefore-372e5ad6.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const a=n(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(a,"change",o(s,"bio","toggle"))}(e),n(a({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}export default function(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}
//# sourceMappingURL=compressBio-368a3474.js.map

import{y as e,f as t,t as o,V as s}from"./calfSystem-9c7241dc.js"
import{c as r}from"./createInput-6e753077.js"
import{c as n}from"./createLabel-b61df810.js"
import{i as a}from"./insertElementBefore-686b8559.js"
function c(e){e.parentNode.classList.add("fshCompressor"),function(e){const n=a(r({id:"fshCompressToggle",type:"checkbox"}),e)
t(n,"change",o(s,"bio","toggle"))}(e),a(n({className:"sendLink",htmlFor:"fshCompressToggle"}),e)}export default function(){const t=e("profile-bio")
t&&t.clientHeight/function(e){const t=getComputedStyle(e)
return parseInt(t.getPropertyValue("font-size"),10)}(t)>10&&c(t)}
//# sourceMappingURL=compressBio-baaf4d29.js.map
